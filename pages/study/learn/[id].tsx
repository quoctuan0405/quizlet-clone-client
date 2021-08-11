import React from "react";
import { useRouter } from 'next/router';
import withApollo from "../../../lib/withApollo";
import { useSetQuery } from "../../../src/generated/operation";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Header } from "../../../src/ui/Header";
import { LearningFlashcardComponent } from "../../../src/ui/study/LearningFlashcardComponent";

const useStyles = makeStyles((theme) => ({
    headerSection: {
        marginBottom: theme.spacing(2)
    },
    learnSection: {
        padding: theme.spacing(2)
    }
}));

const LearnFlashcard = () => {
    const classes = useStyles();

    const router = useRouter();
    const { id } = router.query;

    if (!id || typeof id === "object") {
        router.push("/");
        return <></>;
    }

    const { data: setData } = useSetQuery({ variables: { id } });

    return (
        <Grid container direction="column">
            <Grid item className={classes.headerSection}>
                <Header/>
            </Grid>
            <Grid item className={classes.learnSection}>
                <LearningFlashcardComponent set={setData?.set}/>
            </Grid>
        </Grid>
    )
}

export default withApollo(LearnFlashcard, { getDataFromTree });
