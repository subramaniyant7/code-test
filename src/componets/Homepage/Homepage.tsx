import React from 'react'
import { Button, Space } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Homepage: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const signOutHandler = () => {
        localStorage.removeItem("token");
        navigate("/", { replace: true })
    };

    return (
        <div className='homepage'>
            <div className='container'>
                <Space>
                    <NavLink to="/">
                        <Button>About us</Button>
                    </NavLink>
                    {
                        token ? <> <NavLink to="profile">
                            <Button>Profile</Button>
                        </NavLink>
                            <Button onClick={() => signOutHandler()}>Sign out</Button></>
                            :
                            <NavLink to="sign-in">
                                <Button>Sign in</Button>
                            </NavLink>
                    }
                </Space>

                <div className='bottom-pages'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Homepage