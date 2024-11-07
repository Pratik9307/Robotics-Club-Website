import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";
import './index.css'; // Link your CSS file here

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <>
      <h1 className="cart-title">Cart</h1>
      <p className="cart-items">{totalItems} Courses in Cart</p>
      {total > 0 ? (
        <div className="cart-content">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="cart-empty">Your cart is empty</p>
      )}
    </>
  );
}
