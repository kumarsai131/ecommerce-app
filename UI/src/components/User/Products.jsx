import axios from "axios";
import ProductList from "../ProductList";
import { urls } from "../../utils/urls";

export default function Products() {
  function addToCart(data) {
    axios
      .post(urls.addToCart, {
        userId: sessionStorage.getItem("user"),
        productId: data._id,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="row px-3 py-3">
      <ProductList role="User" addToCart={addToCart} />
    </div>
  );
}
