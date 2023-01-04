import { Route, Routes } from "react-router-dom";
import "./App.css";

import Footer from "./layouts/Footer/Footer";
import Header from "./layouts/Header/Header";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

function App() {
    return (
        <div className="App">
            <Header />
            <div style={{ height: "80vh" }}></div>
            <Routes>
                <Route path="/sign-up" element={<SignUpPage />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
