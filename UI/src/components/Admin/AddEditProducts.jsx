import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import ErrorBlock from "../ErrorBlock";
import Spinner from "../Spinner";

export default function AddEditProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const limitPerPage = 3;
  const [paginationArray, setPaginationArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  function getProducts() {
    setError(null);
    setLoading(true);
    axios
      .get(
        `http://localhost:8080/getProducts?limitPerPage=${limitPerPage}&currentPage=${currentPage}`
      )
      .then((res) => {
        setTotal(res.data.totalNumberOfProducts);
        setProducts(res.data.products);
        setSkip(res.data.skip);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function updatePublish(id, isPublished) {
    axios
      .patch("http://localhost:8080/updateProduct", {
        id: id,
        isPublished: !isPublished,
      })
      .then((res) => {
        if (res.data.success) {
          getProducts();
        }
      })
      .catch((err) => {
        setError(err);
      });
  }

  useEffect(() => {
    getProducts();
  }, [currentPage]);

  useEffect(() => {
    let paginationArray = [];
    for (let i = 0; i < total / limitPerPage; i++) {
      console.log(i);
      paginationArray.push(i + 1);
    }
    setPaginationArray(paginationArray);
  }, [total]);

  return (
    <>
      <div className="row px-3 ">
        <Spinner loading={loading} />
        {error ? (
          <ErrorBlock
            errorCode={error.errorCode}
            errorMessage={error.errorMessage}
          />
        ) : (
          ""
        )}
        <div className="h4">
          Showing {skip + 1}
          {skip + limitPerPage > total
            ? ""
            : " - " + (skip + limitPerPage)} of {total} products.
        </div>

        {products.map((e) => {
          return (
            <div className="col-md-4 mb-3" key={e._id}>
              <Card className="">
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                  <Card.Title>{e.courseName}</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                    <div>Author - {e.author}</div>
                    <div className="fw-bold currency">
                      {" "}
                      <span className="material-symbols-outlined">
                        currency_rupee
                      </span>
                      {e.price}
                    </div>
                    <div>{e.tags.map((e) => e.toUpperCase() + " ")}</div>
                  </Card.Text>
                  <Button variant="primary" className="form-control mb-2">
                    Update
                  </Button>
                  <Button
                    variant="primary"
                    className="form-control"
                    onClick={() => updatePublish(e._id, e.isPublished)}
                  >
                    {e.isPublished ? "Un-Publish" : "Publish"}
                  </Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}

        <div className="col-md-10">
          {paginationArray.map((e) => {
            return (
              <Button
                onClick={() => setCurrentPage(e)}
                className={`${currentPage == e ? "button-selected" : ""}`}
              >
                {e}
              </Button>
            );
          })}
        </div>
      </div>
    </>
  );
}
