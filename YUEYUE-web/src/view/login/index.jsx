import bg from '../../assets/R.jpg'
import gif from '../../assets/login.gif'
import styled from "styled-components";
import {Button, Form, Input, Tabs} from 'antd';
import {post} from "../../api/api.js";
import Login from "./Login.jsx";
import Reg from "./Reg.jsx"


const items = [
    {
        key: '1',
        label: `登录`,
        children: <Login/>,
    },
    {
        key: '2',
        label: `注册`,
        children: <Reg/>,
    },
];

const Index = () => {

    const onChange = (key) => {
        console.log(key);
    };
    const onReg = () => {
        console.log('onReg:');
    };

    return (
        <Styled>
            <div className='loginContent'>
                <div className='loginBox'>
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                </div>
            </div>
        </Styled>
    );
};
const Styled = styled.div`
  background: url(${bg}) no-repeat ;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  
    .loginContent{
      width: 500px;
      position: absolute;
      right: 7%;
      
      .loginBox{
        background: rgba(255,255,255,1);
       
        height: 60vh;
        border-radius: 25px;
        padding: 25px 60px;

        .title{
          margin-top: 50px;
          text-align: center;
          font-weight: bold;
          font-size: 20px;
        }
        
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
      }
    }
      
  

`
export default Index;