import React, { Component } from "react";
import "./Input.css";

class Inputlog extends Component {
    state = {
        email: null,
        password: null
    }
    handleFormSubmit = (e) => {
        e.preventDefault();
        this.props.event();
    }
    handleFormChange = (e) => {
        this.setState ({
            [e.target.name] :  e.target.value
        })

    }
    render() {
        return (
            <div>
                <div className="signLog">
                    <h2 className="titleLogSign"> Login </h2>
                    <form onSubmit={this.handleFormSubmit}>
                            <input
                                className = "sign"
                                type="email"
                                name="email"    
                                onChange= {this.handleFormChange}
                                placeHolder="Email"
                                required
                                />
                            <input  
                                className = "sign"
                                type="password"
                                name="password"
                                onChange= {this.handleFormChange}
                                placeHolder="Password"
                                required
                                />
                            <button className= "aBut" >Login</button>
                    </form>
                    <p> OR</p>
                    <button className="bBut" onClick = {this.props.toggle}> SignUp </button>
                </div>

            </div>
        );
    }
}

export default Inputlog;
