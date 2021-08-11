import React from "react";
import withApollo from "../lib/withApollo";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { AuthForm, AuthFormType } from "../src/auth/AuthForm";

const Signup = () => {
    return (
        <AuthForm type={AuthFormType.SIGNUP} />
    );
}

export default withApollo(Signup, { getDataFromTree });