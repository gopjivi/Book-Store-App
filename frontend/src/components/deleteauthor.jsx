import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { deleteData } from "../services/service";
import CustomAlert from "./customalert";
import { useState } from "react";

export default function DeleteAuthor({ show, handleClose, author }) {
  const [showAlert, setShowAlert] = useState(false);
  const authorsApiUrl = "http://localhost:3001/authors";

  function handleCloseAlert() {
    setShowAlert(false);
  }

  async function deleteAuthor(id) {
    if (!author || !id) {
      console.error("Author ID is not defined");
      return;
    }

    try {
      const response = await deleteData(authorsApiUrl, id);
      // Assuming deleteAuthor returns the fetch response
      console.log("response", response);
      if (response !== 204) {
        throw new Error("Network response was not ok");
      } else {
        console.log("Author deleted successfully:", id);
        setShowAlert(true);
        handleClose();
      }
    } catch (error) {
      console.error("Failed to delete author:", error);
    }
  }
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        animation={true}
      >
        <Modal.Header className="modal-header divheader" closeButton>
          <Modal.Title>Delete Author</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row" style={{ marginBottom: 15 }}>
              <p>
                Are you sure you want to delete this{" "}
                <b className="highlight">{author.name} </b> author?
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            variant="custom-orange"
            className="btn btnorange"
            data-bs-dismiss="modal"
            onClick={() => deleteAuthor(author.author_id)}
          >
            Yes
          </Button>
          <Button
            type="button"
            variant="custom-orange"
            className="btn btnorange"
            data-bs-dismiss="modal"
            onClick={() => handleClose()}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <CustomAlert
        showAlert={showAlert}
        handleCloseAlert={handleCloseAlert}
        name={"Author"}
        action={"Deleted"}
      />
    </>
  );
}
