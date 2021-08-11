import React, { useState, useEffect } from "react";
import { LEARNING_SET_QUERY, SET_QUERY } from "../../graphql/queries";
import { SetQuery, useMeQuery, useReportUserLearningTermsMutation, useResetLearningMutation, useSetUserLearningSetMutation } from "../../generated/operation";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";

import { NextQuestion, QuizCard } from "./QuizCard";
import { TermReport } from "../../generated/serverTypes";
import { LearningProgressCard } from "./LearningProgressCard";
import { LearningCompleteCard } from "./LearningCompleteCard";
import { useRouter } from "next/router";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
    cardContainer: {
        marginTop: "10vh",
        width: "100%"
    },
}));

export type Term = NonNullable<NonNullable<NonNullable<SetQuery["set"]>["terms"]>[0]>

interface Props {
    set: SetQuery["set"] | undefined | null
}

export const LearningFlashcardComponent: React.FC<Props> = ({ set }) => {
    const classes = useStyles();

    const { data: meData } = useMeQuery();
    const [setUserLearningSetMutation] = useSetUserLearningSetMutation({refetchQueries: [{query: LEARNING_SET_QUERY}]});
    const [reportUserLearningTermsMutation] = useReportUserLearningTermsMutation();
    const [resetLearningProgress] = useResetLearningMutation();

    const [learningQuestionsPool, setLearningQuestionsPool] = useState<Term[]>([]);
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const [termsReport, setTermsReport] = useState<TermReport[]>([]);
    const [countCorrectAnswer, setCountCorrectAnswer] = useState(0);
    const [learningComplete, setLearningComplete] = useState(false);

    const router = useRouter();

    useEffect(() => {
        // If user not logged in, redirect to the login page
        if (!meData || !meData.me) {
            router.push("/login");
        }

        // Send to server that the user is learning this set
        if (meData && meData.me && set) {
            setUserLearningSetMutation({ variables: { setId: set.id }, update(cache, {data}) {
                if (data?.setUserLearningSet?.valueOf() === true) {
                    const updatedTerms = set?.terms?.map((term) => ({
                        ...term,
                        remained: 3,
                        learned: false
                    }));
    
                    cache.writeQuery({
                        query: SET_QUERY,
                        data: {
                            set: {
                                ...set,
                                terms: updatedTerms
                            }
                        },
                        variables: set.id
                    });
                }
            }});
        }
    }, []);
    
    useEffect(() => {
        if (set?.terms) {
            // Check if user progress learning of this set is complete
            const isLearningComplete = !set.terms.some((term) => {
                if (typeof term?.remained === 'undefined') {
                    return false;
                }
                return term?.remained && term?.remained > 0;
            }) || false;
            setLearningComplete(isLearningComplete);

            if (!isLearningComplete) {
                // Add to the not mastered learning question pool
                const pool: Term[] = [];
                for (let term of set.terms) {
                    if (term && term.remained !== 0) {
                        pool.push(term);
                    }
                }

                setLearningQuestionsPool(pool);

                // Generate the first random question
                generateNewQuestion(pool);
            }
        }
    }, [set]);

    const generateNewQuestion = (optionalQuestionPool?: Term[]) => {
        let pool = learningQuestionsPool.length !== 0 ? learningQuestionsPool : optionalQuestionPool;
        if (!pool) {
            return;
        }

        let newQuestionIndex = Math.floor(Math.random() * learningQuestionsPool.length);

        let count = 0;
        while (true) {
            // Make sure there will be no question which remained = 0
            if (pool[newQuestionIndex].remained === 0) {
                newQuestionIndex = Math.floor(Math.random() * pool.length);

            } else {
                break;
            }

            if (count >= 30) {
                break;
            }

            count++;
        }

        setQuestionIndex(newQuestionIndex);
    }

    const nextQuestion: NextQuestion = async ({ correct }) => {
        if (!set || !set.terms || set.terms.length === 0 || typeof window === 'undefined') {
            return;
        }

        // Saves data to sending to server
        const termId = learningQuestionsPool[questionIndex]?.id;
        if (!termId) {return;}
        setTermsReport([...termsReport, {termId, correct}]);

        if (correct) {
            setCountCorrectAnswer(countCorrectAnswer + 1);
        }

        // Generate new question
        if (!learningComplete) {
            generateNewQuestion();
        }
    }

    // When user hit 'next' button after answering wrong
    const nextFiveQuestions = () => {
        if (!set || !set.terms || set.terms.length === 0 || typeof window === 'undefined') {
            return;
        }

        generateNewQuestion();
        setTermsReport([]);
        setCountCorrectAnswer(0);
    }
    
    // Send to server report of answers after 5 correct answers
    useEffect(() => {
        if (countCorrectAnswer === 5) {
            reportUserLearningTermsMutation({ variables: { terms: termsReport }, update(cache, { data }) {
                if (data?.setUserLearningTerms) {
                    const updatedTerms = set?.terms?.map((term) => {
                        for (let termReport of data.setUserLearningTerms) {
                            if (term?.id === termReport?.id) {
                                return termReport;
                            }
                        }

                        return term;
                    });
    
                    cache.writeQuery({
                        query: SET_QUERY,
                        data: {
                            set: {
                                ...set,
                                terms: updatedTerms
                            }
                        },
                        variables: set?.id
                    });
                }
            }});
        }
    }, [countCorrectAnswer]);

    // Reset learning progress
    const resetLearning = async () => {
        if (set) {
            await resetLearningProgress({variables: {setId: set?.id}, update(cache, {data}) {
                if (data?.resetLearning?.valueOf() === true) {
                    const updatedTerms = set?.terms?.map((term) => ({
                        ...term,
                        remained: 3,
                        learned: false
                    }));

                    cache.writeQuery({
                        query: SET_QUERY,
                        data: {
                            set: {
                                ...set,
                                terms: updatedTerms
                            }
                        },
                        variables: set.id
                    });
                }
            }});
    
            generateNewQuestion();
            setTermsReport([]);
            setCountCorrectAnswer(0);
        }
    }

    if (!meData || !meData.me) {
        return (
            <Grid container direction="column" alignContent="center">
                <Grid item sm={11} md={8} className={classes.cardContainer}>
                    <Card>
                        <CardContent>
                            <CircularProgress />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
    }

    if (learningComplete) {
        return (
            <Grid container direction="column" alignContent="center">
                <Grid item sm={11} md={8} className={classes.cardContainer}>
                    <LearningCompleteCard resetLearning={resetLearning}/>
                </Grid>
            </Grid>
        )
    }

    return (
        <>
            {countCorrectAnswer === 5 ? 
                <Grid container direction="column" alignContent="center">
                    <Grid item sm={11} md={8} className={classes.cardContainer}>
                        <LearningProgressCard set={set} next={nextFiveQuestions}/>
                    </Grid>
                </Grid>
            :
                <Grid container direction="column" alignContent="center">
                    <LinearProgress variant="determinate" value={countCorrectAnswer / 5 * 100} />
                    <Grid item sm={11} md={8} className={classes.cardContainer}>
                        <QuizCard
                            set={set}
                            questionTerm={learningQuestionsPool[questionIndex]}
                            nextQuestion={({ correct }) => { nextQuestion({ correct }) }}
                        />
                    </Grid>
                </Grid>
            }
        </>
    )
}