import AddBook from "./addbook";
import Button from "react-bootstrap/Button";
import { Table, Pagination, Form } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useState, useEffect, useReducer } from "react";
import { useFetch } from "../services/useFetch";
import { getDataById } from "../services/service";
import { getAllData } from "../services/service";
import EditBook from "./editbook";
import ViewBook from "./viewbook";
import DeleteBook from "./deletebook";

const initialState = {
  showAddBook: false,
  showEditBook: false,
  showDeleteBook: false,
  errors: {},
};
function reducer(state, action) {
  switch (action.type) {
    case "SHOW_ADD_BOOK":
      return { ...state, showAddBook: true, errors: {} };
    case "HIDE_ADD_BOOK":
      return { ...state, showAddBook: false, errors: {} };
    case "SHOW_VIEW_BOOK":
      return { ...state, showViewBook: true, errors: {} };
    case "HIDE_VIEW_BOOK":
      return { ...state, showViewBook: false, errors: {} };
    case "SHOW_EDIT_BOOK":
      return { ...state, showEditBook: true, errors: {} };
    case "HIDE_EDIT_BOOK":
      return { ...state, showEditBook: false, errors: {} };
    case "SHOW_DELETE_BOOK":
      return { ...state, showDeleteBook: true, errors: {} };
    case "HIDE_DELETE_BOOK":
      return { ...state, showDeleteBook: false, errors: {} };
    case "SET_ERRORS":
      return { ...state, errors: action.payload };
    default:
      return state;
  }
}

