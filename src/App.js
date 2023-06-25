import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect } from 'react';
import { addCartItems, fetchCartItems } from './Store/Api';
import Notification from './components/UI/Notification';

let isInitial = false;

function App() {
  const isCartOpen = useSelector(state => state.cart.isCartOpen);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems())
  }, [])

  useEffect(() => {
    if (isInitial) {
      isInitial = true;
      return;
    }
    dispatch(addCartItems(cart))
  }, [cart.items, dispatch])
  return (
    <>
      {cart.requestStatus &&
        <Notification
          status={cart.requestStatus.status}
          title={cart.requestStatus.action}
          message={cart.requestStatus.message}
        />}
      <Layout>
        {isCartOpen && <Cart />}
        <Products />
      </Layout></>
  );
}

export default App;
