import React from "react";
import { useRouter } from 'next/router';
import withApollo from "../../lib/withApollo";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Header } from "../../src/ui/Header";
import { SetIntroComponent } from "../../src/ui/set/SetIntroComponent";
import { SetTermsComponent } from "../../src/ui/set/SetTermsComponent";
import { useSetQuery } from "../../src/generated/operation";
import { SetAuthorComponent } from "../../src/ui/set/SetAuthorComponent";

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        main: {
            margin: theme.spacing(5),
            color: "white",
        },
        title: {
            fontWeight: "bold",
            marginBottom: theme.spacing(3)
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

    const { data: setData } = useSetQuery({variables: {id}});

    return (
        <Grid container direction="column">
            <Grid item>
                <Header/>
            </Grid>
            <Grid item className={classes.main}>
                <Grid direction="column" container>
                    <Grid item>
                        <Typography variant="h4" component="h2" className={classes.title}>{setData?.set?.name}</Typography>
                    </Grid>
                    <Grid item>
                        <SetIntroComponent set={setData?.set}/>
                    </Grid>
                    <Grid item>
                        <SetAuthorComponent set={setData?.set}/>
                    </Grid>
                    <Grid item>
                        <SetTermsComponent set={setData?.set}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default withApollo(StudySet, { getDataFromTree });