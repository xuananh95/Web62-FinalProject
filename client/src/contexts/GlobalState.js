import { createContext, useState } from "react";
import LocalStorage from "./LocalStorage";

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
    const [listsProduct, setListsProduct] = useState([]);
    const [products, setProducts] = useState({
        name: "",
        slug: "",
        price: "",
        quantity: "",
        description: "",
        image: "",
    });

    const [uploadData, setUploadData] = useState();
    const [isUpdate, setIsUpdate] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const cartId = LocalStorage.getItem("users")?.other?._id;
    const [isReload, setIsReload] = useState([]);

    const value = {
        isReload,
        setIsReload,
        cartId,
        currentPage,
        setCurrentPage,
        totalPage,
        setTotalPage,
        isUpdate,
        setIsUpdate,
        listsProduct,
        setListsProduct,
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
