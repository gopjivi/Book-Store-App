import Col from "react-bootstrap/Col";
import { Form, InputGroup, Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";
import { createNewData } from "../services/service";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useFetch } from "../services/useFetch";
import CustomAlert from "./customalert";

export default function AddBook({ show, handleClose, errors, setErrors }) {
  const [book, setBook] = useState({
    title: "",
    price: "",
    publication_date: "",
    edition: "",
    stock_quantity: "",
    image_URL: "",
    storage_section: "",
    storage_shelf: "",
    is_offer_available: "",
    author_id: "",
    language_id: "",
    genre_id: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [offerAvailable, setOfferAvailable] = useState(false);
  const [authors, setAuthors] = useState({});
  const [genres, setGenres] = useState({});
  const [languages, setLanguages] = useState({});
  const [maxDate, setMaxDate] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const booksApiUrl = "http://localhost:3001/books";
  const authorsApiUrl = "http://localhost:3001/authors";
  const genresApiUrl = "http://localhost:3001/genres";
  const languageApiUrl = "http://localhost:3001/languages";
  const editions = [
    "First Edition",
    "Second Edition",
    "Third Edition",
    "Revised Edition",
    "Special Edition",
  ];

  const [authorsData] = useFetch(authorsApiUrl);
  const [genresData] = useFetch(genresApiUrl);
  const [languageData] = useFetch(languageApiUrl);

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

    // Set max date
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${yyyy}-${mm}-${dd}`;
    setMaxDate(formattedDate);
  }, [authorsData, genresData, languageData]);

  const handleRadioChange = (value) => {
    setOfferAvailable(value);
  };

  async function validateBook() {
    const errors = {};

    if (!book.title) {
      errors.title = "Book Title is Required";
    }
    if (!book.price) {
      errors.price = "Book Price is Required";
    }
    if (!book.author_id) {
      errors.author_id = "Author is Required";
    }
    if (!book.language_id) {
      errors.language_id = "Language is Required";
    }
    if (!book.genre_id) {
      errors.genre_id = "Genre is Required";
    }
    if (!book.publication_date) {
      errors.publication_date = "Publication date is Required";
    }
    if (!book.stock_quantity) {
      errors.stock_quantity = "Stock quantity is Required";
    }
    if (!book.storage_section) {
      errors.storage_section = "Stock Section is Required";
    }

    return errors;
  }

  function handleCloseAlert() {
    setShowAlert(false);
  }
  function handleLanguageChange(event) {
    const selectedLanguageId = event.target.value;
    setBook({ ...book, language_id: selectedLanguageId });

    const selectedLanguage = languages.find(
      (language) => language.language_id === parseInt(selectedLanguageId)
    );
    const selectedLanguageName = selectedLanguage?.language_name || "";

    setSelectedLanguage(selectedLanguageName);
    updateStorageSection(selectedLanguageName, selectedGenre);
  }

  function handleGenreChange(event) {
    const selectedGenreId = event.target.value;
    const selectedGenre = genres.find(
      (genre) => genre.genre_id === parseInt(selectedGenreId)
    );
    const selectedGenreName = selectedGenre?.genre_name || "";
    setBook({ ...book, genre_id: selectedGenreId });
    setSelectedGenre(selectedGenreName);
    updateStorageSection(selectedLanguage, selectedGenreName);
  }

  function updateStorageSection(languageName, genreName) {
    if (languageName && genreName) {
      const newStorageSection = `${languageName} - ${genreName}`;
      setBook((prevBook) => ({
        ...prevBook,
        storage_section: newStorageSection,
      }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = await validateBook();
    book.is_offer_available = offerAvailable;
    console.log(validationErrors);
    const formData = new FormData();
    formData.append("file", file);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        setErrors({});
        console.log(book);
        book.image_URL = "default_cover.jpg";
        if (file) {
          try {
            const response = await fetch("http://localhost:3001/upload", {
              method: "POST",
              body: formData,
            });

            if (response.ok) {
              const data = await response.json();
              console.log(data);
              book.image_URL = data.filename;
            } else {
              const errorData = await response.json();
              console.log(errorData);
            }
          } catch (err) {
            console.log(err);
          }
        }
        const newBook = await createNewData(booksApiUrl, book);
        setShowAlert(true);
        setBook({});
        handleClose();
        setPreview(null);
        setFile(null);
      } catch (error) {
        console.error("Failed to create book:", error);
      }
    }
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Check if a file was selected
    if (!file) {
      setFile(null);
      setPreview(null);
      return;
    }

    setFile(file);

    const reader = new FileReader();
    const url = URL.createObjectURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        backdrop="static"
        className="custom-offcanvas"
      >
        <Offcanvas.Header closeButton className="divheader">
          <Offcanvas.Title>Create New Book</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Row className="mb-4">
              <Form.Group as={Col} controlId="formGridTitle">
                <Form.Label>
                  <span className="required">*</span> Book Title:
                </Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setBook({ ...book, title: e.target.value })}
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPrice">
                <Form.Label>
                  <span className="required">*</span> Price:
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text>₹</InputGroup.Text>
                  <Form.Control
                    type="number"
                    onChange={(e) =>
                      setBook({ ...book, price: e.target.value })
                    }
                    isInvalid={!!errors.price}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.price}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col} controlId="formGridLanguage">
                <Form.Label>
                  <span className="required">*</span> Language:
                </Form.Label>

                <Form.Select
                  // onChange={(e) =>
                  //   setBook({ ...book, language_id: e.target.value })
                  // }
                  onChange={handleLanguageChange}
                  isInvalid={!!errors.language_id}
                  value={book.language_id}
                >
                  <option>Choose...</option>
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
                <Form.Control.Feedback type="invalid">
                  {errors.language_id}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridGenre">
                <Form.Label>
                  <span className="required">*</span> Genre:
                </Form.Label>
                <Form.Select
                  // onChange={(e) =>
                  //   setBook({ ...book, genre_id: e.target.value })
                  // }
                  onChange={handleGenreChange}
                  isInvalid={!!errors.genre_id}
                >
                  <option>Choose...</option>
                  {genres.length > 0 &&
                    genres.map((genre) => (
                      <option key={genre.genre_id} value={genre.genre_id}>
                        {genre.genre_name}
                      </option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.genre_id}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col} controlId="formGridAuthor">
                <Form.Label>
                  <span className="required">*</span> Author:
                </Form.Label>
                <Form.Select
                  onChange={(e) =>
                    setBook({ ...book, author_id: e.target.value })
                  }
                  isInvalid={!!errors.author_id}
                >
                  <option>Choose...</option>
                  {authors.length > 0 &&
                    authors.map((author) => (
                      <option key={author.author_id} value={author.author_id}>
                        {author.display_name}
                      </option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.author_id}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPublishDate">
                <Form.Label>
                  <span className="required">*</span> Publication Date:
                </Form.Label>
                <Form.Control
                  type="date"
                  max={maxDate}
                  onChange={(e) =>
                    setBook({ ...book, publication_date: e.target.value })
                  }
                  isInvalid={!!errors.publication_date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.publication_date}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEdition">
                <Form.Label>Edition:</Form.Label>

                <Form.Select
                  onChange={(e) =>
                    setBook({ ...book, edition: e.target.value })
                  }
                >
                  <option>Choose...</option>
                  {editions.map((edition, index) => (
                    <option key={index} eventKey={edition}>
                      {edition}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridStockQuantity">
                <Form.Label>
                  <span className="required">*</span>Stock Quantity:
                </Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) =>
                    setBook({ ...book, stock_quantity: e.target.value })
                  }
                  isInvalid={!!errors.stock_quantity}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.stock_quantity}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col} controlId="formGridSection">
                <Form.Label>
                  <span className="required">*</span> Storage Section:
                </Form.Label>
                <Form.Control
                  type="text"
                  value={book.storage_section}
                  onChange={(e) =>
                    setBook({ ...book, storage_section: e.target.value })
                  }
                  isInvalid={!!errors.storage_section}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.storage_section}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridShelf">
                <Form.Label>Storage Shelf:</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) =>
                    setBook({ ...book, storage_shelf: e.target.value })
                  }
                  isInvalid={!!errors.storage_shelf}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.storage_shelf}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-4" rowSpan="2">
              <Form.Group as={Col}>
                <Form.Label style={{ marginRight: "5px" }}>
                  <span className="required">*</span>Offer Available:
                </Form.Label>
                <input
                  type="radio"
                  id="option1"
                  value="true"
                  checked={offerAvailable === true}
                  onChange={() => handleRadioChange(true)}
                />
                <label htmlFor="option1" style={{ marginRight: "5px" }}>
                  Yes
                </label>
                {"    "}
                <input
                  type="radio"
                  id="option2"
                  value="false"
                  checked={offerAvailable === false}
                  onChange={() => handleRadioChange(false)}
                />
                <label htmlFor="option2">No</label>
              </Form.Group>
              <Form.Group as={Col} rowSpan="2"></Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formFile">
                <Form.Label>Upload Book Cover</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>
              <Form.Group as={Col} controlId="formFileimage">
                {preview && (
                  <img src={preview} alt="Preview" className="img-thumbnail" />
                )}
              </Form.Group>
            </Row>
            <Button
              variant="custom-orange btnorange"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
      <CustomAlert
        showAlert={showAlert}
        handleCloseAlert={handleCloseAlert}
        name={"Book"}
        action={"Created"}
      />
    </>
  );
}
