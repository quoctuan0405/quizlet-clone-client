import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateSetInput = {
  name: Scalars['String'];
  terms: Array<CreateTermInput>;
};

export type CreateTermInput = {
  question: Scalars['String'];
  answer: Scalars['String'];
  options?: Maybe<Array<Maybe<UpsertOption>>>;
  explanation?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  signup?: Maybe<User>;
  login?: Maybe<User>;
  logout?: Maybe<Scalars['Boolean']>;
  setUserLearningSet?: Maybe<Scalars['Boolean']>;
  setUserLearningTerms: Array<Maybe<Term>>;
  resetLearning?: Maybe<Scalars['Boolean']>;
  createSet: Set;
  updateSet: Set;
};


export type MutationSignupArgs = {
  signupInput?: Maybe<SignupInput>;
};


export type MutationLoginArgs = {
  loginInput?: Maybe<LoginInput>;
};


export type MutationSetUserLearningSetArgs = {
  setId: Scalars['ID'];
};


export type MutationSetUserLearningTermsArgs = {
  terms: Array<Maybe<TermReport>>;
};


export type MutationResetLearningArgs = {
  setId: Scalars['ID'];
};


export type MutationCreateSetArgs = {
  createSetInput?: Maybe<CreateSetInput>;
};


export type MutationUpdateSetArgs = {
  updateSetInput?: Maybe<UpdateSetInput>;
};

export type Option = {
  __typename?: 'Option';
  id: Scalars['ID'];
  option: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hi: Scalars['String'];
  user?: Maybe<User>;
  me?: Maybe<User>;
  users: Array<Maybe<User>>;
  sets: Array<Maybe<Set>>;
  learningSets?: Maybe<Array<Maybe<Set>>>;
  findSet?: Maybe<Array<Maybe<Set>>>;
  set?: Maybe<Set>;
  terms: Array<Maybe<Term>>;
  options: Array<Maybe<Option>>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryFindSetArgs = {
  query?: Maybe<Scalars['String']>;
};


export type QuerySetArgs = {
  id: Scalars['ID'];
};


export type QueryTermsArgs = {
  setId: Scalars['ID'];
};


export type QueryOptionsArgs = {
  termId: Scalars['ID'];
};

export type Set = {
  __typename?: 'Set';
  id: Scalars['ID'];
  name: Scalars['String'];
  author: User;
  _count: _CountTerm;
  terms?: Maybe<Array<Maybe<Term>>>;
};

export type SignupInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Term = {
  __typename?: 'Term';
  id: Scalars['ID'];
  question: Scalars['String'];
  answer: Scalars['String'];
  explanation?: Maybe<Scalars['String']>;
  options?: Maybe<Array<Maybe<Option>>>;
  remained?: Maybe<Scalars['Int']>;
  learned?: Maybe<Scalars['Boolean']>;
};

export type TermReport = {
  termId: Scalars['ID'];
  correct: Scalars['Boolean'];
};

export type UpdateSetInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
  terms: Array<UpdateTermInput>;
};

export type UpdateTermInput = {
  id?: Maybe<Scalars['ID']>;
  question: Scalars['String'];
  answer: Scalars['String'];
  options?: Maybe<Array<Maybe<UpsertOption>>>;
  explanation?: Maybe<Scalars['String']>;
};

export type UpsertOption = {
  id?: Maybe<Scalars['ID']>;
  option: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  sets?: Maybe<Array<Maybe<Set>>>;
  learningTerms?: Maybe<Array<Maybe<UserLearningTerm>>>;
  accessToken?: Maybe<Scalars['String']>;
};

export type UserLearningTerm = {
  __typename?: 'UserLearningTerm';
  id: Scalars['ID'];
  user: User;
  term: Term;
  remained: Scalars['Int'];
};

export type _CountTerm = {
  __typename?: '_CountTerm';
  terms: Scalars['Int'];
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'accessToken'>
  )> }
);

export type SignupMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignupMutation = (
  { __typename?: 'Mutation' }
  & { signup?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'accessToken'>
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type SetUserLearningSetMutationVariables = Exact<{
  setId: Scalars['ID'];
}>;


export type SetUserLearningSetMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setUserLearningSet'>
);

export type ReportUserLearningTermsMutationVariables = Exact<{
  terms: Array<Maybe<TermReport>> | Maybe<TermReport>;
}>;


export type ReportUserLearningTermsMutation = (
  { __typename?: 'Mutation' }
  & { setUserLearningTerms: Array<Maybe<(
    { __typename?: 'Term' }
    & Pick<Term, 'id' | 'question' | 'answer' | 'explanation' | 'remained' | 'learned'>
    & { options?: Maybe<Array<Maybe<(
      { __typename?: 'Option' }
      & Pick<Option, 'id' | 'option'>
    )>>> }
  )>> }
);

export type ResetLearningMutationVariables = Exact<{
  setId: Scalars['ID'];
}>;


export type ResetLearningMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'resetLearning'>
);

