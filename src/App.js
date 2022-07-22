import { useState } from 'react';

import CartProvider from './store/CartProvider';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';

function App() {
   const [isCartShown, setIsCartShown] = useState(false);

   const showCartHandler = () => {
      setIsCartShown(true);
   };

   const hideCardHandler = () => {
      setIsCartShown(false);
   };
   return (
      <CartProvider>
         {isCartShown && <Cart onClose={hideCardHandler} />}
         <Header onShowCart={showCartHandler} />
         <main>
            <Meals />
         </main>
      </CartProvider>
   );
}

export default App;
