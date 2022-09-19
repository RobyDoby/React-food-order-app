import { useContext, useState } from 'react';

import Button from '../UI/Button';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
   const [isCheckout, setIsCheckout] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [didSubmit, setDidSubmit] = useState(false);
   const cartCtx = useContext(CartContext);

   const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
   const hasItems = cartCtx.items.length > 0;

   const cartItemRemoveHandler = (id) => {
      cartCtx.removeItem(id);
   };

   const cartItemAddmHandler = (item) => {
      cartCtx.addItem({ ...item, amount: 1 });
   };
   const orderHandler = () => {
      setIsCheckout(true);
   };

   const submitOrderHandler = async (userData) => {
      setIsSubmitting(true);
      await fetch(
         'https://robyd-react-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
         {
            method: 'POST',
            body: JSON.stringify({
               user: userData,
               orderedItems: cartCtx.items,
            }),
         }
      );
      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart();
   };

   const cartItems = (
      <ul className={classes['cart-items']}>
         {cartCtx.items.map((item) => (
            <CartItem
               key={item.id}
               name={item.name}
               amount={item.amount}
               price={item.price}
               onAdd={cartItemAddmHandler.bind(null, item)}
               onRemove={cartItemRemoveHandler.bind(null, item.id)}
            />
         ))}
      </ul>
   );

   const modalActions = (
      <div className={classes.actions}>
         <Button className={classes['button--alt']} onClick={props.onClose}>
            Close
         </Button>
         {hasItems && (
            <Button className={classes.button} onClick={orderHandler}>
               Order
            </Button>
         )}
      </div>
   );

   const cartModalContent = (
      <>
         {cartItems}
         <div className={classes.total}>
            <span>Total Amount:</span>
            <span>{totalAmount}</span>
         </div>
         {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
         {!isCheckout && modalActions}
      </>
   );

   const isSubmittingModalContent = <p>Sending order data...</p>;
   const didSubmitModalContent = (
      <>
         <p>Successfully sent the order!</p>
         <div className={classes.actions}>
            <Button className={classes.button} onClick={props.onClose}>
               Close
            </Button>
         </div>
      </>
   );

   return (
      <Modal onClick={props.onClose}>
         {!isSubmitting && !didSubmit && cartModalContent}
         {isSubmitting && isSubmittingModalContent}
         {!isSubmitting && didSubmit && didSubmitModalContent}
      </Modal>
   );
};

export default Cart;