export type CreateSetMutationVariables = Exact<{
  createSetInput: CreateSetInput;
}>;


export type CreateSetMutation = (
  { __typename?: 'Mutation' }
  & { createSet: (
    { __typename?: 'Set' }
    & Pick<Set, 'id'>
  ) }
);

export type UpdateSetMutationVariables = Exact<{
  updateSetInput: UpdateSetInput;
}>;


export type UpdateSetMutation = (
  { __typename?: 'Mutation' }
  & { updateSet: (
    { __typename?: 'Set' }
    & Pick<Set, 'id'>
  ) }
);

export type HiQueryVariables = Exact<{ [key: string]: never; }>;


export type HiQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hi'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
    & { sets?: Maybe<Array<Maybe<(
      { __typename?: 'Set' }
      & Pick<Set, 'id' | 'name'>
      & { _count: (
        { __typename?: '_CountTerm' }
        & Pick<_CountTerm, 'terms'>
      ), author: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ) }
    )>>> }
  )> }
);

export type SetsQueryVariables = Exact<{ [key: string]: never; }>;


export type SetsQuery = (
  { __typename?: 'Query' }
  & { sets: Array<Maybe<(
    { __typename?: 'Set' }
    & Pick<Set, 'id' | 'name'>
    & { _count: (
      { __typename?: '_CountTerm' }
      & Pick<_CountTerm, 'terms'>
    ), author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  )>> }
);

export type FindSetQueryVariables = Exact<{
  query?: Maybe<Scalars['String']>;
}>;


export type FindSetQuery = (
  { __typename?: 'Query' }
  & { findSet?: Maybe<Array<Maybe<(
    { __typename?: 'Set' }
    & Pick<Set, 'id' | 'name'>
    & { _count: (
      { __typename?: '_CountTerm' }
      & Pick<_CountTerm, 'terms'>
    ), author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  )>>> }
);

export type LearningSetsQueryVariables = Exact<{ [key: string]: never; }>;


export type LearningSetsQuery = (
  { __typename?: 'Query' }
  & { learningSets?: Maybe<Array<Maybe<(
    { __typename?: 'Set' }
    & Pick<Set, 'id' | 'name'>
    & { _count: (
      { __typename?: '_CountTerm' }
      & Pick<_CountTerm, 'terms'>
    ), author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  )>>> }
);

export type SetQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type SetQuery = (
  { __typename?: 'Query' }
  & { set?: Maybe<(
    { __typename?: 'Set' }
    & Pick<Set, 'id' | 'name'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), terms?: Maybe<Array<Maybe<(
      { __typename?: 'Term' }
      & Pick<Term, 'id' | 'question' | 'answer' | 'explanation' | 'remained' | 'learned'>
      & { options?: Maybe<Array<Maybe<(
        { __typename?: 'Option' }
        & Pick<Option, 'id' | 'option'>
      )>>> }
    )>>> }
  )> }
);


export const LoginDocument = gql`
    mutation login($username: String!, $password: String!) {
  login(loginInput: {username: $username, password: $password}) {
    id
    username
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignupDocument = gql`
    mutation signup($username: String!, $password: String!) {
  signup(signupInput: {username: $username, password: $password}) {
    id
    accessToken
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const SetUserLearningSetDocument = gql`
    mutation setUserLearningSet($setId: ID!) {
  setUserLearningSet(setId: $setId)
}
    `;
export type SetUserLearningSetMutationFn = Apollo.MutationFunction<SetUserLearningSetMutation, SetUserLearningSetMutationVariables>;

/**
 * __useSetUserLearningSetMutation__
 *
 * To run a mutation, you first call `useSetUserLearningSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUserLearningSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUserLearningSetMutation, { data, loading, error }] = useSetUserLearningSetMutation({
 *   variables: {
 *      setId: // value for 'setId'
 *   },
 * });
 */
export function useSetUserLearningSetMutation(baseOptions?: Apollo.MutationHookOptions<SetUserLearningSetMutation, SetUserLearningSetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetUserLearningSetMutation, SetUserLearningSetMutationVariables>(SetUserLearningSetDocument, options);
      }
export type SetUserLearningSetMutationHookResult = ReturnType<typeof useSetUserLearningSetMutation>;
export type SetUserLearningSetMutationResult = Apollo.MutationResult<SetUserLearningSetMutation>;
export type SetUserLearningSetMutationOptions = Apollo.BaseMutationOptions<SetUserLearningSetMutation, SetUserLearningSetMutationVariables>;
export const ReportUserLearningTermsDocument = gql`
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
export type ReportUserLearningTermsMutationFn = Apollo.MutationFunction<ReportUserLearningTermsMutation, ReportUserLearningTermsMutationVariables>;

/**
 * __useReportUserLearningTermsMutation__
 *
 * To run a mutation, you first call `useReportUserLearningTermsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportUserLearningTermsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportUserLearningTermsMutation, { data, loading, error }] = useReportUserLearningTermsMutation({
 *   variables: {
 *      terms: // value for 'terms'
 *   },
 * });
 */
export function useReportUserLearningTermsMutation(baseOptions?: Apollo.MutationHookOptions<ReportUserLearningTermsMutation, ReportUserLearningTermsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReportUserLearningTermsMutation, ReportUserLearningTermsMutationVariables>(ReportUserLearningTermsDocument, options);
      }
export type ReportUserLearningTermsMutationHookResult = ReturnType<typeof useReportUserLearningTermsMutation>;
export type ReportUserLearningTermsMutationResult = Apollo.MutationResult<ReportUserLearningTermsMutation>;
export type ReportUserLearningTermsMutationOptions = Apollo.BaseMutationOptions<ReportUserLearningTermsMutation, ReportUserLearningTermsMutationVariables>;
export const ResetLearningDocument = gql`
    mutation resetLearning($setId: ID!) {
  resetLearning(setId: $setId)
}
    `;
export type ResetLearningMutationFn = Apollo.MutationFunction<ResetLearningMutation, ResetLearningMutationVariables>;

/**
 * __useResetLearningMutation__
 *
 * To run a mutation, you first call `useResetLearningMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetLearningMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetLearningMutation, { data, loading, error }] = useResetLearningMutation({
 *   variables: {
 *      setId: // value for 'setId'
 *   },
 * });
 */
export function useResetLearningMutation(baseOptions?: Apollo.MutationHookOptions<ResetLearningMutation, ResetLearningMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetLearningMutation, ResetLearningMutationVariables>(ResetLearningDocument, options);
      }
export type ResetLearningMutationHookResult = ReturnType<typeof useResetLearningMutation>;
export type ResetLearningMutationResult = Apollo.MutationResult<ResetLearningMutation>;
export type ResetLearningMutationOptions = Apollo.BaseMutationOptions<ResetLearningMutation, ResetLearningMutationVariables>;
export const CreateSetDocument = gql`
    mutation createSet($createSetInput: CreateSetInput!) {
  createSet(createSetInput: $createSetInput) {
    id
  }
}
    `;
export type CreateSetMutationFn = Apollo.MutationFunction<CreateSetMutation, CreateSetMutationVariables>;

/**
 * __useCreateSetMutation__
 *
 * To run a mutation, you first call `useCreateSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSetMutation, { data, loading, error }] = useCreateSetMutation({
 *   variables: {
 *      createSetInput: // value for 'createSetInput'
 *   },
 * });
 */
export function useCreateSetMutation(baseOptions?: Apollo.MutationHookOptions<CreateSetMutation, CreateSetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSetMutation, CreateSetMutationVariables>(CreateSetDocument, options);
      }
export type CreateSetMutationHookResult = ReturnType<typeof useCreateSetMutation>;
export type CreateSetMutationResult = Apollo.MutationResult<CreateSetMutation>;
export type CreateSetMutationOptions = Apollo.BaseMutationOptions<CreateSetMutation, CreateSetMutationVariables>;
export const UpdateSetDocument = gql`
    mutation updateSet($updateSetInput: UpdateSetInput!) {
  updateSet(updateSetInput: $updateSetInput) {
    id
  }
}
    `;
export type UpdateSetMutationFn = Apollo.MutationFunction<UpdateSetMutation, UpdateSetMutationVariables>;

/**
 * __useUpdateSetMutation__
 *
 * To run a mutation, you first call `useUpdateSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSetMutation, { data, loading, error }] = useUpdateSetMutation({
 *   variables: {
 *      updateSetInput: // value for 'updateSetInput'
 *   },
 * });
 */
export function useUpdateSetMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSetMutation, UpdateSetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSetMutation, UpdateSetMutationVariables>(UpdateSetDocument, options);
      }
export type UpdateSetMutationHookResult = ReturnType<typeof useUpdateSetMutation>;
export type UpdateSetMutationResult = Apollo.MutationResult<UpdateSetMutation>;
export type UpdateSetMutationOptions = Apollo.BaseMutationOptions<UpdateSetMutation, UpdateSetMutationVariables>;
export const HiDocument = gql`
    query hi {
  hi
}
    `;

/**
 * __useHiQuery__
 *
 * To run a query within a React component, call `useHiQuery` and pass it any options that fit your needs.
 * When your component renders, `useHiQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHiQuery({
 *   variables: {
 *   },
 * });
 */
export function useHiQuery(baseOptions?: Apollo.QueryHookOptions<HiQuery, HiQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HiQuery, HiQueryVariables>(HiDocument, options);
      }
export function useHiLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HiQuery, HiQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HiQuery, HiQueryVariables>(HiDocument, options);
        }
