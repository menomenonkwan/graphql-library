
import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

const displayAuthors = (loading, data) => {
  if(loading){
    return( <option disabled>Loading authors</option> );
  } else {
    return data.authors.map(author => (
      <option key={ author.id } value={author.id}>{ author.name }</option>
    ));
  }
}

const AddBook = () => {
  const [name, setName] = useState(null);
  const [genre, setGenre] = useState(null);
  const [authorId, setAuthorId] = useState(null);
  const [addBookMut] = useMutation(addBookMutation);
  const { loading, error, data } = useQuery(getAuthorsQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    addBookMut({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }

  return ( 
    <form id="add-book" onSubmit={handleSubmit}>

      <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={(e) => setName(e.target.value)}/>
      </div>

      <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={(e) => setGenre(e.target.value)} />
      </div>

      <div className="field">
          <label>Author:</label>
          <select onChange={(e) => setAuthorId(e.target.value)}>
              <option>Select author</option>
              { displayAuthors(loading, data) }
          </select>
      </div>

      <button>+</button>

    </form>
  );
}
 
export default AddBook;
