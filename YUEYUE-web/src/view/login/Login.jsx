import {Button, Form, Input} from "antd";
import {post} from "../../api/api.js";
import gif from "../../assets/login.gif";
import styled from "styled-components";
import msg from "../../hooks/useMessage.js";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {getToken, saveToken} from "../../utils/token.js";

const Login = () => {
    const nav = useNavigate();
    const {token} = getToken()

    useEffect(() => {
        if (token !== null) {
            msg("已经登录过啦",)
            nav("/");
        }
    });


    const onFinish = async (values) => {
        console.log('Success:', values);
        try {
            const response = await post('/login', values);
            // 在这里处理成功后的逻辑
            if(response.code === '200'){
                saveToken(response.token,values.username)
                msg("ok","success")
                nav('/')
            }else{
                msg(response.msg,"error")
            }

        } catch (error) {
            msg("error","error")
            // 在这里处理错误逻辑
        }

    };
    return (
        <Styled>
            <Form
                name="login"
                onFinish={onFinish}
                autoComplete="off"
                labelCol={{
                    span: 4,
                }}
            >
                <Form.Item
                    style={{marginTop:'30px'}}
                    className='ant-col'
                    label="用户名"
                    name="username"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item style={{
                    textAlign:"center"
                }}>
                    <Button type="primary" htmlType="submit" style={{width:'70%'}}>
                        登录
                    </Button>
                </Form.Item>
            </Form>
            <div className='reg_lose'>
                <span>忘记密码</span>
            </div>
            <div className='login_gif'>
                <img src={gif} width={300} alt=''/>
            </div>
        </Styled>
    );
};
const Styled = styled.div`
    .reg_lose{
      text-align: right;
      span{
        color: gray;
      }
      span:hover{
        cursor: pointer;
        color: #1677FF;
      }
    }
    .login_gif{
      text-align: center;
      margin-top: 35px;
    }
 
`
export default Login;