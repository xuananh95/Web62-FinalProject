import axiosInstant from "./axiosInstant";

const authSevices = {
    login: ({ username, password }) => {
        return axiosInstant.post("/users/sign-in", { username, password });
    },

    register: (data) => {
        return axiosInstant.post("/users/sign-up", data);
    },
};

export default authSevices;
