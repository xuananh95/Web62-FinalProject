import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import { StateContext } from "./contexts/GlobalState";
import Card from "./components/Card/Card";
import CreateProduct from "./components/CreateProduct/CreateProduct";
import Warehouse from "./components/Warehoouse/Warehouse";
import Footer from "./layouts/Footer/Footer";
import Header from "./layouts/Header/Header";
import DasboardPage from "./pages/DasboardPage/Dasboard";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import CartPage from "./pages/CartPage/CartPage";
import { CaloPage } from "./pages/CaloPage/CaloPage";

function App() {
  const { isModalOpen } = useContext(StateContext);
  return (
    <div className="App">
      {!isModalOpen ? <Header /> : <></>}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calo" element={<CaloPage />} />
        <Route path="/product" element={<ProductPage />}>
          <Route path="*" element={<Card />} />
        </Route>
        <Route path="/users/sign-up" element={<SignUpPage />} />
        <Route path="/users/sign-in" element={<SignInPage />} />
        <Route path="/cart/:id" element={<CartPage />} />
        <Route path="dasboard" element={<DasboardPage />}>
          <Route path="kho-hang" element={<Warehouse />} />
          <Route path="them-san-pham" element={<CreateProduct />} />
        </Route>
      </Routes>
      {!isModalOpen ? <Footer /> : <></>}
    </div>
  );
}

export default App;
