import { gql } from '@apollo/client';

const getAuthorsQuery = gql`
  query ALL_AUTHORS_QUERY {
    authors {
      name
      id
    }
  }
`;

const getBooksQuery = gql`
  query ALL_BOOKS_QUERY {
    books {
      name
      id
    }
  }
`;

const addBookMutation = gql`
  mutation(
    $name: String!, 
    $genre: String!, 
    $authorId: ID!
  ) {
    addBook(
      name: $name, 
      genre: $genre, 
      authorId: $authorId
    ) {
      name
      id
    }
  }
`;

const getBookQuery = gql`
  query SINGLE_BOOK_QUERY($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery};