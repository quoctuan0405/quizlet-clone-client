import gql from 'graphql-tag';

export const HI_QUERY = gql`
    query hi {
        hi
    }
`;

export const ME_QUERY = gql`
    query me {
        me {
            id
            username
            sets {
                id
                name
                _count {
                    terms
                }
                author {
                    id
                    username
                }
            }
        }
    }
`;

export const SETS_QUERY = gql`
    query sets {
        sets {
            id
            name
            _count {
                terms
            }
            author {
                id
                username
            }
        }
    }
`;

export const FIND_SET_QUERY = gql`
    query findSet($query: String) {
        findSet(query: $query) {
            id
            name
            _count {
                terms
            }
            author {
                id
                username
            }
        }
    }
`;

export const LEARNING_SET_QUERY = gql`
    query learningSets {
        learningSets {
            id
            name
            _count {
                terms
            }
            author {
                id
                username
            }
        }
    }
`;

export const SET_QUERY = gql`
    query set($id: ID!) {
        set (id: $id) {
            id
            name
            author {
                id
                username
            }
            terms {
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
    }
`;