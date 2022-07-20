import Button from '../../UI/Button';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
   return (
      <form className={classes.form}>
         <Input
            label="Amount"
            input={{
               type: 'number',
               id: `amount-${props.id}`,
               min: '1',
               max: '5',
               step: '1',
               defaultValue: '1',
            }}
         />
         <Button>+ Add</Button>
      </form>
   );
};
export default MealItemForm;
