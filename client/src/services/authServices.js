import axiosInstant from "./axiosInstant";

const authSevices = {
    login: ({ username, password }) => {
        return axiosInstant.post("/user/sign-in", { username, password });
    },

    register: (data) => {
        return axiosInstant.post("/user/sign-up", { data });
    },
};

export default authSevices;
