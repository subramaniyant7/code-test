import React, { useState } from 'react'
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ApiPath } from '../../api/apiPath';

const Login: React.FC = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);

    const onFinish = (values: any) => {
        setLoading(true);
        axios.post(ApiPath.LOGIN, { ...values })
            .then((res) => {
                if (res.data.success) {
                    localStorage.setItem("token", res.data.data.token);
                    setLoading(false);
                    navigate("/profile", { replace: true });
                }
            })
            .catch((err) => {
                setLoading(false);
                alert(err);
            })
    };

    const onFinishFailed = (errorInfo: any) => {
        alert("please enter correct credentials")
    };

    return (
        <div className='login'>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout={"vertical"}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ span: 16 }}>
                    <Button loading={loading} disabled={loading} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login;