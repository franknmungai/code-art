import { ApolloClient, InMemoryCache } from '@apollo/client';

let client = new ApolloClient({
  uri: 'https://southlake.stepzen.net/api/canvas-art/__graphql',
  headers: {
    'Content-type': 'application/json',
  },
  cache: new InMemoryCache(),
});

if (!!process.env?.NEXT_PUBLIC_STEPZEN_API_KEY) {
  // Production
  client = new ApolloClient({
    uri: 'https://southlake.stepzen.net/api/canvas-art/__graphql',
    headers: {
      Authorization: ('Apikey ' +
        process.env?.NEXT_PUBLIC_STEPZEN_API_KEY) as string,
      'Content-type': 'application/json',
    },
    cache: new InMemoryCache(),
  });
}

// const client = new ApolloClient({
//   uri: 'http://localhost:5001/api/canvas-art',
//   cache: new InMemoryCache(),
// });

export default client;
