import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Card from "./components/Card/Card";
import { StateContext } from "./contexts/GlobalState";
import Footer from "./layouts/Footer/Footer";
import Header from "./layouts/Header/Header";
import DasboardPage from "./pages/DasboardPage/Dasboard";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

function App() {
    const { isModalOpen } = useContext(StateContext);
    return (
        <div className="App">
            {!isModalOpen ? <Header /> : <></>}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product" element={<ProductPage />}>
                    <Route path="*" element={<Card />} />
                </Route>
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/sign-in" element={<SignInPage />} />
                <Route path="/dasboard/admin" element={<DasboardPage />} />
            </Routes>
            {!isModalOpen ? <Footer /> : <></>}
        </div>
    );
}

export default App;
