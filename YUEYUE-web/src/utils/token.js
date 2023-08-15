export const getToken = () => localStorage.getItem("userToken");

export const removeToken = () => {
    localStorage.removeItem("userToken");
};

export const saveToken = (token) => {
    localStorage.setItem("userToken", token);
};
