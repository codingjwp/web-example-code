import { useDispatch } from 'react-redux';
import classes from './CartItem.module.css';
import { cartAction } from '../../store/cartSlice';

const CartItem = (props) => {
  const { id, title, quantity, total, price } = props.item;
  const dispatch = useDispatch();

  const handelCartAddItem = () => {
    dispatch(cartAction.addItemToCart({
      id, title, price
    }))
  }
  const handelCartRemoveItem = () => {
    dispatch(cartAction.removeItemToCart(id))
  }


  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={handelCartRemoveItem}>-</button>
          <button onClick={handelCartAddItem}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
