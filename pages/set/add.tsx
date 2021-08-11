import React from "react";
import withApollo from "../../lib/withApollo";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Header } from "../../src/ui/Header";
import { UpsertSetComponent } from "../../src/ui/set/upsert/UpsertSetComponent";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            marginBottom: theme.spacing(1)
        },
        upsertSection: {
            padding: theme.spacing(3)
        }
    })
);

const AddSet = () => {
    const classes = useStyles();

    return (
        <Grid container direction="column">
            <Grid item className={classes.header}>
                <Header />
            </Grid>
            <Grid item className={classes.upsertSection}>
                <UpsertSetComponent/>
            </Grid>
        </Grid>
    )
}

export default withApollo(AddSet, { getDataFromTree });