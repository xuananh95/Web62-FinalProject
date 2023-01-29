import axiosInstant from "./axiosInstant";

const productsService = {
    create: (data, token) => {
        return axiosInstant({
            method: "POST",
            url: "/products/add-product",
            headers: {
                "Content-type": "multipart/form-data",
                Authorization: ` Bearer ${token}`,
            },
            data,
        });
    },
};

export default productsService;
