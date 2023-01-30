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

    getAllProducts: () => {
        return axiosInstant({
            method: "GET",
            url: "/products",
        });
    },

    updateProduct: (id, token) => {
        return axiosInstant({
            method: "PUT",
            url: `/products/${id}`,
            headers: {
                Authorization: ` Bearer ${token}`,
            },
        });
    },

    deleteProduct: (id, token) => {
        return axiosInstant({
            method: "DELETE",
            url: `/products/${id}`,
            headers: {
                Authorization: ` Bearer ${token}`,
            },
        });
    },
};

export default productsService;
