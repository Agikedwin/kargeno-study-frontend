import {
  ApolloClient,
  ApolloLink,
  concat,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';

// const { REACT_APP_URL } = process.env;

/**URL for the server */
const uploadLink = createUploadLink({
  //uri: 'http://localhost:9005/playground',
  uri: 'http://localhost:3005',
});

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      // eslint-disable-next-line no-console
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  // eslint-disable-next-line no-console
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authMiddleware = setContext((_, { headers }) => {
  const token = localStorage.getItem('state');

  // add the authorization to the headers
  if (token) {
    const jwt = JSON.parse(token)['auth']['access_token'];

    return {
      headers: {
        ...headers,
        Authorization: token ? `JWT ${jwt}` : '',
      },
    };
  }
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore',
  },

  query: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  },
};

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink.concat(concat(authMiddleware, uploadLink))]),
  credentials: 'include',
  defaultOptions: defaultOptions,
  onError: (error) => error,
});

export { client };
