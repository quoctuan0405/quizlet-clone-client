import {
    ApolloClient,
    ApolloLink,
    InMemoryCache,
    HttpLink,
    split
} from '@apollo/client';
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from "@apollo/client/link/context";
import { onError } from '@apollo/link-error';
import { IncomingHttpHeaders } from 'http';
import fetch from 'isomorphic-unfetch';
import cookie from 'cookie';
import ws from 'ws';

/**
 * Get the user token from cookie
 */
const getToken = (headers?: IncomingHttpHeaders | undefined) => {
    let cookies: {[key: string]: string};

    if (typeof window === 'undefined') {
        cookies = cookie.parse(headers?.cookie || '');
    } else {
        cookies = cookie.parse(document.cookie || '');
    }

    return cookies.accessToken;
};

export const createApolloClient = (initialState: any, headers: IncomingHttpHeaders | undefined) => {
    const fetchOptions = {
        agent: null,
        credentials: 'include'
    };

    // If you are using a https_proxy, add fetchOptions with 'https-proxy-agent' agent instance
    // 'https-proxy-agent' is required here because it's a sever-side only module
    // if (typeof window === 'undefined') {
    //     if (process.env.https_proxy) {
    //         fetchOptions.agent = new (require('https-proxy-agent'))(
    //             process.env.https_proxy,
    //         );
    //     }
    // }

    const token = getToken(headers);

    const httpLink = new HttpLink({
        uri: process.env.NEXT_PUBLIC_SERVER_URL as string, // Server URL (must be absolute)
        credentials: 'include',
        fetch,
        fetchOptions,
    });

    const wsLink = new WebSocketLink({
        uri: process.env.NEXT_PUBLIC_WS_SERVER_URL as string,
        options: {
            reconnect: true,
            connectionParams: {
                "authorization": token ? `Bearer ${token}` : '',
            }
        },
        webSocketImpl: typeof window === 'undefined' ? ws : null
    });

    const link = split(
        // split based on operation type
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsLink,
        httpLink,
    );

    const authLink = setContext((_request, { headers }) => {
        return {
            headers: {
                ...headers,
                cookie: token ? `accessToken=Bearer ${token}` : '',
            },
        };
    });

    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) =>
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                ),
            );
        if (networkError) console.log(`[Network error]: ${networkError}`);
    });

    const cache = new InMemoryCache({
        typePolicies: {
            Set: {
                fields: {
                    terms: {
                        merge(existing = [], incoming: any[]) {
                            return incoming;
                        },
                    }
                }
            }
        }
    });

    return new ApolloClient({
        connectToDevTools: typeof window !== 'undefined',
        ssrMode: typeof window === 'undefined',
        link: ApolloLink.from([errorLink, authLink, link]),
        cache: cache.restore(initialState || {}),
    });
};