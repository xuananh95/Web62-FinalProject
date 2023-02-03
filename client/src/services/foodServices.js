import axiosInstant from "./axiosInstant";

const foodServices = {
    addFood: (data, token) => {
        return axiosInstant({
            method: "POST",
            url: "/foods/add-food-data",
            headers: {
                Authorization: ` Bearer ${token}`,
            },
            data,
        });
    },
};

export default foodServices;
