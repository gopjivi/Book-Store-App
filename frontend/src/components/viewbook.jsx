import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function ViewBook({ show, handleClose, book }) {
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
          <Offcanvas.Title>View Book Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="container-fluid">
            <div className="row view-book">
              <div className="col">Book Title:</div>
              <div className="col">{book.title}</div>
              <div className="col"></div>
            </div>
            <div className="row view-book">
              <div className="col">Book Price:</div>
              <div className="col">{book.price}</div>
              <div className="col"></div>
            </div>
            <div className="row view-book">
              <div className="col">Language:</div>
              <div className="col">
                {book.Language ? book.Language.language_name : "Unknown"}
              </div>
              <div className="col"></div>
            </div>
            <div className="row view-book">
              <div className="col">Book Genre:</div>
              <div className="col">
                {book.Genre ? book.Genre.genre_name : "Unknown"}
              </div>
              <div className="col"></div>
            </div>
            <div className="row view-book">
              <div className="col">Author:</div>
              <div className="col">
                {book.Author ? book.Author.display_name : "Unknown"}
              </div>
              <div className="col"></div>
            </div>
            <div className="row view-book">
              <div className="col">Publication Date:</div>
              <div className="col">{book.publication_date}</div>
              <div className="col"></div>
            </div>
            <div className="row view-book">
              <div className="col">Edition:</div>
              <div className="col">{book.edition}</div>
              <div className="col"></div>
            </div>
            <div className="row view-book">
              <div className="col">Stock Quantity::</div>
              <div className="col">{book.stock_quantity}</div>
              <div className="col"></div>
            </div>
            <div className="row view-book">
              <div className="col">Storage Section:</div>
              <div className="col">{book.storage_section}</div>
              <div className="col"></div>
            </div>
            <div className="row view-book">
              <div className="col">Storage Shelf:</div>
              <div className="col">{book.storage_shelf}</div>
              <div className="col"></div>
            </div>
            <div className="row view-book">
              <div className="col">Is Offer Available:</div>
              <div className="col">
                {book.is_offer_available ? "Yes" : "No"}
              </div>
              <div className="col"></div>
            </div>

            <Button
              variant="custom-orange btnorange"
              type="button"
              onClick={handleClose}
            >
              Back
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
