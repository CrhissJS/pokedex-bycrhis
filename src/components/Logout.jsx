import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeUserName } from '../store/slices/user.slice';
import logoutImg from '../sprites/images/logoutImg.png'

const Logout = () => {

    const logoutValue = "";

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        navigate("/");
        dispatch(changeUserName(logoutValue))
    }
    return (
        <div>
            <button style={{padding: "10px", height: "40px"}} onClick={logout}><img style={{width: "80px"}} src={logoutImg} alt="" /></button>
        </div>
    );
};

export default Logout;