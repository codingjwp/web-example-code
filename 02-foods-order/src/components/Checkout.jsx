import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { fomatterDallarToWon } from "../utils/fommeter";
import Input from "./Input";
import Button from "./Button";
import { useFetch } from "../hooks/useFetch";
import Error from "./Error";

const requestPostConfig = {
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
  }
}

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const totalPrice = cartCtx.items?.reduce((total, curr) => total + (curr.price * curr.quantity), 0) || 0;
  const { isFetching, error, data, sendRequest, clearData } = useFetch('http://localhost:3000/orders', requestPostConfig);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const customFd = Object.fromEntries(formData.entries());

    sendRequest(JSON.stringify({
      order: {
        items: cartCtx.items,
        customer: customFd
      }
    }))
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  let action = (<>
    <Button cssType='text' type="button" onClick={userProgressCtx.hideCheckout} >Close</Button>
    <Button cssType='fill' >Submit Order</Button>
  </>);
  if (isFetching) {
    action = <span>Sending order data...</span>;
  }

  if (data && !error.hasError) {
    return (
      <Modal open={userProgressCtx.progress === 'checkout'} onClose={userProgressCtx.progress === 'checkout' ? userProgressCtx.hideCheckout : null}>
        <h2>Sucess!</h2>
        <p>Your order was submitted successfully.</p>
        <p>We will get back to you with more details via email within the next few minutes.</p>
        <p className="flex justify-end gap-4">
          <Button cssType="fill" onClick={handleFinish}>Close</Button>
        </p>
      </Modal>
    )
  }

  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={userProgressCtx.progress === 'checkout' ? userProgressCtx.hideCheckout : null}>
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold my-4">Checkout</h2>
        <p>Total Amount: {fomatterDallarToWon(totalPrice)} </p>
      </form>
      <Input label="Full Name" type="text" id="name" />
      <Input label="E-mail Address" type="email" id="email" />
      <Input label="Street" type="text" id="street" />
      <div className="flex justify-start gap-4">
        <Input label="Postal Code" type="text" id="postal-code" />
        <Input label="City" type="text" id="city" />
      </div>
      {error.hasError && <Error title="Failed to submit order" message={error.message}/>}
      <p className="flex justify-end gap-4">
        {action}
      </p>
    </Modal>
  )
}