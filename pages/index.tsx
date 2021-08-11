import withApollo from "../lib/withApollo";
import { getDataFromTree } from "@apollo/client/react/ssr";
import Grid from "@material-ui/core/Grid";

import { Header } from "../src/ui/Header";
import { AllSetsComponent } from "../src/ui/home/AllSetsComponent";
import { useMeQuery } from "../src/generated/operation";
import React from "react";
import { AllLearningSetsComponent } from "../src/ui/home/AllLearningSetsComponent";

const Home = () => {
    const {data: meData} = useMeQuery();

    return (
        <Grid container direction="column">
            <Grid item>
                <Header/>
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