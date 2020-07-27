import React, { Component } from "react";
import "./Input.css";

class Inputlog extends Component {
    state = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        repassword: "",
    }
    handleFormSubmit = (e) => {
        console.log(this.state)
    }
    handleFormChange = (e) => {
        this.setState ({
            [e.target.name] :  e.target.value
        })
    }
    checkPassword = (e) => {
        console.log(this.state.password)
        console.log(this.state.repassword)
        if (this.state.password === this.state.repassword) {
            e.preventDefault();
            this.handleFormSubmit()
        } else{
            alert("Passwords not the same!")
            e.preventDefault();
        }
    }
    render() {
        return (
            <div>
                <div className="userLog">
                    <h2 className="titleLogSign"> SignUp </h2>
                    <form onSubmit={this.checkPassword}>
                            <input
                                className = "Log"
                                type="text"
                                name="firstname"    
                                onChange= {this.handleFormChange}
                                placeHolder="First Name"
                                required
                                />
                            <input
                                className = "Log"
                                type="text"
                                name="lastname"    
                                onChange= {this.handleFormChange}
                                placeHolder="Last Name"
                                required
                                />
                            <input
                                className = "Log"
                                type="email"
                                name="email"    
                                onChange= {this.handleFormChange}
                                placeHolder="Email"
                                required
                                />
                            <input  
                                className = "Log"
                                type="password"
                                name="password"
                                onChange= {this.handleFormChange}
                                placeHolder="Password"
                                required
                                />
                            <input  
                                className = "Log"
                                type="password"
                                name="repassword"
                                onChange= {this.handleFormChange}
                                placeHolder="Confirm Password"
                                required
                                />
                            <button className= "aBut" >Sign Up</button>
                    </form>
                            <p> OR </p>
                            <button className= "bBut" onClick= {this.props.toggle}>Login</button>
                </div>

            </div>
        );
    }
}

export default Inputlog;
