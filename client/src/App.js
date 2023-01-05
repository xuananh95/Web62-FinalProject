import { Route, Routes } from "react-router-dom";
import "./App.css";

import Footer from "./layouts/Footer/Footer";
import Header from "./layouts/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

function App() {
    return (
        <div className="App">
            <Header />
            <div style={{ height: "80vh" }}></div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/sign-in" element={<SignInPage />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
