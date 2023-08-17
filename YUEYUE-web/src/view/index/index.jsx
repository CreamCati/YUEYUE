// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import Header from "./components/Header.jsx";
import {useNavigate} from "react-router-dom";
import {Skeleton} from "antd";
import {checkToken, getToken} from "../../utils/token.js";

const Home = () => {
    const {token,username} = getToken()
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)
    const data={
        token: token,
        username:username
    }
    useEffect(() => {
        checkToken(navigate,setLoading,data)
    },[]);

    return (
        <>
            <Skeleton loading={loading}
                      paragraph={{ rows: 20}}>
                <Header/>

                    {token+"123"}

            </Skeleton>
        </>
    );
};

export default Home;