export default function Book() {
  const [books, setBooks] = useState([]);
  const [booksCopy, setBooksCopy] = useState([]);
  const [book, setBook] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { showAddBook, showViewBook, showEditBook, showDeleteBook, errors } =
    state;

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state
  const [searchByTitle, setSearchByTitle] = useState("");

  const [authors, setAuthors] = useState({});
  const [genres, setGenres] = useState({});
  const [languages, setLanguages] = useState({});

  const [languageValue, setLanguageValue] = useState("");
  const [authorValue, setAuthorValue] = useState("");
  const [genreValue, setGenreValue] = useState("");
  const [isOfferAvailable, setIsOfferAvailable] = useState(false);

  const booksApiUrl = "http://localhost:3001/books";
  const [booksData] = useFetch(booksApiUrl);

  const authorsApiUrl = "http://localhost:3001/authors";
  const genresApiUrl = "http://localhost:3001/genres";
  const languageApiUrl = "http://localhost:3001/languages";

  const [authorsData] = useFetch(authorsApiUrl);
  const [genresData] = useFetch(genresApiUrl);
  const [languageData] = useFetch(languageApiUrl);

  useEffect(() => {
    if (booksData) {
      setBooks(booksData);
      setLoading(false);
      setBooksCopy(booksData);
    }
  }, [booksData]);

  useEffect(() => {
    if (authorsData) {
      setAuthors(authorsData);
    }
    if (genresData) {
      setGenres(genresData);
    }
    if (languageData) {
      setLanguages(languageData);
    }
  });

  const itemsPerPage = 5;
  const totalItems = books.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = books.slice(startIndex, endIndex);

  function handleShowAddBook() {
    dispatch({ type: "SHOW_ADD_BOOK" });
  }
  function handleCloseAddBook() {
    dispatch({ type: "HIDE_ADD_BOOK" });
    refetchBooks();
  }

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function refetchBooks() {
    getAllData(booksApiUrl)
      .then((data) => {
        setBooks(data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => console.error("Error fetching books:", error));
  }

  function handelShowEditBook(id) {
    dispatch({ type: "SHOW_EDIT_BOOK" });
    getDataById(booksApiUrl, id)
      .then((data) => {
        setBook(data);
      })
      .catch((error) => console.error("Error fetching book:", error));
  }

  function handleCloseEditBook() {
    dispatch({ type: "HIDE_EDIT_BOOK" });
    refetchBooks();
  }

  function handelShowViewBook(id) {
    dispatch({ type: "SHOW_VIEW_BOOK" });
    getDataById(booksApiUrl, id)
      .then((data) => {
        setBook(data);
      })
      .catch((error) => console.error("Error fetching book:", error));
  }

  function handleCloseViewBook() {
    dispatch({ type: "HIDE_VIEW_BOOK" });
    refetchBooks();
  }
  function handelShowDeleteBook(id) {
    dispatch({ type: "SHOW_DELETE_BOOK" });
    getDataById(booksApiUrl, id)
      .then((data) => {
        setBook(data);
      })
      .catch((error) => console.error("Error fetching book:", error));
  }

  function handleCloseDeleteBook() {
    dispatch({ type: "HIDE_DELETE_BOOK" });
    refetchBooks();
  }

  function handleSearchByTitle(e) {
    setSearchByTitle(e.target.value);
    let [filteredBooks] = [books];
    let input = e.target.value;
    console.log(filteredBooks);
    if (input.length > 0) {
      filteredBooks = filteredBooks.filter((book) =>
        book.title.toLowerCase().includes(input.toLowerCase())
      );
      setBooks(filteredBooks);
    } else {
      setBooks(booksCopy);
    }
  }
  function handleLanguageChange(e) {
    const selectedValue = e.target.value;
    console.log("language", selectedValue);
    setLanguageValue(e.target.value);

    FilterBooks(selectedValue, genreValue, authorValue, isOfferAvailable);
  }
  function handleGenreChange(e) {
    const selectedValue = e.target.value;
    console.log("genre", selectedValue);
    setGenreValue(e.target.value);

    FilterBooks(languageValue, selectedValue, authorValue, isOfferAvailable);
  }
  function handleAuthorChange(e) {
    const selectedValue = e.target.value;
    console.log("Author", selectedValue);
    setAuthorValue(e.target.value);

    FilterBooks(languageValue, genreValue, selectedValue, isOfferAvailable);
  }

  function FilterBooks(
    languageValue,
    genreValue,
    authorValue,
    isOfferAvailable
  ) {
    // If all filter values are empty, reset to the original books array
    console.log("isOfferAvailable value", isOfferAvailable);

    if (languageValue === "" && genreValue === "" && authorValue === "") {
      console.log("books", books);
      if (isOfferAvailable) {
        let offerBooks = books.filter(
          (book) => book.is_offer_available === true
        );
        console.log("filteredbooks by author", offerBooks);
        setBooks(offerBooks);
        return;
      } else {
        setBooks(booksCopy);
        return;
      }
    }

    let filteredBooks = [...books]; // Assuming books is your original array

    console.log("before filtering", filteredBooks);
    console.log("languageValue", languageValue);
    console.log("genreValue", genreValue);
    console.log("authorValue", authorValue);

    // Apply language filter if value is provided
    if (languageValue !== "") {
      filteredBooks = filteredBooks.filter(
        (book) => book.language_id === parseInt(languageValue, 10)
      );
      console.log("filteredbooks by language", filteredBooks);
    }

    // Apply genre filter if value is provided
    if (genreValue !== "") {
      filteredBooks = filteredBooks.filter(
        (book) => book.genre_id === parseInt(genreValue, 10)
      );
      console.log("filteredbooks by genre", filteredBooks);
    }

    // Apply author filter if value is provided
    if (authorValue !== "") {
      filteredBooks = filteredBooks.filter(
        (book) => book.author_id === parseInt(authorValue, 10)
      );
      console.log("filtered books by author", filteredBooks);
    }
    //setBooks(filteredBooks);

    if (isOfferAvailable) {
      filteredBooks = filteredBooks.filter(
        (book) => book.is_offer_available === true
      );
      setBooks(filteredBooks);
      console.log("filtered books by author", filteredBooks);
    } else {
      setBooks(filteredBooks);
    }
  }

  function handelClearAll() {
    setLanguageValue("");
    setGenreValue("");
    setAuthorValue("");
    setBooks(booksCopy);
    setIsOfferAvailable(false);
  }
  function sortByPriceASC() {
    const sorted = [...books].sort((a, b) => a.price - b.price);
    setBooks(sorted);
  }
  function sortByPriceDESC() {
    const sorted = [...books].sort((a, b) => b.price - a.price);
    setBooks(sorted);
  }

  function handleFilterOffer(e) {
    const isChecked = e.target.checked;
    console.log("Switch is", isChecked ? "on" : "off");
    setIsOfferAvailable(isChecked);

    FilterBooks(languageValue, genreValue, authorValue, isChecked);
  }
  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div
            className="col-lg-2 col-md-3 col-sm-4 col-12"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <div className="row mb-2">
              <div className="col-6">
                <h5>Filter By:</h5>
              </div>
              <div className="col-6 text-end">
                <button
                  type="button"
                  className="custom-orange btnorange"
                  onClick={handelClearAll}
                >
                  Clear All
                </button>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col">
                <h6>Language</h6>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col">
                <Form.Select
                  onChange={(e) => handleLanguageChange(e)}
                  value={languageValue}
                >
                  <option value="">Choose...</option>
                  {languages.length > 0 &&
                    languages.map((language) => (
                      <option
                        key={language.language_id}
                        value={language.language_id}
                      >
                        {language.language_name}
                      </option>
                    ))}
                </Form.Select>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col">
                <h6>Genre</h6>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col">
                <Form.Select
                  onChange={(e) => handleGenreChange(e)}
                  value={genreValue}
                >
                  <option value="">Choose...</option>
                  {genres.length > 0 &&
                    genres.map((genre) => (
                      <option key={genre.genre_id} value={genre.genre_id}>
                        {genre.genre_name}
                      </option>
                    ))}
                </Form.Select>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col">
                <h6>Authors</h6>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col" style={{ marginBottom: "20px" }}>
                <Form.Select
                  onChange={(e) => handleAuthorChange(e)}
                  value={authorValue}
                >
                  <option value="">Choose...</option>
                  {authors.length > 0 &&
                    authors.map((author) => (
                      <option key={author.author_id} value={author.author_id}>
                        {author.display_name}
                      </option>
                    ))}
                </Form.Select>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col">
                <div className="d-flex justify-content-between align-items-center">
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckDefault"
                  >
                    Offers
                  </label>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      checked={isOfferAvailable}
                      onChange={(e) => handleFilterOffer(e)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-10 col-md-9 col-sm-8 col-12">
            <div className="row mb-3">
              <div className="col-md-6 col-sm-12">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Book Title"
                    value={searchByTitle}
                    onChange={(e) => handleSearchByTitle(e)}
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-12 text-end">
                <Button
                  variant="custom-orange"
                  className="btn btnorange"
                  onClick={handleShowAddBook}
                >
                  <i className="bi bi-plus-lg"></i> Add New Book
                </Button>
              </div>
            </div>
            <div className="row">
              <div className="col">
                {loading ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "50vh" }}
                  >
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                ) : (
                  <>
                    <Table
                      striped
                      bordered
                      responsive
                      hover
                      className="shadow table-striped"
                    >
                      <thead>
                        <tr className="table-header">
                          <th style={{ backgroundColor: "#daa556" }}>
                            Book Title
                          </th>
                          <th style={{ backgroundColor: "#daa556" }}>
                            <div className="price-container">
                              Price
                              <div className="arrow-container">
                                <i
                                  className="bi bi-caret-up-fill arrow-up"
                                  onClick={sortByPriceASC}
                                ></i>
                                <i
                                  className="bi bi-caret-down-fill arrow-down"
                                  onClick={sortByPriceDESC}
                                ></i>
                              </div>
                            </div>
                          </th>
                          <th style={{ backgroundColor: "#daa556" }}>
                            Publication Date
                          </th>
                          <th style={{ backgroundColor: "#daa556" }}> View</th>
                          <th style={{ backgroundColor: "#daa556" }}> Edit</th>
                          <th style={{ backgroundColor: "#daa556" }}>
                            {" "}
                            Delete
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.length > 0 ? (
                          paginatedData.map((book) => (
                            <tr key={book.book_id}>
                              <td>{book.title}</td>
                              <td>{book.price}</td>
                              <td>{book.publication_date}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btnorange"
                                  onClick={() =>
                                    handelShowViewBook(book.book_id)
                                  }
                                >
                                  <i className="bi bi-binoculars-fill"></i>
                                </button>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btnorange"
                                  onClick={() =>
                                    handelShowEditBook(book.book_id)
                                  }
                                >
                                  <i className="bi bi-pen-fill"></i>
                                </button>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btnorange"
                                  onClick={() =>
                                    handelShowDeleteBook(book.book_id)
                                  }
                                >
                                  <i className="bi bi-trash-fill"></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7">
                              <div
                                id="noresult"
                                className="text-center bg-light text-danger"
                              >
                                No Results Found !!!
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                    <div className="d-flex justify-content-between align-items-center">
                      <span>
                        Showing {startIndex + 1} to {endIndex} of {totalItems}{" "}
                        results
                      </span>
                      <Pagination responsive className="custom-pagination">
                        <Pagination.First
                          onClick={() => handlePageChange(1)}
                          disabled={currentPage === 1}
                        />
                        <Pagination.Prev
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        />
                        {Array.from({ length: totalPages }, (_, idx) => (
                          <Pagination.Item
                            key={idx + 1}
                            active={idx + 1 === currentPage}
                            onClick={() => handlePageChange(idx + 1)}
                          >
                            {idx + 1}
                          </Pagination.Item>
                        ))}
                        <Pagination.Next
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        />
                        <Pagination.Last
                          onClick={() => handlePageChange(totalPages)}
                          disabled={currentPage === totalPages}
                        />
                      </Pagination>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <AddBook
          show={showAddBook}
          handleClose={handleCloseAddBook}
          errors={errors}
          setErrors={(errors) =>
            dispatch({ type: "SET_ERRORS", payload: errors })
          }
        />
      </div>

      <EditBook
        show={showEditBook}
        handleClose={handleCloseEditBook}
        errors={errors}
        book={book}
        setBook={setBook}
        setErrors={(errors) =>
          dispatch({ type: "SET_ERRORS", payload: errors })
        }
      />
      <ViewBook
        show={showViewBook}
        handleClose={handleCloseViewBook}
        book={book}
        setBook={setBook}
      />
      <DeleteBook
        show={showDeleteBook}
        handleClose={handleCloseDeleteBook}
        book={book}
      />
    </div>
  );
}
