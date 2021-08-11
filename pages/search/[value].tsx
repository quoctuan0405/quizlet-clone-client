import React from "react";
import { useRouter } from 'next/router';
import { getDataFromTree } from "@apollo/client/react/ssr";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Header } from "../../src/ui/Header";
import withApollo from "../../lib/withApollo";
import { useFindSetQuery } from "../../src/generated/operation";
import { SetCard } from "../../src/ui/set/SetCard";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            padding: theme.spacing(2)
        },
        title: {
            fontWeight: "bold",
            marginBottom: theme.spacing(1)
        },
        upsertSection: {
            padding: theme.spacing(3)
        }
    })
);

const SearchPage = () => {
    const classes = useStyles();

    const router = useRouter();
    const { value } = router.query;

    let query: string | undefined;
    if (typeof value !== 'object') {
        query = value;
    }

    const { data } = useFindSetQuery({variables: {query}});

    return (
        <Grid container direction="column">
            <Grid item>
                <Header query={query}/>
            </Grid>
            <Grid item className={classes.main}>
                <Typography variant="h5" className={classes.title}>Sets</Typography>
                <Grid container direction="row">
                    {data && data.findSet ?
                        data?.findSet?.map((set) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={set?.id}>
                                <SetCard set={set} />
                            </Grid>
                        )) :
                        <CircularProgress/>
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}

export default withApollo(SearchPage, { getDataFromTree });