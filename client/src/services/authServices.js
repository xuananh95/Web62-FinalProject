import axiosInstant from "./axiosInstant";

const authSevices = {
    login: (data) => {
        return axiosInstant.post("/users/sign-in", data);
    },

    register: (data) => {
        return axiosInstant.post("/users/sign-up", data);
    },
};

export default authSevices;
