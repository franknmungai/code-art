import { ApolloClient, InMemoryCache } from '@apollo/client';

// Production
const client = new ApolloClient({
  uri: 'https://southlake.stepzen.net/api/canvas-art/__graphql',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `APIKey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
  },
  cache: new InMemoryCache(),
});

// const client = new ApolloClient({
//   uri: 'http://localhost:5001/api/canvas-art',
//   cache: new InMemoryCache(),
// });

export default client;
