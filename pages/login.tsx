import React from "react";
import withApollo from "../lib/withApollo";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { AuthForm, AuthFormType } from "../src/auth/AuthForm";

const Login = () => {
    return (
        <AuthForm type={AuthFormType.LOGIN} />
    );
}

export default withApollo(Login, { getDataFromTree });