import { createContext, useState } from "react";

export const StateContext = createContext();

const GlobalState = ({ children }) => {
    const initalValue = {
        username: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: "",
        isCheckRules: false,
    };

    const initalFormLogin = { email: "", password: "" };

    const [isModalSignIn, setIsModalSignIn] = useState(false);
    const [isModalSignUp, setIsModalSignUp] = useState(false);
    const [inputValue, setInputValue] = useState(initalValue);
    const [formLogin, setFormLogin] = useState(initalFormLogin);
    const [isLogined, setIsLogined] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState({
        name: "",
        slug: "",
        price: "",
        qty: "",
        discription: "",
        image: "",
    });
    const [uploadData, setUploadData] = useState({});

    const value = {
        uploadData,
        setUploadData,
        products,
        setProducts,
        isModalSignIn,
        setIsModalSignIn,
        isModalSignUp,
        setIsModalSignUp,
        inputValue,
        setInputValue,
        initalValue,
        formLogin,
        setFormLogin,
        initalFormLogin,
        isLogined,
        setIsLogined,
        isLoading,
        setIsLoading,
    };

    return (
        <StateContext.Provider value={value}>{children}</StateContext.Provider>
    );
};

export default GlobalState;
