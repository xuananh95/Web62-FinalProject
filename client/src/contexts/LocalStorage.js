const LocalStorage = {
    getItem: (key) => {
        return JSON.parse(localStorage.getItem(key)) || [];
    },

    setItem: (key, data) => {
        return localStorage.setItem(key, JSON.stringify(data)) || [];
    },

    deleteItem: (key) => {
        return localStorage.removeItem(key) || [];
    },
};

export default LocalStorage;
