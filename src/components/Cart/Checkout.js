import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
   const [formInputValidity, setFormInputValidity] = useState({
      name: true,
      street: true,
      postalCode: true,
      city: true,
   });

   const nameInputRef = useRef();
   const streetInputRef = useRef();
   const postalInputRef = useRef();
   const cityInputRef = useRef();

   const confirmHandler = (event) => {
      event.preventDefault();

      const enteredName = nameInputRef.current.value;
      const enteredStreet = streetInputRef.current.value;
      const enteredPostalCode = postalInputRef.current.value;
      const enteredCity = cityInputRef.current.value;

      const enteredNameIsValid = !isEmpty(enteredName);
      const enteredStreetIsValid = !isEmpty(enteredStreet);
      const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
      const enteredCityIsValid = !isEmpty(enteredCity);

      setFormInputValidity({
         name: enteredNameIsValid,
         street: enteredStreetIsValid,
         postalCode: enteredPostalCodeIsValid,
         city: enteredCityIsValid,
      });

      const formIsValid =
         enteredNameIsValid &&
         enteredStreetIsValid &&
         enteredPostalCodeIsValid &&
         enteredCityIsValid;

      if (!formIsValid) {
         return;
      }
      props.onConfirm({
         name: enteredName,
         street: enteredStreet,
         postalCode: enteredPostalCode,
         city: enteredCity,
      });
   };

   return (
      <form className={classes.form} onSubmit={confirmHandler}>
         <div className={`${classes.control} ${formInputValidity.name ? '' : classes.invalid}`}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' ref={nameInputRef} />
            {!formInputValidity.name && <p>Please Enter a valid name</p>}
         </div>
         <div className={`${classes.control} ${formInputValidity.street ? '' : classes.invalid}`}>
            <label htmlFor='street'>Street</label>
            <input type='text' id='street' ref={streetInputRef} />
            {!formInputValidity.street && <p>Please Enter a valid street</p>}
         </div>
         <div
            className={`${classes.control} ${formInputValidity.postalCode ? '' : classes.invalid}`}
         >
            <label htmlFor='postal'>Postal Code</label>
            <input type='text' id='postal' ref={postalInputRef} />
            {!formInputValidity.postalCode && (
               <p>Please Enter a valid postal code (5 characters long)</p>
            )}
         </div>
         <div className={`${classes.control} ${formInputValidity.city ? '' : classes.invalid}`}>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' ref={cityInputRef} />
            {!formInputValidity.city && <p>Please Enter a valid city</p>}
         </div>
         <div className={classes.actions}>
            <button type='button' onClick={props.onCancel}>
               Cancel
            </button>
            <button className={classes.submit}>Confirm</button>
         </div>
      </form>
   );
};

export default Checkout;