export type HiQueryHookResult = ReturnType<typeof useHiQuery>;
export type HiLazyQueryHookResult = ReturnType<typeof useHiLazyQuery>;
export type HiQueryResult = Apollo.QueryResult<HiQuery, HiQueryVariables>;
export const MeDocument = gql`
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

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SetsDocument = gql`
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

/**
 * __useSetsQuery__
 *
 * To run a query within a React component, call `useSetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSetsQuery(baseOptions?: Apollo.QueryHookOptions<SetsQuery, SetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SetsQuery, SetsQueryVariables>(SetsDocument, options);
      }
export function useSetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SetsQuery, SetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SetsQuery, SetsQueryVariables>(SetsDocument, options);
        }
export type SetsQueryHookResult = ReturnType<typeof useSetsQuery>;
export type SetsLazyQueryHookResult = ReturnType<typeof useSetsLazyQuery>;
export type SetsQueryResult = Apollo.QueryResult<SetsQuery, SetsQueryVariables>;
export const FindSetDocument = gql`
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

/**
 * __useFindSetQuery__
 *
 * To run a query within a React component, call `useFindSetQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSetQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useFindSetQuery(baseOptions?: Apollo.QueryHookOptions<FindSetQuery, FindSetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindSetQuery, FindSetQueryVariables>(FindSetDocument, options);
      }
export function useFindSetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindSetQuery, FindSetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindSetQuery, FindSetQueryVariables>(FindSetDocument, options);
        }
export type FindSetQueryHookResult = ReturnType<typeof useFindSetQuery>;
export type FindSetLazyQueryHookResult = ReturnType<typeof useFindSetLazyQuery>;
export type FindSetQueryResult = Apollo.QueryResult<FindSetQuery, FindSetQueryVariables>;
export const LearningSetsDocument = gql`
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

/**
 * __useLearningSetsQuery__
 *
 * To run a query within a React component, call `useLearningSetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLearningSetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLearningSetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useLearningSetsQuery(baseOptions?: Apollo.QueryHookOptions<LearningSetsQuery, LearningSetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LearningSetsQuery, LearningSetsQueryVariables>(LearningSetsDocument, options);
      }
export function useLearningSetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LearningSetsQuery, LearningSetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LearningSetsQuery, LearningSetsQueryVariables>(LearningSetsDocument, options);
        }
export type LearningSetsQueryHookResult = ReturnType<typeof useLearningSetsQuery>;
export type LearningSetsLazyQueryHookResult = ReturnType<typeof useLearningSetsLazyQuery>;
export type LearningSetsQueryResult = Apollo.QueryResult<LearningSetsQuery, LearningSetsQueryVariables>;
export const SetDocument = gql`
    query set($id: ID!) {
  set(id: $id) {
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

/**
 * __useSetQuery__
 *
 * To run a query within a React component, call `useSetQuery` and pass it any options that fit your needs.
 * When your component renders, `useSetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSetQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSetQuery(baseOptions: Apollo.QueryHookOptions<SetQuery, SetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SetQuery, SetQueryVariables>(SetDocument, options);
      }
export function useSetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SetQuery, SetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SetQuery, SetQueryVariables>(SetDocument, options);
        }
export type SetQueryHookResult = ReturnType<typeof useSetQuery>;
export type SetLazyQueryHookResult = ReturnType<typeof useSetLazyQuery>;
export type SetQueryResult = Apollo.QueryResult<SetQuery, SetQueryVariables>;