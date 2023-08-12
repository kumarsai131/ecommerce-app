import axios from "axios";
import { urls } from "../../utils/urls";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  function getCart() {
    axios
      .post(urls.getCartProducts, {
        userId: sessionStorage.getItem("user"),
      })
      .then((res) => {
        if (res.data.success) {
          setProducts(res.data.products);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    let sum = 0;
    products.forEach((e) => {
      sum += e.price;
    });
    setTotal(products.length);
    setTotalPrice(sum);
  }, [products]);

  return (
    <>
      <div className="row p-2 pt-4">
        <div className="col-md-7">
          {products.map((e) => {
            return (
              <div className="col-md-11 mb-3 p-3 cartProduct">
                <div>{e.courseName}</div>
                <div>Author - {e.author}</div>
                <div className="d-flex">
                  Price -{"  "}
                  <span className="fw-bold currency">
                    <span className="material-symbols-outlined">
                      currency_rupee
                    </span>
                    {e.price}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-md-4 mb-3 p-3 priceDetails">
          <div className="fw-bold">PRICE DETAILS</div>
          <div className="d-flex justify-content-between">
            <span>Price ({total} Items)</span>
            <span className="fw-bold currency">
              <span className="material-symbols-outlined">currency_rupee</span>
              {totalPrice}
            </span>
          </div>
          <div className="text-center pt-4">
            <Button variant="primary" className="form-control">
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
