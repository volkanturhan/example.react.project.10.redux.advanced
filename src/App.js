import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { uiActions } from "./store/ui-slice";
import { fetchCartData, sendCartData } from "./store/cart-actions";

let isInitial = true;
function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => {
    return state.ui.cartIsVisible;
  });
  const cart = useSelector((state) => {
    return state.cart;
  });

  const notification = useSelector((state) => {
    return state.ui.notification;
  });
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if(cart.changed){
      dispatch(sendCartData(cart));
    }
    //All Codes transferred to cart-slice
    // const sendCartData = async () => {
    //   // dispatch(
    //   //   uiActions.showNotification({
    //   //     status: "pending",
    //   //     title: "Sending...",
    //   //     message: "Sending cart data!",
    //   //   })
    //   // );
    //   // const response = await fetch(
    //   //   "https://food-order-app-b90b8-default-rtdb.firebaseio.com/cart.json",
    //   //   {
    //   //     method: "PUT",
    //   //     body: JSON.stringify(cart),
    //   //   }
    //   // );
    //   // if (!response.ok) {
    //   //   throw new Error("Sending cart data failed.");
    //   //   // dispatch(
    //   //   //   uiActions.showNotification({
    //   //   //     status: "error",
    //   //   //     title: "Error!",
    //   //   //     message: "Sending cart data failed!",
    //   //   //   })
    //   //   // );
    //   // }
    //   // // const responseData = await response.json();
    //   // dispatch(
    //   //   uiActions.showNotification({
    //   //     status: "success",
    //   //     title: "Success!",
    //   //     message: "Sending cart data successfully!",
    //   //   })
    //   // );
    // };

    // sendCartData().catch((error) => {
    //   // dispatch(
    //   //   uiActions.showNotification({
    //   //     status: "error",
    //   //     title: "Error!",
    //   //     message: error.message,
    //   //   })
    //   // );
    // });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
