import React, { useEffect } from "react";
import { Formik, Form, Field, FieldArray } from 'formik';
import { TextField } from 'formik-material-ui';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import LinearProgress from "@material-ui/core/LinearProgress";
import SaveIcon from "@material-ui/icons/Save";
import { UpsertTermCard } from "./UpsertTermCard";
import * as Yup from "yup";
import { CreateSetInput, SetQuery, useCreateSetMutation, useMeQuery, useUpdateSetMutation } from "../../../generated/operation";
import { SETS_QUERY, SET_QUERY } from "../../../graphql/queries";
import { useRouter } from "next/router";

const duration = 300;

const transitionStyle = {
    transition: `${duration}ms cubic-bezier(0.165, 0.84, 0.44, 1)`,
}

const useStyles = makeStyles(theme => ({
    title: {
        marginBottom: theme.spacing(2),
        fontWeight: "bold"
    },
    textField: {
        width: "100%",
        marginBottom: theme.spacing(5)
    },
    addTermButtonCard: {
        background: theme.palette.primary.dark
    },
    doneSection: {
        marginTop: theme.spacing(2)
    },
    doneButton: {
        marginLeft: "auto"
    },
    entering: { opacity: 0, scale: 0.9 },
    entered: { ...transitionStyle, opacity: 1, scale: 1 },
    exiting: { ...transitionStyle, opacity: 0, scale: 0.9 },
    exited: { ...transitionStyle, opacity: 0, scale: 0.9 },
}));

export interface FormValues {
    id?: string
    name: CreateSetInput["name"]
    terms: {
        id?: string
        question: CreateSetInput["terms"][0]["question"]
        answer: CreateSetInput["terms"][0]["answer"]
        options: {
            id?: string,
            option: string
        }[]
        explanation: NonNullable<CreateSetInput["terms"][0]["explanation"]>
        // Just for the animation part
        key: number
    }[]
}

interface Props {
    set?: SetQuery["set"]
}

export const UpsertSetComponent: React.FC<Props> = ({set}) => {
    const classes = useStyles();

    const router = useRouter();

    const { data: meData } = useMeQuery();
    const [createSet, { data: createSetData }] = useCreateSetMutation({refetchQueries: [{query: SETS_QUERY}]});
    const [updateSet, { data: updateSetData }] = useUpdateSetMutation();

    // Redirect if user is not authenticated
    useEffect(() => {
        if (!meData?.me) {
            router.push("/");
        }
    }, [meData]);

    // Redirect after successfully create or update study set
    useEffect(() => {
        if (createSetData?.createSet.id) {
            router.push(`/set/${createSetData.createSet.id}`);
        }

        if (updateSetData?.updateSet.id) {
            router.push(`/set/${updateSetData.updateSet.id}`)
        }
    }, [createSetData?.createSet.id, updateSetData?.updateSet.id])

    let initialValues: FormValues;
    if (set && set.terms) {
        // Convert all 'undefined' value to empty string ""
        initialValues = {
            ...set,
            terms: set.terms.map((term, index) => ({
                ...term,
                question: term?.question ? term.question : "",
                answer: term?.answer ? term.answer : "",
                explanation: term?.explanation ? term.explanation : "",
                options: term?.options ? term.options.map((option) => (
                    option ? option : {option: ""}
                )) : [{ option: "" }, { option: "" }],
                key: index
            }))
        }

    } else {
        initialValues = {
            name: "",
            terms: [
                { question: "", answer: "", explanation: "", options: [{ option: "" }, { option: "" }], key: 0 }
            ]
        }
    }

    const setSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        terms: Yup.array().of(Yup.object().shape({
            question: Yup.string().required("Required"),
            answer: Yup.string().required("Required")
        })).required("Required")
    });
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={setSchema}
            validateOnChange={false}
            validateOnBlur={false}
            validateOnMount={false}
            onSubmit={async (data, { setSubmitting }) => {
                // Remove all empty string "" and replace with 'undefined' value
                const modifiedData = {
                    name: data.name,
                    terms: data.terms.map(term => ({
                        question: term.question,
                        answer: term.answer,
                        explanation: term.explanation === "" ? null : term.explanation,
                        options: term.options.filter(({ option }) => option !== "").map((option) => ({
                            id: option.id,
                            option: option.option
                        }))
                    }))
                };

                if (set) {
                    await updateSet({ 
                        variables: {updateSetInput: {id: set.id, ...modifiedData}}, 
                        refetchQueries: [{query: SET_QUERY, variables: {id: set.id}}, {query: SETS_QUERY}]
                    });

                } else {
                    await createSet({ variables: { createSetInput: modifiedData } });
                }

                setSubmitting(false);
            }}
        >
            {({ submitForm, isSubmitting, values }) => (
                <Form>
                    {isSubmitting && <LinearProgress />}

                    <Grid container direction="column">
                        <Grid item xs={10} sm={6} md={4}>
                            {!set ? <Typography variant="h5" className={classes.title}>Create a new study set</Typography> : null}
                            <Field component={TextField} name="name" label="Enter Set Title" className={classes.textField} />
                        </Grid>
                        <FieldArray
                            name="terms"
                            render={arrayHelpers => (
                                <>
                                    <Grid item>
                                        <TransitionGroup>
                                            {values.terms.map((term, index) => (
                                                <CSSTransition
                                                    key={`${term.key}`}
                                                    classNames={{
                                                        enter: classes.entering,
                                                        enterActive: classes.entering,
                                                        enterDone: classes.entered,
                                                        exit: classes.exiting,
                                                        exitDone: classes.exited,
                                                    }}
                                                    timeout={duration}
                                                >
                                                    <UpsertTermCard index={index} values={values} deleteTerm={() => { arrayHelpers.remove(index) }} />
                                                </CSSTransition>
                                            ))}
                                        </TransitionGroup>
                                    </Grid>
                                    <Grid item>
                                        <Card className={classes.addTermButtonCard}>
                                            <CardActionArea 
                                                onClick={() => { 
                                                    arrayHelpers.insert(values.terms.length, { 
                                                        question: "", 
                                                        answer: "", 
                                                        options: [{ option: "" }, { option: "" }], 
                                                        explanation: "", 
                                                        key: values.terms.length !== 0 ? values.terms[values.terms.length - 1].key + 1 : 0
                                                    }) 
                                                }}
                                            >
                                                <CardContent>
                                                    <Typography align="center" variant="h6" component="p">Add Term</Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                </>
                            )}
                        />

                        <Grid item container direction="row" alignContent="flex-end" className={classes.doneSection}>
                            <Button variant="contained" startIcon={<SaveIcon />} className={classes.doneButton} onClick={submitForm}>Done!</Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}