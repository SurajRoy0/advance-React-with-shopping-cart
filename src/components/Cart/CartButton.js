import { useDispatch } from 'react-redux';
import classes from './CartButton.module.css';
import { cartActions } from '../../Store/cartReducer';

const CartButton = (props) => {
  const dispatch = useDispatch();

  const cartOpenHandler = () => {
    dispatch(cartActions.cartOpenHandler());
  }
  return (
    <button onClick={cartOpenHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
