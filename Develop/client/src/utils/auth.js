// Import the necessary packages
import decode from 'jwt-decode';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create an Apollo HTTP link
const httpLink = createHttpLink({
  uri: 'YOUR_GRAPHQL_API_ENDPOINT', // Replace with your actual GraphQL API endpoint
});

// Create an Apollo auth link to set the JWT token in the request headers
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // Set the token in the request headers
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create the Apollo Client instance
const apolloClient = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

// Modify the AuthService class to work with GraphQL and JWT
class AuthService {
  // ... (existing methods)

  // Example method to fetch user data from the GraphQL API
  async fetchUserData() {
    try {
      const userData = await apolloClient.query({
        query: YOUR_USER_QUERY, // Replace with your actual user query
      });
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }
}

// Export the modified AuthService instance
export default new AuthService();