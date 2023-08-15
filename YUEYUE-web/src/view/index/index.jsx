// eslint-disable-next-line no-unused-vars
import React, {useEffect} from 'react';
import Header from "./components/Header.jsx";
import styles from './index.module.less'
import {useNavigate} from "react-router-dom";
import {getToken} from "../../utils/token.js";

const Home = () => {
    const navigate = useNavigate();
    const token = getToken()
    useEffect(() => {
        if (token === null) {
            navigate("/login");
        }
    });

    return (
        <>
            <Header/>
            <div className={styles.a}>
                {token+"123"}
                <div className={styles.b}>bbb</div>
            </div>
        </>
    );
};

export default Home;