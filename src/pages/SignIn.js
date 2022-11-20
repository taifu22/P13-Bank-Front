import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { accountService } from '../services/account.service';
import Nav from '../composants/Nav';
import { useDispatch } from 'react-redux';
import { setUserData, setTokenData } from '../feature/user.slice';

function SignIn() {

    //state for store the login of user
    const [login, setLogin] = useState({
        email: 'default',
        password: 'default' 
    });

    const navigate = useNavigate();;
    const dispatch = useDispatch();

    //function for set the login state with value of input password and email
    function onChangeInput(e) {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    //function for submit login's form
    function onSubmitForm(e) {
        e.preventDefault();
        accountService.login(login)
            .then(res => {
                dispatch(setTokenData(res.data))
                accountService.getProfile(res.data.body.token)
                      .then(res => {
                        dispatch(setUserData(res.data))
                        navigate('/profilpage');
                      })
            })
            .catch(error => console.log(error))
    }

    return ( 
        <>
            <Nav />
            <div className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={(e) => onSubmitForm(e)}>
                    <div className="input-wrapper">
                        <label>Username</label> 
                        <input name='email' onChange={(e) => onChangeInput(e)} type="text" value={login.email} />
                    </div>
                    <div className="input-wrapper">
                        <label>Password</label>
                        <input name='password' onChange={(e) => onChangeInput(e)} type="password" value={login.password} />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" /><label>Remember me</label>
                    </div>
                    <button className="sign-in-button">Sign In</button>
                </form>
            </section>
        </div>
        </>
    );
}

export default SignIn;