import {Button, Form, Input} from "antd";
import {post} from "../../api/api.js";
import styled from "styled-components";
import gif from "../../assets/reg.gif";
import msg from "../../hooks/useMessage.js";

const Reg = () => {
    const onFinish = async (values) => {


        console.log(values)
        const {username,password,password2} = {...values}

        if(username.length<2 || username===""){
            msg("用户名长度需要>=2")
            return
        }
        if(password.length<6|| password===""){
            msg("密码长度需要>=6")
            return
        }
        if(password!==password2){
            msg("两次密码不一致")
            return
        }
        delete values.password2
        const data = {...values,type:"用户"}
        for (const key in data) {
            if (data[key] === null || data[key] === undefined || data[key] === '') {
                msg("我知道你很急，但是你先别急，没填完呢")
                return ; // 如果有空字段，返回 true
            }
        }

        try {
            const response = await post('/reg', data);
            if(response.code === '200'){
                msg("注册成功","success")
            }else{
                msg(response.msg)
            }
            // 在这里处理成功后的逻辑
        } catch (error) {
            console.error('Error:', error);
            // 在这里处理错误逻辑
        }
    };
    return (
        <Styled>
            <Form
                name="reg"
                onFinish={onFinish}
                autoComplete="off"
                labelCol={{
                    span: 4,
                }}

            >
                <Form.Item
                    style={{marginTop:'40px'}}
                    label="用户名"
                    name="username"
                    rules={[
                        {
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        {
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="确认密码"
                    name="password2"
                    rules={[
                        {
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[
                        {
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item style={{
                    textAlign:"center"
                }}>
                    <Button type="primary" htmlType="submit" style={{width:'70%'}}>
                        注册
                    </Button>
                </Form.Item>
            </Form>
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
export default Reg;