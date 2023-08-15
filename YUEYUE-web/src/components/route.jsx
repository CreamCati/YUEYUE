import {useNavigate} from "react-router-dom";

export const LinkBack = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // 使用-1参数返回上一页
    };

    return (
        <>
            <button onClick={goBack}>Go Back</button>
        </>
    );
};
