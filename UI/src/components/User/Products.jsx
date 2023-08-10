import ProductList from "../ProductList";

export default function Products() {
  function addToCart(data) {
    console.log(data);
  }
  return (
    <div className="row px-3 py-3">
      <ProductList role="User" addToCart={addToCart} />
    </div>
  );
}
