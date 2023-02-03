import axiosInstant from "./axiosInstant";

const productsService = {
    addOrder: (data, token) => {
        return axiosInstant({
            method: "POST",
            url: "/orders/add-order",
            headers: {
                Authorization: ` Bearer ${token}`,
            },
            data,
        });
    },
    getOrderByUser: (token) => {
        return axiosInstant({
            method: "GET",
            url: "/orders",
            headers: {
                Authorization: ` Bearer ${token}`,
            },
        });
    },

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
            url: "/uploadImage",
            headers: {
                "Content-type": "multipart/form-data",
                Authorization: ` Bearer ${token}`,
            },
            data,
        });
    },

    getAllProducts: (page) => {
        return axiosInstant({
            method: "GET",
            url: `/products?page=${page}`,
        });
    },

    updateProduct: (data, id, token) => {
        return axiosInstant({
            method: "PUT",
            url: `/products/${id}`,
            headers: {
                Authorization: ` Bearer ${token}`,
            },
            data,
        });
    },

    findUpdateProduct: (id) => {
        return axiosInstant({
            method: "GET",
            url: `/products/findByID/${id}`,
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
