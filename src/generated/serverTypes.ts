export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
