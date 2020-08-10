import React, { useState } from "react";
import "./Input.css";

const INIT_USER = {
    email: "",
    password: "",
}

const Inputlog = ({login,toggle}) => {
    const [user, setUser] = useState(INIT_USER)
    
    const handleFormSubmit = (event) => {
        event.preventDefault()
        login(user)
        console.log(user)
    }

    const handleFormChange = (event) => {
        const {target} = event
        setUser(prevState => ({
            ...prevState,
            [target.name]: target.value,
        })
        )
    }

    return (
        <div>
            <div className="signLog">
                <h2 className="titleLogSign"> Login </h2>
                <form onSubmit={(e) => handleFormSubmit(e)}>
                        <input
                            className = "sign"
                            type="email"
                            name="email"    
                            onChange= {(e) => handleFormChange(e)}
                            placeholder="Email"
                            required
                            />
                        <input  
                            className = "sign"
                            type="password"
                            name="password"
                            onChange= {(e) => handleFormChange(e)}
                            placeholder="Password"
                            required
                            />
                        <button className= "aBut" >Login</button>
                </form>
                <p> OR</p>
                <button className="bBut" onClick = {() => toggle()}> SignUp </button>
            </div>
        </div>
    )
}

export default Inputlog;
