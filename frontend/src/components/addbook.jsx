import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import CustomAlert from "./customalert";

export default function AddBook() {
  const [book, setBook] = useState({
    name: "",
    display_name: "",
    biography: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const authorsApiUrl = "http://localhost:3001/books";
  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        backdrop="static"
      >
        <Offcanvas.Header closeButton className="divheader">
          <Offcanvas.Title>Create New Book</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form className="formpadding ms-2">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>
                <span className="required">*</span>Author Name:
              </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setAuthor({ ...author, name: e.target.value })}
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
                  setAuthor({ ...author, display_name: e.target.value })
                }
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
                  setAuthor({ ...author, biography: e.target.value })
                }
              />
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
        name={"Book"}
        action={"Created"}
      />
    </>
  );
}
