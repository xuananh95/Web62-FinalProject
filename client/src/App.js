import { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";

import CreateProduct from "./components/CreateProduct/CreateProduct";
import Warehouse from "./components/Warehoouse/Warehouse";
import { StateContext } from "./contexts/GlobalState";
import Footer from "./layouts/Footer/Footer";
import Header from "./layouts/Header/Header";
import CaloPage from "./pages/CaloPage/CaloPage";
import CartPage from "./pages/CartPage/CartPage";
import DasboardPage from "./pages/DasboardPage/Dasboard";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

function App() {
    const { isModalSignIn, isModalSignUp } = useContext(StateContext);

    return (
        <div className="App">
            <Header />
            {isModalSignIn && <SignInPage />}
            {isModalSignUp && <SignUpPage />}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/calo" element={<CaloPage />} />
                <Route path="/product" element={<ProductPage />} />
                <Route path="/cart/:id" element={<CartPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="dashboard" element={<DasboardPage />}>
                    <Route path="kho-hang" element={<Warehouse />} />
                    <Route path="them-san-pham" element={<CreateProduct />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
