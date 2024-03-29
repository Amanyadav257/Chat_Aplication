import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Styled-components is a library that allows you to write CSS in JS while building custom components in Reactjs
import styled from "styled-components";
import axios from "axios";

function Register() {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        ConfirmPassword: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { password, ConfirmPassword, username, email } = values;
            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password,
            });
        }
    };

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const handleValidation = () => {
        const { password, ConfirmPassword, username, email } = values;
        if (password !== ConfirmPassword) {
            toast.error("password and confirm password should be same.", toastOptions);
            return false;
        }
        else if (username.length < 3) {
            toast.error("Username Should be greater than 3 Characters", toastOptions);
            return false;
        }
        else if (password.length < 8) {
            toast.error("Password should be equal or greater than 8 chacters", toastOptions);
            return false;
        }
        else if (email === "") {
            toast.error("email is required", toastOptions);
            return false;
        }
        return true;
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return (<>
        <FromContainer>
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className="brand">
                    <img src={Logo} alt="Logo" />
                    <h1>Snappy</h1>
                </div>
                <input type="text" placeholder="Username" name="username" onChange={(e) => handleChange(e)} />
                <input type="email" placeholder="Email" name="email" onChange={(e) => handleChange(e)} />
                <input type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)} />
                <input type="password" placeholder="Confirm Password" name="ConfirmPassword" onChange={(e) => handleChange(e)} />

                <button type="submit">Create User</button>
                <span>Already have an account ? <Link to="/login">Login</Link></span>
            </form>
        </FromContainer>
        <ToastContainer />
    </>
    );
}


const FromContainer = styled.div`
     height: 100vh;
     width: 100vw;
     display: flex;
     flex-direction: column;
     justify-content: center;
     gap: 1rem;
     align-items: center;
     background-color: #131324;
    
     .brand{
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;

        img{
            height: 5rem;
        }

        h1{
            color: white;
            text-transform: uppercase;
        }
}

        form{
            display: flex;
            flex-direction: column;
            gap: 2rem;
            background-color: #00000076;
            border-radius: 2rem;
            padding: 3rem 5rem;
            
            input{
                background-color: transparent;
                padding: 1rem;
                border: 0.1rem solid #4e0eff;
                border-radius: 0.4rem;
                color: white;
                width: 100%;
                font-size: 1rem;

                &:focus {
                    border: 0.1rem solid #997af0;
                    outline: none;
                }

            }
            button{
                background-color: #997af0;
                color: white;
                padding: 1rem 2rem;
                border: none;
                font-weight: bold;
                cursor: pointer;
                border-radius: 0.4rem;
                font-size: 1rem;
                text-transform: uppercase;
                transition: 0.5s ease-in-out;

                &:hover{
                    background-color: #4e0eff;
                }
            }
            span{
                color: white;
                // text-transform: uppercase;
                a{
                    text-decoration: none;
                    color: #4e0eff;
                    font-weight: bold;
                }
            }
        }

`;

export default Register;