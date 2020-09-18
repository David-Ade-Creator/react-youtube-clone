import React, { useState } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from 'react-redux';
import { register } from '../actions/userActions';

export default function Signup(props) {
    const [firstname,setFirstname]=useState('');
    const [lastname,setLastname]=useState('');
    const [email,setEmail]=useState('');
    const [password1,setPassword1]=useState('');
    const [password2,setPassword2]=useState('');

    const dispatch = useDispatch();
  


    const submitHandler = (e) => {
        e.preventDefault();
        if(firstname && lastname && email && password1) {
          if (password1 === password2){
            dispatch(register(firstname,lastname,email,password1))
          } else {
            toast.error('Passwords don\'t match')
          }
        } else {
          toast.error('Please fill all fields')
        }
      };

    return (
        <div className="signup">
            <div className="signup_body">
                <form className="signup_form" onSubmit={submitHandler}>
                <div>
                       <h3>Create your account</h3>
                    </div>
                    <div>
                         <ToastContainer/>
                    </div>
                    <div className="name">
                    <div>
                        <input type="text" onChange={(e)=>setFirstname(e.target.value)} placeholder="FirstName" />
                    </div>
                    <div>
                    <input type="text"  onChange={(e)=>setLastname(e.target.value)} placeholder="LastName" />
                    </div>
                    </div>
                    <div>
                        <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
                    </div>
                    <div>
                        <input type="password"  onChange={(e)=>setPassword1(e.target.value)} placeholder="Password" />
                    </div>
                    <div>
                        <input type="password"  onChange={(e)=>setPassword2(e.target.value)} placeholder="Confirm-Password" />
                    </div>
                    <div>
                        <button type="submit">
                           Create Account
                        </button>

                    </div>
                </form>
                <div className="signup_link">
                   <h5>Already have an account? <Link to="/signin">Signin</Link></h5>
                </div>
            </div>
        </div>
    )
}
