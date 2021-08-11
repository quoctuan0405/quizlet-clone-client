import { createApolloClient } from './apolloClient';
import { ApolloProvider } from "@apollo/client";
import { useRouter } from "next/router";
import nextWithApollo from "next-with-apollo";

const withApollo = nextWithApollo(
    // @ts-ignore
    ({ initialState, headers }) => {
        return createApolloClient(initialState, headers);
    },
    {
        render: ({ Page, props }) => {
            const router = useRouter();
            
            return (
                <ApolloProvider client={props.apollo}>
                    <Page {...props} {...router} />
                </ApolloProvider>
            );
        },
    }
);

export default withApollo;