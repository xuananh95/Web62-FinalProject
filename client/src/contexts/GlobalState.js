import { createContext, useState } from "react";

export const StateContext = createContext();

const GlobalState = ({ children }) => {
    const initalValue = {
        userName: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: "",
        isCheckRules: false,
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState(initalValue);

    const value = {
        isModalOpen,
        setIsModalOpen,
        inputValue,
        setInputValue,
        initalValue,
    };

    return (
        <StateContext.Provider value={value}>{children}</StateContext.Provider>
    );
};

export default GlobalState;
