import { ApolloClient, InMemoryCache , ApolloProvider } from '@apollo/client';

// components
import Booklist from './components/BookList';
import AddBook from './components/AddBook';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>My Reading List</h1>
        <Booklist />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
