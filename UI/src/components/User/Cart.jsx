import axios from "axios";
import { urls } from "../../utils/urls";
import { useEffect, useState } from "react";

export default function Cart() {
  const [products, setProducts] = useState([]);
  function getCart() {
    axios
      .post(urls.getCartProducts, {
        userId: sessionStorage.getItem("user"),
      })
      .then((res) => {
        if (res.data.success) {
          setProducts(res.data.cart);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getCart();
  }, []);
  return (
    <>
      <ul>
        {products.map((e) => {
          return (
            <li key={e._id}>
              {e.courseName} - {e.price}
            </li>
          );
        })}
      </ul>
    </>
  );
}
