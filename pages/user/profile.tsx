import React from "react";
import withApollo from "../../lib/withApollo";
import { getDataFromTree } from "@apollo/client/react/ssr";
import Grid from "@material-ui/core/Grid";

import { Header } from "../../src/ui/Header";
import { useMeQuery } from "../../src/generated/operation";
import { useRouter } from "next/router";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { SetCard } from "../../src/ui/set/SetCard";
import Typography from "@material-ui/core/Typography";
import { useEffect } from "react";

const useStyles = makeStyles(theme => ({
    main: {
        padding: theme.spacing(2)
    },
    avatar: {
        backgroundColor: theme.palette.primary.main
    },
    title: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        fontWeight: "bold"
    }
}));

const Profile = () => {
    const classes = useStyles();

    const { data: meData } = useMeQuery();

    const router = useRouter();
    useEffect(() => {
        if (!meData?.me) {
            router.push("/");
        }
    }, [meData])

    return (
        <Grid container direction="column">
            <Grid item>
                <Header />
            </Grid>
            <Grid item className={classes.main}>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {`${meData?.me?.username[0].toUpperCase()}`}
                            </Avatar>
                        }
                        title={`User`}
                        subheader={`${meData?.me?.username}`}
                    />
                </Card>
                <Typography variant="h5" className={classes.title}>Sets</Typography>
                <Grid container direction="row">
                    {meData?.me?.sets?.map((set) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={set?.id}>
                            <SetCard set={set} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default withApollo(Profile, { getDataFromTree });