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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState(initalValue);
    const [formLogin, setFormLogin] = useState(initalFormLogin);

    const value = {
        isModalOpen,
        setIsModalOpen,
        inputValue,
        setInputValue,
        initalValue,
        formLogin,
        setFormLogin,
        initalFormLogin,
    };

    return (
        <StateContext.Provider value={value}>{children}</StateContext.Provider>
    );
};

export default GlobalState;
