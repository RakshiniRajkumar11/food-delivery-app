import "./App.css";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Navbar from "./components/Navbar";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Signup from "./screens/Signup.js";
import { CartProvider } from "./components/ContextReducer.js";
import Cart from "./screens/Cart.js";
import Checkout from './screens/Checkout';
import Payment from "./components/Payment";
import MyOrders from "./screens/MyOrders.js";
import Profile from './screens/Profile';


function App() {
  return (
    <CartProvider>
      <Router>
        <div className="bg-dark">
        <Navbar /> {/* Include Navbar globally */}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/CreateUser" element={<Signup />} />
            <Route exact path="/cart" element={<Cart />}/>
            <Route exact path="/checkout" element={<Checkout />} />
            <Route exact path="/payment" element={<Payment />} />
            <Route exact path="/myorders" element={<MyOrders />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
