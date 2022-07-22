import classes from './CartItem.module.css';

const CartItem = (props) => {
   const price = `$${props.price.toFixed(2)}`;

   return (
      <li className={classes['cart-item']}>
         <div className={classes['item-info']}>
            <h2>{props.name}</h2>
            <div className={classes.summary}>
               <span className={classes.price}>{price}</span>
               <span className={classes.amount}>x {props.amount}</span>
            </div>
         </div>
         <div className={classes.actions}>
            <div className={classes['actions-btn-container']}>
               <button onClick={props.onRemove}>−</button>
               <button onClick={props.onAdd}>+</button>
            </div>
            <span className={classes.total}>{`Total for dish: $${(
               props.amount * props.price
            ).toFixed(2)}`}</span>
         </div>
      </li>
   );
};

export default CartItem;
