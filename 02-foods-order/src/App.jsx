import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import FoodList from "./components/FoodList";
import Header from "./components/Header";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from './store/UserProgressContext'

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <FoodList />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
