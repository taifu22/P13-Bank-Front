import React, { useState, useEffect } from 'react';
import SignIn from './SignIn';
import Nav from '../composants/Nav';
import { useSelector,useDispatch } from 'react-redux';
import Axios from '../services/CallAxios.service';
import { editUserData } from '../feature/user.slice';
import { useNavigate } from 'react-router-dom';

function ProfilPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false)

    const [dataEdit, setDataEdit] = useState({
        firstName: 'default',
        lastName: 'default' 
    });

    //function for set the data state with value of input first and lastName
    function onChangeInput(e) {
        setDataEdit({
            ...dataEdit,
            [e.target.name]: e.target.value
        })
    }

    //Data recovery from the redux store (user information and token)
    const data = useSelector((state) => {
        if (state.user.users == null || state.user.users == undefined) {
            return null
        } else {
            return state.user.users.body
        }
    })
    const token = useSelector((state) => {
        if (state.user.token == null || state.user.token == undefined) {
            return null
        } else {
            return state.user.token.body.token
        }
    })

    //function for toggle inputs of edit last and firstName
    function ToggleButton() {
        setToggle(!toggle)
    }
    
    //function to edit last and firstName with the token, and store in redux and database 
    function handleEdit() {
        let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }
        Axios.put('api/v1/user/profile', dataEdit, config)
             .then(() => {
                dispatch(editUserData([dataEdit.firstName, dataEdit.lastName]))
             })
    }

    //function to view tranactions
    function Viewtransaction(params) {
        return navigate('/transaction', {state:{data:params}});
    }

    //conition in a useEffect for navigate in signin page if data = null
    useEffect(()=>{
        if (data == null || token == null) {
            console.log(data);
            navigate('/signin');
        }
    },[])

    return (
        <>
            <Nav />
            {data ? <div className="main bg-dark">
            <div className="header">
                <h1>Welcome back<br /><p style={toggle ? {display:'none'}: {marginTop:'0px'}}>{data.firstName} {data.lastName}</p></h1>
                {toggle ? <>
                <div>
                    <input onChange={(e) => onChangeInput(e)} className='input-changeName' name='firstName' placeholder={data.firstName} type="text" />
                    <input onChange={(e) => onChangeInput(e)} className='input-changeName' name='lastName' placeholder={data.lastName} type="text" />
                </div>
                <div>
                    <button onClick={() => {handleEdit();ToggleButton()}} className='button-change'>Save</button>
                    <button onClick={() => ToggleButton()} className='button-change'>Cancel</button>
                </div></> :
                <button onClick={() => {ToggleButton()}} className="edit-button">Edit Name</button>}
            </div>
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                <p className="account-amount">$2,082.79</p>
                <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                <button onClick={() => Viewtransaction('$2,082.79')} className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                <p className="account-amount">$10,928.42</p>
                <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                <button onClick={() => Viewtransaction('$10,928.42')} className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                <p className="account-amount">$184.30</p>
                <p className="account-amount-description">Current Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                <button onClick={() => Viewtransaction('$184.30')} className="transaction-button">View transactions</button>
                </div>
            </section>
        </div> : <SignIn />}
        </>
    );
}

export default ProfilPage;