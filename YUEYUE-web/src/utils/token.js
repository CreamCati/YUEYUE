import {post} from "../api/api.js";
import msg from "../hooks/useMessage.js";

export const getToken = () => {
    try {
        const {token,username} = JSON.parse(localStorage.getItem("userToken"))
        return {token,username}
    }catch (e){
        return {token:null,username: null}
    }
}

export const removeToken = () => {
    localStorage.removeItem("userToken");
};

export const saveToken = (token,username) => {
    const info = {
        token,
        username,
    }
    localStorage.setItem("userToken",JSON.stringify(info));
};
export const checkToken = (navigate,setLoading,data) => {
    (async () => {
        try{
            setLoading(true)
            const response = await post('/validate-token', data);

            if (response.isValid === true) {
                console.log("有token")
                setLoading(false)
            } else {
                console.log("token过期")
                navigate("/login");
            }
        }catch (e){
            navigate("/notfound");
            console.log(e)
            msg("服务器错误","error")
        }
    })()
};
