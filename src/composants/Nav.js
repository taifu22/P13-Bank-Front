import React from 'react';
import Logo from '../assets/argentBankLogo.png';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { deleteDataUser } from '../feature/user.slice';

function Nav() {

    const naviagte = useNavigate();
    const dispatch = useDispatch();

    //recovery data of redux store
    let data = useSelector((state) => state)
    /*if redux store is empty, data is null, and we have the login button 
    else, we have the firstname of user, and the logout button*/
    if (data.user.users == null) {
        data = null
    }

    //function to logOut the user, and redirect him, to the home page
    function LogOutHandle() {
        dispatch(deleteDataUser());
        naviagte('/'); 
    }

    return (
        <div className='main-nav'>
        <Link className="main-nav-logo" to={"/"}>
        <img
            className="main-nav-logo-image"
            src={Logo}
            alt="Argent Bank Logo" 
            ></img>
        </Link>
            <div>
                {data &&
                <div className="main-nav-item">
                    <Link className="main-nav-logo" to={"/profilpage"}>
                        <div>
                            <i className="fa fa-user-circle" style={{marginRight:'5px'}}></i>
                            {<p>{data.user.users.body.firstName}</p>}
                        </div>
                    </Link>
                    <div onClick={() => LogOutHandle()}>
                        <i className="fa fa-sign-out"></i>
                        <p>Sign out</p>
                    </div>
                </div>} 
                {data == null && <div className="main-nav-item">
                    <Link className="main-nav-logo" to={"/signin"}>
                        <i className="fa fa-user-circle" style={{marginRight:'5px'}}></i>   
                        <p>Sign In</p>
                    </Link>
                </div>}
            </div> 
        </div>
    );
}

export default Nav;