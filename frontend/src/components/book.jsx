import AddBook from "./addbook";
import Button from "react-bootstrap/Button";
import { Table, Pagination } from "react-bootstrap";
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
  const [book, setBook] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { showAddBook, showViewBook, showEditBook, showDeleteBook, errors } =
    state;

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state

  const booksApiUrl = "http://localhost:3001/books";
  const [booksData] = useFetch(booksApiUrl);

  useEffect(() => {
    if (booksData) {
      setBooks(booksData);
      setLoading(false);
    }
  }, [booksData]);

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

  return (
    <div>
      <div className="container mt-5">
        <div className="row mb-3">
          <div className="col-11 text-end">
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
          <div className="col-1"></div>
          <div className="col-10">
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
                  responsive="true"
                  hover
                  className="shadow table-striped"
                >
                  <thead>
                    <tr className="table-header">
                      <th style={{ backgroundColor: "#daa556" }}>Book Title</th>
                      <th style={{ backgroundColor: "#daa556" }}>Price</th>
                      <th style={{ backgroundColor: "#daa556" }}>
                        {" "}
                        Publication Date
                      </th>
                      <th style={{ backgroundColor: "#daa556" }}> View</th>
                      <th style={{ backgroundColor: "#daa556" }}> Edit</th>
                      <th style={{ backgroundColor: "#daa556" }}> Delete</th>
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
                              onClick={() => handelShowViewBook(book.book_id)}
                            >
                              <i className="bi bi-binoculars-fill"></i>
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btnorange"
                              onClick={() => handelShowEditBook(book.book_id)}
                            >
                              <i className="bi bi-pen-fill"></i>
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btnorange"
                              onClick={() => handelShowDeleteBook(book.book_id)}
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
                  <Pagination responsive="true" className="custom-pagination">
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
          <div className="col-1"></div>
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
