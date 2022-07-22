const Button = (props) => {
   return (
      <button className={props.className} onClick={props.onClick} {...props.button}>
         {props.children}
      </button>
   );
};
export default Button;
