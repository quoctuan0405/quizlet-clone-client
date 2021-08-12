import withApollo from "../lib/withApollo";
import { getDataFromTree } from "@apollo/client/react/ssr";
import Grid from "@material-ui/core/Grid";
import { Header } from "../src/ui/Header";
import { AllSetsComponent } from "../src/ui/home/AllSetsComponent";
import { useMeQuery } from "../src/generated/operation";
import React from "react";
import { AllLearningSetsComponent } from "../src/ui/home/AllLearningSetsComponent";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import triangles from "../assets/SVG/triangles.svg";
import Typography from "@material-ui/core/Typography";

const useStyes = makeStyles((theme) => ({
    container: {
        background: `url(${triangles})`,
        backgroundSize: "100vw",
        backgroundPositionY: 50,
        backgroundAttachment: "fixed",
    },
    bannerCard: {
        width: "100%",
        height: "45vh",
        background: `url(https://i.postimg.cc/9fZQMFKY/pexels-felix-mittermeier-1146134.jpg)`,
        backgroundSize: "100vw",
        backgroundAttachment: "fixed",
        [theme.breakpoints.down("xs")]: {
            backgroundSize: "200vw"
        }
    },
    title: {
        fontWeight: "bold", 
        marginTop: "17vh",
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        color: theme.palette.grey[300]
    }
}));

const Home = () => {
    const classes = useStyes();

    const {data: meData} = useMeQuery();

    return (
        <Grid container direction="column" className={classes.container}>
            <Grid item>
                <Header/>
            </Grid>
            <Grid item>
                <Card className={classes.bannerCard} elevation={8}>
                    <Typography variant="h4" align="center" className={classes.title}>Welcome to Quizlet Clone!</Typography>
                </Card>
            </Grid>
            {meData?.me ?
                <Grid item>
                    <AllLearningSetsComponent />
                </Grid>
            : null}
            <Grid item>
                <AllSetsComponent />
            </Grid>
        </Grid>
    );
}

export default withApollo(Home, {getDataFromTree});