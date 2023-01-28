const useLocalStorage = ({ key, data }) => {
    const getLocalStorege = localStorage.setItem(key, JSON.stringify(data));
    return getLocalStorege;
};

export default useLocalStorage;
