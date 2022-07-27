import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeUserName } from '../store/slices/user.slice';
import { useNavigate } from 'react-router-dom';
import title1 from '../sprites/images/title1.png'
import title2 from '../sprites/images/title2.png'

const UserInput = () => {

    const [userLogin, setUserLogin] = useState("")

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const submit = e => {
        e.preventDefault()
        dispatch(changeUserName(userLogin))
        navigate("/pokedex")
    }

    document.body.style=`
        background-image: url("https://wallpaperaccess.com/full/4167709.gif");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 97.5vh;
    `

    return (
        <>
            <div style={{ display: 'flex', flexDirection: "column", alignItems: "center"}}>
                <img style={{ width: "400px" }} src={title1} alt="" />
                <img style={{ width: "200px" }} src="https://www.pngmart.com/files/12/Pokemon-Ash-Ketchum-Transparent-PNG.png" alt="" />
                <img style={{ width: "400px" }} src={title2} alt="" />
            </div>
            <form style={{ display: "flex", justifyContent: "center", marginTop: "20px"}} onSubmit={submit}>
                <input
                    type="text"
                    value={userLogin}
                    onChange={e => setUserLogin(e.target.value)}
                />
                <button><img style={{ width: "20px" }} src="http://www.purarteadesivos.com.br/wp-content/uploads/2017/04/Pok%C3%A9mon-go.png" alt="" /></button>
            </form>
        </>
    );
};

export default UserInput;