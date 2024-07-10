import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { createNewData } from "../services/service";
import { checkGenreName } from "../services/genreservice";
import CustomAlert from "./customalert";

export default function NewGenre({ show, handleClose, errors, setErrors }) {
  const [genre, setGenre] = useState({
    genre_name: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const genresApiUrl = "http://localhost:3001/genres";

  async function validateGenre() {
    const errors = {};

    if (!genre.genre_name) {
      errors.genre_name = " Genre Name is Required";
    } else {
      const response = await checkGenreName(genre.genre_name.trim());
      console.log("genre name available", response.isExists);
      if (response.isExists) {
        errors.genre_name = "Genre  Name already exists";
      }
    }

    return errors;
  }

  function handleCloseAlert() {
    setShowAlert(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = await validateGenre();
    console.log(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        setErrors({});
        const newGenre = await createNewData(genresApiUrl, genre);
        setShowAlert(true);
        setGenre({});
        handleClose();
      } catch (error) {
        console.error("Failed to create genre:", error);
      }
    }
  }
  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        backdrop="static"
      >
        <Offcanvas.Header closeButton className="divheader">
          <Offcanvas.Title>Create New Genre</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form className="formpadding ms-2">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>
                <span className="required">*</span>Genre Name:
              </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  setGenre({ ...genre, genre_name: e.target.value })
                }
                isInvalid={!!errors.genre_name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.genre_name}
              </Form.Control.Feedback>
            </Form.Group>

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
        name={"Genre"}
        action={"Created"}
      />
    </>
  );
}
