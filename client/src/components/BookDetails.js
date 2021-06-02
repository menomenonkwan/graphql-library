import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queries';
import Loader from "react-loader-spinner";

const BookDetails = ({ bookId }) => {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: bookId }
  });
  if (loading) return (
    <div id="book-details">
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    </div>
  );
  if (error) return <div id="book-details"><p>Error :(</p></div>;

  if (data.book) {
    return (
      <div id="book-details">
        <h2>{data.book.name}</h2>
        <p>{data.book.genre}</p>
        <p>{data.book.author.name}</p>
        <p>All books by this author:</p>
        <ul className="other-books">
          {data.book.author.books.map(lit => {
            return <li key={lit.id}>{lit.name}</li>
          })}
        </ul>
      </div>
    );
  } else {
    return (
      <div id="book-details">
        No data to display...
      </div>
    )
  }
}
 
export default BookDetails;