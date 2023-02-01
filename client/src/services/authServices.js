import axiosInstant from "./axiosInstant";

const authSevices = {
    login: (data) => {
        return axiosInstant.post("/users/sign-in", data);
    },

    register: (data) => {
        return axiosInstant.post("/users/sign-up", data);
    },

    logout: (token) => {
        return axiosInstant({
            method: "POST",
            url: "/users/sign-out",
            headers: {
                Authorization: ` Bearer ${token}`,
            },
        });
    },
};

export default authSevices;
