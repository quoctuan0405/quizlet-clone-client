import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
    mutation login($username: String!, $password: String!) {
        login(loginInput:{username: $username, password: $password}) {
            id
            username
        }
    }
`;

export const SIGNUP_MUTATION = gql`
    mutation signup($username: String!, $password: String!) {
        signup(signupInput:{username: $username, password: $password}) {
            id
        }
    }
`;

export const LOGOUT_MUTATION = gql`
    mutation logout {
        logout
    }
`;

export const SET_USER_LEARNING_SET_MUTATION = gql`
    mutation setUserLearningSet($setId: ID!) {
        setUserLearningSet(setId: $setId)
    }
`;

export const REPORT_USER_LEARNING_TERMS = gql`
    mutation reportUserLearningTerms($terms: [TermReport]!) {
        setUserLearningTerms(terms: $terms) {
            id
            question
            answer
            explanation
            options {
                id
                option
            }
            remained
            learned
        }
    }
`;

export const RESET_LEARNING = gql`
    mutation resetLearning($setId: ID!) {
        resetLearning(setId: $setId)
    }
`;

export const CREATE_SET = gql`
    mutation createSet($createSetInput: CreateSetInput!) {
        createSet(createSetInput: $createSetInput) {
            id
        }
    }
`;

export const UPDATE_SET = gql`
    mutation updateSet($updateSetInput: UpdateSetInput!) {
        updateSet(updateSetInput: $updateSetInput) {
            id
        }
    }
`;