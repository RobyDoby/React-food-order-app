import { useContext } from 'react';

import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';

const MealItem = (props) => {
   const cartCtx = useContext(CartContext);

   const addItemToCartHandler = (amount) => {
      cartCtx.addItem({
         id: props.id,
         name: props.name,
         amount: amount,
         price: props.price,
      });
   };
   return (
      <li id={props.id} className={classes.meal}>
         <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{`$${props.price.toFixed(2)}`}</div>
         </div>
         <div>
            <MealItemForm id={props.id} onAddToCart={addItemToCartHandler} />
         </div>
      </li>
   );
};

export default MealItem;
