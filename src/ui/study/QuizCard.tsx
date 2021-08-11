import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import Divider from "@material-ui/core/Divider";
import { SetQuery } from "../../generated/operation";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import ExplicitIcon from "@material-ui/icons/Explicit";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Fade from "@material-ui/core/Fade";
import { Term } from "./LearningFlashcardComponent";

interface Option {
    id?: string;
    answer: string;
    correct: boolean;
    className: string | null;
    disabled: boolean;
}

const generateOptions = (set: SetQuery["set"], questionTerm: NonNullable<NonNullable<NonNullable<SetQuery["set"]>["terms"]>[0]>): Option[] | undefined => {
    if (!set || !set.terms || set.terms.length === 0) {
        return;
    }

    let options: Option[] = [{ id: questionTerm.id, answer: questionTerm.answer, correct: true, className: null, disabled: false }];

    if (questionTerm.options && questionTerm.options.length !== 0) {
        for (let option of questionTerm.options) {
            options.push({answer: option?.option || "", correct: false, className: null, disabled: false});
        }
    } else if (set.terms.length >= 4) {
        for (let i = 0; i < 3; i++) {
            let index = Math.floor(Math.random() * set.terms.length);

            // Make sure there is no duplicate answer
            while (true) {
                let matches = false;
                for (let option of options) {
                    if (set.terms[index]?.id === option.id) {
                        matches = true;
                    }
                }

                if (!matches) {
                    options.push({
                        id: set.terms[index]?.id as string,
                        answer: set.terms[index]?.answer as string,
                        correct: false,
                        className: null,
                        disabled: false
                    });
                    break;
                } else {
                    index = Math.floor(Math.random() * set.terms.length);
                }
            }
        }

    } else {
        set.terms.forEach((term) => {
            if (term && term.id !== questionTerm.id) {
                options.push({
                    id: term.id,
                    answer: term.answer,
                    correct: false,
                    className: null,
                    disabled: false
                });
            }
        })
    }

    const shuffleArray = (array: any[]) => {
        let curId: number = array.length;
        // There remain elements to shuffle
        while (0 !== curId) {
            // Pick a remaining element
            let randId = Math.floor(Math.random() * curId);
            curId -= 1;
            // Swap it with the current element.
            let tmp = array[curId];
            array[curId] = array[randId];
            array[randId] = tmp;
        }

        return array;
    }

    options = shuffleArray(options);

    return options;
}

const useStyles = makeStyles(theme => ({
    cardContainer: {
        marginTop: "10vh",
        width: "100%"
    },
    card: {
        background: theme.palette.grey[900],
        color: theme.palette.getContrastText(theme.palette.grey[900]),
        boxShadow: `0 0 10px ${theme.palette.grey[800]}`
    },
    titleText: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    question: {
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(5),
    },
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2)
    },
    optionContainer: {
        padding: theme.spacing(1)
    },
    option: {
        background: theme.palette.grey[800],
        color: theme.palette.getContrastText(theme.palette.grey[800]),
        height: "100%",
        transition: ".65s"
    },
    optionActiveArea: {
        height: "100%"
    },
    rightOption: {
        background: theme.palette.success.dark,
    },
    wrongOption: {
        background: theme.palette.error.dark,
    },
    blurOption: {
        background: theme.palette.grey[900],
    },
    explanation: {
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

export type NextQuestion = (report: {correct: boolean}) => any

interface Props {
    set?: SetQuery["set"] | undefined | null
    questionTerm: Term | undefined | null
    nextQuestion: NextQuestion
}

export const QuizCard: React.FC<Props> = ({set, questionTerm, nextQuestion}) => {
    const classes = useStyles();
   
    const [question, setQuestion] = useState<string>();
    const [options, setOptions] = useState<Option[]>();
    const [showNextQuestionPanel, setShowNextQuestionPanel] = useState<boolean>();
    const [showExplanation, setShowExplanation] = useState<boolean>();
    const [showCard, setShowCard] = useState(true);
    // Make sure the card rerendering even when its the same question repeatedly
    const [goNextQuestion, setGoNextQuestion] = useState<number>(0);

    useEffect(() => {
        if (set?.terms && questionTerm?.question) {
            setQuestion(questionTerm.question);
            setOptions(generateOptions(set, questionTerm));
        }
    }, [set]);

    useEffect(() => {
        setShowCard(false);

        setTimeout(() => {
            if (!set || !set.terms || !questionTerm) {
                return;
            }

            setShowCard(true);
            setShowNextQuestionPanel(false);
            setShowExplanation(false);
            setQuestion(questionTerm.question);
            setOptions(generateOptions(set, questionTerm));
        }, 250);
    }, [questionTerm, goNextQuestion]);

    const chooseOption = (chooseOption: Option) => {
        // Animation part
        const optionsSelected = options?.map((option, i) => {
            // Right question
            if (option.correct) {
                option.className = classes.rightOption;

            // Choose the wrong the question
            } else if (option.answer === chooseOption.answer) {
                option.className = classes.wrongOption;

            // Other question
            } else {
                option.className = classes.blurOption;
            }

            option.disabled = true;

            return option;
        });
        setOptions(optionsSelected);

        // Move to the next question
        if (chooseOption.correct) {
            setShowNextQuestionPanel(false);
            setTimeout(() => {
                nextQuestion({correct: true});
                setGoNextQuestion(goNextQuestion + 1)
            }, 1000);
        } else {
            setShowNextQuestionPanel(true);
        }
    }

    return (
        <Fade in={showCard} timeout={400}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.titleText} color="textSecondary" gutterBottom>Question</Typography>
                    <Typography variant="body1" className={classes.question}>{question}</Typography>

                    <Typography className={classes.titleText} color="textSecondary" gutterBottom>Answer</Typography>
                    <Divider className={classes.divider} />

                    <Grid container direction="row">
                        {options && options.map((option) => (
                            <Grid item xs={6} key={option.id} className={classes.optionContainer}>
                                <Card className={`${option.className} ${classes.option}`}>
                                    <CardActionArea disabled={option.disabled} className={classes.optionActiveArea} onClick={() => { chooseOption(option) }}>
                                        <CardContent>
                                            <Typography variant="body1">{option.answer}</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Collapse in={showNextQuestionPanel} timeout={{ enter: 500, exit: 200 }}>
                        <CardActions>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<ExplicitIcon />}
                                style={{ marginRight: "auto" }}
                                onClick={() => { setShowExplanation(!showExplanation) }}
                            >
                                Explanation
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                endIcon={<ArrowForwardIcon />}
                                style={{ marginLeft: "auto" }}
                                onClick={async () => {
                                    await nextQuestion({correct: false}); 
                                    setGoNextQuestion(goNextQuestion + 1)}
                                }
                            >
                                Next
                            </Button>
                        </CardActions>
                    </Collapse>

                    <Collapse in={showExplanation}>
                        <Typography variant="body1" color="textSecondary" className={classes.explanation}>
                            {set?.terms && questionTerm?.explanation ? questionTerm.explanation : "No Explantion"}
                        </Typography>
                    </Collapse>
                </CardContent>
            </Card>
        </Fade>
    )
}