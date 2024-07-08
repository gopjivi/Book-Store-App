import NewAuthor from "./newauthor";
import Button from "react-bootstrap/Button";
import { Table, Pagination } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useState, useEffect } from "react";
import { useFetch } from "../services/useFetch";
import EditAuthor from "./editauthor";
import { getDataById } from "../services/service";
import { getAllData } from "../services/service";
import DeleteAuthor from "./deleteauthor";

export default function Author() {
  const [authors, setAuthors] = useState([]);
  const [author, setAuthor] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddAuthor, setShowAddAuthor] = useState(false);
  const [showEditAuthor, setShowEditAuthor] = useState(false);
  const [showDeleteAuthor, setShowDeleteAuthor] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [errors, setErrors] = useState({});
  const authorsApiUrl = "http://localhost:3001/authors";
  const [authorsData] = useFetch(authorsApiUrl);
  const itemsPerPage = 5;

  useEffect(() => {
    if (authorsData) {
      setAuthors(authorsData);
      setLoading(false);
    }
  }, [authorsData]);

  const totalItems = authors.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = authors.slice(startIndex, endIndex);

  function handleShowAddAuthor() {
    setShowAddAuthor(true);
    setErrors({});
  }
  function handleCloseAddAuthor() {
    setShowAddAuthor(false);
    setErrors({});
    refetchAuthors();
  }

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function refetchAuthors() {
    getAllData(authorsApiUrl)
      .then((data) => {
        setAuthors(data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => console.error("Error fetching authors:", error));
  }
  useEffect(() => {
    if (authors) {
      console.log("authors", author);
    }
  }, [authors]);

  function handelShowEditAuthor(id) {
    setShowEditAuthor(true);
    getDataById(authorsApiUrl, id)
      .then((data) => {
        setAuthor(data);
      })
      .catch((error) => console.error("Error fetching author:", error));
    setErrors({});
  }

  function handelShowDeleteAuthor(id) {
    setShowDeleteAuthor(true);
    getDataById(authorsApiUrl, id)
      .then((data) => {
        setAuthor(data);
      })
      .catch((error) => console.error("Error fetching author:", error));
    setErrors({});
  }

  useEffect(() => {
    if (author) {
      console.log("author", author);
    }
  }, [author]);

  function handleCloseEditAuthor() {
    setShowEditAuthor(false);
    setErrors({});
    refetchAuthors();
  }

  function handleCloseDeleteAuthor() {
    setShowDeleteAuthor(false);
    setErrors({});
    refetchAuthors();
  }

  return (
    <div>
      <div className="container mt-5">
        <div className="row mb-3">
          <div className="col-11 text-end">
            <Button
              variant="custom-orange"
              className="btn btnorange"
              onClick={handleShowAddAuthor}
            >
              <i className="bi bi-plus-lg"></i> Add New Author
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
                      <th style={{ backgroundColor: "#daa556" }}>
                        Author Name
                      </th>
                      <th style={{ backgroundColor: "#daa556" }}>
                        Display Name
                      </th>
                      <th style={{ backgroundColor: "#daa556" }}> Biography</th>
                      <th style={{ backgroundColor: "#daa556" }}> Edit</th>
                      <th style={{ backgroundColor: "#daa556" }}> Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((author) => (
                        <tr key={author.author_id}>
                          <td>{author.name}</td>
                          <td>{author.display_name}</td>
                          <td>{author.biography}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btnorange"
                              onClick={() =>
                                handelShowEditAuthor(author.author_id)
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
                                handelShowDeleteAuthor(author.author_id)
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

        <NewAuthor
          show={showAddAuthor}
          handleClose={handleCloseAddAuthor}
          errors={errors}
          setErrors={setErrors}
        />
      </div>

      <EditAuthor
        show={showEditAuthor}
        handleClose={handleCloseEditAuthor}
        errors={errors}
        author={author}
        setAuthor={setAuthor}
        setErrors={setErrors}
      />
      <DeleteAuthor
        show={showDeleteAuthor}
        handleClose={handleCloseDeleteAuthor}
        author={author}
      />
    </div>
  );
}
