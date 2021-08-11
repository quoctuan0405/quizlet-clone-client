import React, { useState } from "react";
import { Field, FieldArray } from 'formik';
import { TextField } from 'formik-material-ui';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardAction from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import { FormValues } from "./UpsertSetComponent";

const useStyles = makeStyles(theme => ({
    addTermCard: {
        marginBottom: theme.spacing(3)
    },
    textFieldContainer: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    textField: {
        width: "100%",
        [theme.breakpoints.down('xs')]: {
            marginBottom: theme.spacing(1)
        }
    },
    option: {
        width: "100%",
        marginBottom: theme.spacing(2)
    },
    cardHeader: {
        background: theme.palette.primary.dark,
    },
    cardContent: {
        background: theme.palette.grey[800],
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    optionsSection: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    addOptionButton: {
        marginBottom: theme.spacing(2),
        marginLeft: "auto"
    }
}));

interface Props {
    index: number
    deleteTerm: () => any
    values: FormValues
}

export const UpsertTermCard: React.FC<Props> = ({ index: termIndex, deleteTerm, values }) => {
    const classes = useStyles();

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.addTermCard}>
            <CardHeader
                className={classes.cardHeader}
                subheader={`Term ${termIndex + 1}`}
                action={
                    <IconButton onClick={deleteTerm}>
                        <DeleteIcon color="action" />
                    </IconButton>
                }
            />
            <Divider />
            <CardContent className={classes.cardContent}>
                <Grid container direction="row">
                    <Grid item xs={12} sm={6} className={classes.textFieldContainer}>
                        <Field component={TextField} name={`terms[${termIndex}].question`} multiline label="Term" className={classes.textField} />
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.textFieldContainer}>
                        <Field component={TextField} name={`terms[${termIndex}].answer`} multiline label="Definition" className={classes.textField} />
                    </Grid>
                </Grid>
            </CardContent>
            <CardAction>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardAction>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Grid container direction="column">
                        <Grid item>
                            <Typography variant="body1">For learning mode</Typography>
                        </Grid>
                        <FieldArray
                            name={`terms[${termIndex}].options`}
                            render={arrayHelpers => (
                                <>
                                    <Grid item container direction="row" className={classes.optionsSection}>
                                        {values.terms[termIndex].options?.map((option, index) => (
                                            <Grid item xs={12} sm={6} className={classes.textFieldContainer} key={index}>
                                                <Field component={TextField} name={`terms[${termIndex}].options[${index}].option`} multiline variant="outlined" label={`Option #${index + 1}`} className={classes.option} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <Grid item container direction="row" alignContent="flex-end">
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            className={classes.addOptionButton}
                                            startIcon={<AddIcon />}
                                            onClick={() => { arrayHelpers.insert(values.terms[termIndex].options.length, '') }}
                                        >
                                            Add Option
                                        </Button>
                                    </Grid>
                                </>
                            )}
                        />
                        <Grid item sm={12}>
                            <Field component={TextField} name={`terms[${termIndex}].explanation`} variant="filled" label="Explanation" className={classes.textField} />
                        </Grid>
                    </Grid>
                </CardContent>
            </Collapse>
        </Card>
    )
}