import React,{useState} from "react";
import  "./LoginSignup.css";
import Inputlog from "./Inputlog.js";
import Inputsign from "./Inputsign.js";

const LoginSignup = ({login,signup}) => {
    const [isLoggingIn, setIsLoggingIn] = useState(true)

    const toggle = () => {
        setIsLoggingIn(!isLoggingIn)
    }

    return (
        <div>
            { isLoggingIn ? 
                <div className="loginSignup">
                    <div className="logside">
                        <Inputlog toggle={toggle} login={login}/>
                    </div>
                    <div className="logsideb">
                        Welcome Back! Haha Wala pa ako maisip ilagay dito 
                    </div>
                </div> 
            : 
                <div className="loginSignup">
                    <div className="signside">
                        <Inputsign toggle={toggle} signup={signup} />
                    </div>
                    <div className="signsideb">
                        Join Us! Haha Wala pa ako maisip ilagay dito
                    </div>
                </div> 
            }   
        </div>
    )
}

export default LoginSignup;
