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
                    <div className="containerLogSign">
                        <div className="logside">
                            <Inputlog toggle={toggle} login={login}/>
                        </div>
                        <div className="logsideb">
                            <div className="donasource">
                                    Donasource
                            </div>
                            <div className="donasourceInfo">
                                Donasource is a web application that connects people who need help and those people who can help by posting their needs or what they are willing to donate.
                            </div>
                        </div>
                    </div>
                </div> 
            : 
                <div className="loginSignup">
                    <div className="containerLogSign">
                        <div className="logside">
                            <Inputsign toggle={toggle} signup={signup} />
                        </div>
                        <div className="logsideb">
                            <div className="donasource">
                                Join Us and be part of a community that helps one another.
                            </div>
                        </div>
                    </div>
                </div> 
            }   
        </div>
    )
}

export default LoginSignup;
