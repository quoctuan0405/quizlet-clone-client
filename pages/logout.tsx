import React, { useEffect } from "react";
import withApollo from "../lib/withApollo";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { useLogoutMutation, useMeQuery } from "../src/generated/operation";
import { useRouter } from "next/router";
import { ME_QUERY } from "../src/graphql/queries";

const Logout = () => {
    const [logout] = useLogoutMutation({refetchQueries: [{query: ME_QUERY}]});

    const router = useRouter();

    useEffect(() => {
        logout().then(() => {
            router.push("/")
        });
    }, []);

    return (<></>);
}

export default withApollo(Logout, { getDataFromTree });