import "./App.css";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import Search from "./pages/search/search.jsx";
import PrivateRoute from "./privateRoute.jsx";
import ItemsPage from "./pages/items/itemsPage.jsx";
import MyCart from "./pages/mycart/myCart.jsx";
import Orders from "./pages/orders/orders.jsx";
import Deliver from "./pages/deliver/deliver.jsx";
import Support from "./pages/support/support.jsx";
import SetToken from "./settoken.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/search"
          element={
            <PrivateRoute>
              <Search />
            </PrivateRoute>
          }
        />
        <Route
          path="/items/:itemID"
          element={
            <PrivateRoute>
              <ItemsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <MyCart />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/deliver"
          element={
            <PrivateRoute>
              <Deliver />
            </PrivateRoute>
          }
        />
        <Route
          path="/support"
          element={
            <PrivateRoute>
              <Support />
            </PrivateRoute>
          }
        />
        <Route path="/settoken" element={<SetToken />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
