import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { cartActions } from '../../Store/cartReducer';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items)
  const totalQuantity = cartItems.reduce((curr, item) => {
    return curr + item.quantity;
  }, 0)

  const cartOpenHandler = () => {
    dispatch(cartActions.cartOpenHandler());
  }
  return (
    <button onClick={cartOpenHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
