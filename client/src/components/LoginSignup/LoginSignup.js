import React, { Component } from "react";
import  "./LoginSignup.css";
import Inputlog from "./Inputlog.js";
import Inputsign from "./Inputsign.js";

class LoginSignup extends Component {
    state = {
        login: true,
        signup: false,
    }
    loginToggle = () => {
        this.setState ({
            login: true,
            signup: false,
        })
    }
    signupToggle = () => {
        this.setState ({
            login: false,
            signup: true,
        })
    }

    render() {
        return (
            <div>
                { this.state.login ? 
                    <div className="loginSignup">
                        <div className="logside">
                            <Inputlog toggle={this.signupToggle} event={this.props.event}/>
                        </div>
                        <div className="logsideb">
                            Welcome Back! Haha Wala pa ako maisip ilagay dito 
                        </div>
                    </div> 
                : 
                    <div className="loginSignup">
                        <div className="signside">
                            <Inputsign toggle={this.loginToggle}/>
                        </div>
                        <div className="signsideb">
                            Join Us! Haha Wala pa ako maisip ilagay dito
                        </div>
                    </div> 
                }   
            </div>
        );
    }
}

export default LoginSignup;
