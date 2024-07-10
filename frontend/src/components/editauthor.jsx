import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState, useEffect } from "react";
import { updateData } from "../services/service";
import { checkAuthorNameForEdit } from "../services/authorservice";
import CustomAlert from "./customalert";

export default function EditAuthor({
  show,
  handleClose,
  author,
  setAuthor,
  errors,
  setErrors,
}) {
  const [authorEdit, setAuthorEdit] = useState({
    name: "",
    display_name: "",
    biography: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const authorsApiUrl = "http://localhost:3001/authors";
  useEffect(() => {
    setAuthorEdit(author);
    setErrors({});
  }, [author]);

  async function validateAuthor() {
    const errors = {};
    if (!authorEdit.name) {
      errors.name = "Name is Required";
    }
    if (!authorEdit.display_name) {
      errors.display_name = "Display Name is Required";
    } else {
      const response = await checkAuthorNameForEdit(
        authorEdit.author_id,
        authorEdit.display_name.trim()
      );
      console.log(response);
      console.log("authorname available", response.isExists);
      if (response.isExists) {
        errors.display_name = "Author Display Name already exists";
      }
    }

    return errors;
  }
  function handleCloseAlert() {
    setShowAlert(false);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = await validateAuthor();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        setErrors({});
        const newAuthor = await updateData(
          authorsApiUrl,
          authorEdit.author_id,
          authorEdit
        );
        console.log(newAuthor);
        console.log("Author updated successfully:", newAuthor);
        handleClose();
        setShowAlert(true);
        setAuthor({});
      } catch (error) {
        console.error("Failed to update author:", error);
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
          <Offcanvas.Title>Update Author Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form className="formpadding ms-2">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>
                <span className="required">*</span>Author Name:
              </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  setAuthorEdit({ ...authorEdit, name: e.target.value })
                }
                value={authorEdit.name}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDisplayName">
              <Form.Label>
                <span className="required">*</span>Display Name:
              </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  setAuthorEdit({ ...authorEdit, display_name: e.target.value })
                }
                value={authorEdit.display_name}
                isInvalid={!!errors.display_name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.display_name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicBiography">
              <Form.Label>Biography:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) =>
                  setAuthorEdit({ ...authorEdit, biography: e.target.value })
                }
                value={authorEdit.biography}
              />
            </Form.Group>

            <Button
              variant="custom-orange btnorange"
              type="submit"
              onClick={handleSubmit}
              style={{ marginRight: "10px" }}
            >
              Update
            </Button>

            <Button
              variant="custom-orange btnorange"
              type="button"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
      <CustomAlert
        showAlert={showAlert}
        handleCloseAlert={handleCloseAlert}
        name={"Author"}
        action={"Updated"}
      />
    </>
  );
}
