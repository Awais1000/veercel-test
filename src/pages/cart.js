import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { showCart } from "../store/cartDisplay";

function Cart() {
  const cartItems = useSelector((state) => state.cart.value);
  const total = useSelector((state) => state.total.value)
  const dispatch = useDispatch();
  return <>
    <div className=" cart-container" >

      <div>
        <i onClick={() => {
          dispatch((showCart(false)));
        }} className="size icon bi bi-x"></i>
      </div>
      <div className="cart-Box">

        {
          cartItems.map((cartItem, index) => {
            return <div className="cart" key={index}>
              <img src={cartItem.image_path} className="cart-images" alt="" />
              <div className="cart-detail">
                <h6>Title : {cartItem.title}</h6>
                <h6>Author : {cartItem.author}</h6>
              </div>
            </div>
          })
        }
        <div className="totalContainer">total : <span className="total">{total}$</span></div>
      </div>
    </div>
  </>
}

export default Cart;