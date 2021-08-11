import React, { useState } from "react";
import withApollo from "../../../lib/withApollo";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Header } from "../../../src/ui/Header";
import { FlashCardCarousel } from "../../../src/ui/set/FlashCardCarousel";
import { useSetQuery } from "../../../src/generated/operation";

const useStyles = makeStyles((theme) => ({
    headerSection: {
        marginBottom: theme.spacing(2)
    },
    flashCardSection: {
        padding: theme.spacing(2)
    },
    explanationButton: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1),
        marginLeft: "auto"
    }
}));

const StudyFlashcard = () => {
    const classes = useStyles();

    const [open, setOpen] = useState<boolean>(false);

    const router = useRouter();
    const { id } = router.query;
    if (!id || typeof id === "object") {
        router.push("/");
        return <></>
    }

    const { data: setData } = useSetQuery({ variables: { id } });

    return (
        <Grid container direction="column">
            <Grid item className={classes.headerSection}>
                <Header />
            </Grid>
            <Grid item container direction="column" className={classes.flashCardSection}>
                <Grid item>
                    <FlashCardCarousel height="80vh" set={setData?.set}/>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default withApollo(StudyFlashcard, { getDataFromTree });