import Button from '../UI/Button';
import classes from './MealItem.module.css';

const MealItem = (props) => {
   return (
      <li id={props.id} className={classes.meal}>
         <div>
            <h3>{props.name}</h3>
            <p className={classes.description}>{props.description}</p>
            <p className={classes.price}>{`$${props.price}`}</p>
         </div>
         <form className={classes.form}>
            <div className={classes.input}>
               <label htmlFor={`${props.id}-${props.name}`}>Amount</label>
               <input
                  type="number"
                  id={`${props.id}-${props.name}`}
                  placeholder="0"
                  min="0"
                  max="100"
               />
            </div>
            <Button>+Add</Button>
         </form>
      </li>
   );
};

export default MealItem;
