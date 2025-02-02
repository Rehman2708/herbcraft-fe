import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Cart from "./pages/cart";
import ProductDetail from "./pages/productDetail";
import "./styles/global.scss";
import { ROUTES } from "./enums/routes";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AddProduct from "./pages/addProduct";
import Checkout from "./pages/checkout";
import MyOrders from "./pages/myOrders";
import OrderDetails from "./pages/orderDetails";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.Login} element={<Login />} />
          <Route path={ROUTES.Register} element={<Register />} />
          <Route path={ROUTES.Home} element={<Home />} />
          <Route path={ROUTES.Cart} element={<Cart />} />
          <Route path={ROUTES.ProductDetail} element={<ProductDetail />} />
          <Route path={ROUTES.AddProduct} element={<AddProduct />} />
          <Route path={ROUTES.Checkout} element={<Checkout />} />
          <Route path={ROUTES.MyOrders} element={<MyOrders />} />
          <Route path={ROUTES.OrderDetails} element={<OrderDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
