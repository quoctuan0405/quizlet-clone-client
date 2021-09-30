<h1 align="center"><a href="https://quizlet-clone-client.vercel.app/">Quizlet clone</a> (client side)</h1>

## Why I made this project

Many use [Quizlet](https://quizlet.com) not just to memorize terms but also to learn by heart an entire question bank (multiple choice questions type). This project add one feature that [Quizlet](https://quizlet.com) not currently have: the creator can add multiple options for each of their terms for learner to choose in learning mode.

## How I worked on this project

- I use GraphQL.
- I use [Prisma](https://prisma.io) as an ORM due to its easy-to-use API and its ability to work seamlessly with Typescript.
- For the client side, I use [Next.js](https://nextjs.org) with [Apollo](https://https://www.apollographql.com).
- For the server side, I use [Nest.js](https://nestjs.com).

## Why I build the project this way

- I use GraphQL because it is easy to build-and-use API with the support of [Prisma](https://prisma.io).
- I didn't use a state management library like Redux or MobX because I already use [Apollo](https://https://www.apollographql.com) complete with its own cache system.
- I use [Material UI](https://material-ui.com/) instead of custom module CSS because I don't have time to build the feel and look of each individual component.
- I didn't build this application with Docker or Kubernetes in mind or use microservices architecture because hosting a Kubernetes app will cost money.

## If I have more time

- Set up CI/CD integration
- Write some integration and system testing
- Add support for Docker and Kubernetes

## Available Scripts

### Installation

```bash
$ npm install
```

### Development
First, you must create an `.env.local` file that host 2 environment variables `NEXT_PUBLIC_SERVER_URL` and `NEXT_PUBLIC_WS_SERVER_URL`. It's something like this:

```
NEXT_PUBLIC_SERVER_URL=http://localhost:4000/graphql
NEXT_PUBLIC_WS_SERVER_URL=ws://localhost:4000/graphql
```

Now, you can run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Generate auto-typed from GraphQL Schema for Typescript
```bash
npm run generate
```

### Deployment
```bash
npm run build
# then
npm run start
```
