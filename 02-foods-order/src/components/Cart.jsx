import Modal from './Modal';
import Button from './Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import CartList from './CartList'
import { fomatterDallarToWon } from '../utils/fommeter';
import { useContext } from 'react';

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const totalPrice = cartCtx.items?.reduce((total, curr) => total + (curr.price * curr.quantity), 0) || 0;

  return (
    <Modal open={userProgressCtx.progress === 'cart'} onClose={userProgressCtx.progress === 'cart' ? userProgressCtx.hideCart : null} >
      <h2 className='font-bold text-xl my-4 mx-0'>Your Cart</h2>
      <ul className='list-none my-2 mx-0 p-0'>
        {cartCtx.items.map((cart) =>
          <CartList key={cart.id}
            cartId={cart.id} name={cart.name}
            price={fomatterDallarToWon(cart.price)}
            count={cart.quantity}
            addItem={() => cartCtx.addItem(cart)}
            removeItem={() => cartCtx.removeItem(cart.id)} />)}
      </ul>
      <p className='flex justify-end my-8 text-lg font-bold text-[#46443c]'>
        {fomatterDallarToWon(totalPrice)}
      </p>
      <p className='flex justify-end gap-4'>
        <Button type="button" cssType="text" onClick={userProgressCtx.hideCart}>닫기</Button>
        {cartCtx.items.length > 0 &&
          <Button type="button" cssType="fill" onClick={userProgressCtx.showCheckout}>구매</Button>
        }
      </p>
    </Modal>
  )
}