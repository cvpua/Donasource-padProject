import React, { useState } from "react";
import "./Input.css";

const INIT_USER = {
    username : "",
    firstName: "",
    lastName: "",
    email: "",
    contactNumber : "",
    password: "",
    repassword: "",
}

const InputSign = ({signup,toggle}) => {
    const [user, setUser] = useState(INIT_USER)

    const checkPassword = () => user.password === user.repassword ? true : false

    const handleFormSubmit = (event) => {
        event.preventDefault()
        checkPassword() ? signup(user) : alert("Passwords not the same!")
        console.log(user)
    }

    const handleFormChange = (event) => {
        const {target} = event
        setUser(prevState => ({
            ...prevState,
            [target.name]: target.value,
        })
        )
        console.log(user)
    }

    return (
        <div>
            <div className="userLog">
                <h2 className="titleLogSign"> SignUp </h2>
                <form onSubmit={(e) => handleFormSubmit(e)}>
                        <input
                            className = "Log"
                            type="text"
                            name="username"    
                            onChange= {(e) => handleFormChange(e)}
                            placeHolder="Username"
                            required
                            />
                        <input
                            className = "Log"
                            type="text"
                            name="firstName"    
                            onChange= {(e) => handleFormChange(e)}
                            placeHolder="First Name"
                            required
                            />
                        <input
                            className = "Log"
                            type="text"
                            name="lastName"    
                            onChange= {(e) => handleFormChange(e)}
                            placeHolder="Last Name"
                            required
                            />
                        <input
                            className = "Log"
                            type="email"
                            name="email"    
                            onChange= {(e) => handleFormChange(e)}
                            placeHolder="Email"
                            required
                            />
                        <input
                            className = "Log"
                            type="number"
                            name="contactNumber"    
                            onChange= {(e) => handleFormChange(e)}
                            placeHolder="Contact Number"
                            required
                            />
                        <input  
                            className = "Log"
                            type="password"
                            name="password"
                            onChange= {(e) => handleFormChange(e)}
                            placeHolder="Password"
                            required
                            />
                        <input  
                            className = "Log"
                            type="password"
                            name="repassword"
                            onChange= {(e) => handleFormChange(e)}
                            placeHolder="Confirm Password"
                            required
                            />
                        <button className= "aBut" >Sign Up</button>
                </form>
                        <p> OR </p>
                        <button className= "bBut" onClick= {() => toggle()}>Login</button>
            </div>

        </div>
    );
}

export default InputSign;
