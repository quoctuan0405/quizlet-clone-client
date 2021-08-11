import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Fade from "@material-ui/core/Fade";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { SetQuery } from "../../generated/operation";
import Grid from "@material-ui/core/Grid";

const ThickLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[700],
    },
    bar: {
        borderRadius: 5,
    },
}))(LinearProgress);

const useStyles = makeStyles(theme => ({
    motivationTitle: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3)
    },
    nextButton: {
        display: "block",
        marginTop: theme.spacing(2),
        marginLeft: "auto",
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3)
    },
    progressBar: {
        marginTop: theme.spacing(2)
    },
    progressTitle: {
        marginBottom: theme.spacing(1)
    }
}));

interface Props {
    next: () => any
    set?: SetQuery["set"] | undefined | null
}

export const LearningProgressCard: React.FC<Props> = ({next, set}) => {
    const classes = useStyles();

    let countLearnedTerm = 0;
    let countMasteryTerm = 0;
    if (set && set.terms) {
        for (let term of set.terms) {
            if (term?.learned) {
                countLearnedTerm++;
            }

            if (term?.remained === 0) {
                countMasteryTerm++;
            }
        }
    }

    return (
        <Fade in={true}>
            <Card>
                <CardContent>
                    <Typography variant="h5" className={classes.motivationTitle}>Going strong, you can do this!</Typography>

                    <Typography variant="body1" color="textSecondary">Progress</Typography>
                    {
                        set && set.terms ?
                            <Grid container direction="column">
                                <Grid item sm={8} md={6} className={classes.progressBar}>
                                    <Typography variant="body2" className={classes.progressTitle}>{countLearnedTerm} / {set.terms.length} learned</Typography>
                                    <ThickLinearProgress variant="determinate" value={countLearnedTerm / set.terms.length * 100} />
                                </Grid>
                                <Grid item sm={8} md={6} className={classes.progressBar}>
                                    <Typography variant="body2" className={classes.progressTitle}>{countMasteryTerm} / {set.terms.length} mastery</Typography>
                                    <ThickLinearProgress variant="determinate" value={countMasteryTerm / set.terms.length * 100} />
                                </Grid>
                            </Grid>
                        : null
                    }

                    <Button variant="contained" color="primary" className={classes.nextButton} onClick={next}>Next</Button>
                </CardContent>
            </Card>
        </Fade>
    )
}