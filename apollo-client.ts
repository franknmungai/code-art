import { ApolloClient, InMemoryCache } from '@apollo/client';
import { STEPZEN_API_KEY } from './utils/env';

// Production
const client = new ApolloClient({
  uri: 'https://southlake.stepzen.net/api/canvas-art/__graphql',
  headers: {
    Authorization: ('Apikey ' +
      STEPZEN_API_KEY) /*process.env?.STEPZEN_API_KEY*/ as string,
  },
  cache: new InMemoryCache(),
});

// const client = new ApolloClient({
//   uri: 'http://localhost:5001/api/canvas-art',
//   cache: new InMemoryCache(),
// });

export default client;
