import axiosInstant from "./axiosInstant";

const productsService = {
    create: (data, token) => {
        return axiosInstant({
            method: "POST",
            url: "/products/add-product",
            headers: {
                Authorization: ` Bearer ${token}`,
            },
            data,
        });
    },
    uploadImage: (data, token) => {
        return axiosInstant({
            method: "POST",
            url: "/products/upload",
            headers: {
                "Content-type": "multipart/form-data",
                Authorization: ` Bearer ${token}`,
            },
            data,
        });
    },
};

export default productsService;
