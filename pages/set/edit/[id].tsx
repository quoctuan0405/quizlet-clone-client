import React from "react";
import { useRouter } from 'next/router';
import withApollo from "../../../lib/withApollo";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Header } from "../../../src/ui/Header";
import { useSetQuery } from "../../../src/generated/operation";
import { UpsertSetComponent } from "../../../src/ui/set/upsert/UpsertSetComponent";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        upsertSection: {
            padding: theme.spacing(3)
        }
    })
);

const StudySet = () => {
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
            <Grid item>
                <Header />
            </Grid>
            <Grid item className={classes.upsertSection}>
                <UpsertSetComponent set={setData?.set} />
            </Grid>
        </Grid>
    )
}

export default withApollo(StudySet, { getDataFromTree });