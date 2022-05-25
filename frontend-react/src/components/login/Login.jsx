import React from 'react';
import '../../styles/LoginForms.css';
import '../../styles/global.css'
import {useNavigate} from 'react-router';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setLoginStatus} from "../../store/action/IsLoggedAction";
import {Button, TextField} from "@mui/material";
import {GetUserInfo} from "../../services/UserService";
import {setCookie} from "../../services/CookieService";

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.isLogged);
    const [warning, setWarning] = React.useState(false);
    const [warningText, setWarningText] = React.useState("");

    function sendLoginRequest(event) {
        event.preventDefault();
        let loginInfo = {
            "userName": event.target[0].value,
            "password": event.target[1].value
        }
        axios({
            method: "post",
            url: process.env.REACT_APP_URL + "/authenticate",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            },
            data: loginInfo
        }).then((response) => {
            if (response.status === 200) {
                setWarning(false);
                setCookie('jwt', response.data.jwt);
                dispatch(setLoginStatus({
                    isLogged: true
                }))
                GetUserInfo(response.data.jwt, dispatch);
                navigate("/");
            }
        }).catch((error) => {
            setWarning(true);
            setWarningText(error.response.data);
        })
    };

    return (
        <section className={"form-section"}>

            <form className="form-wrapper" onSubmit={event => {sendLoginRequest(event);}}>
                <h1 className="header-forms-label">Sign In</h1>

                <div className="form-container">
                    <TextField label="Username" type={"text"} margin={"dense"} variant={"filled"} color={"error"}/>
                    <TextField label="Password" type={"password"} margin={"dense"} variant={"filled"} color={"error"}/>
                    {
                        (warning === true) ? <div className={"sign-up-warning"}><p>{warningText}</p></div> : null
                    }

                    <Button type={"submit"} variant="outlined" color={"error"}>Confirm</Button>
                </div>

                <div className={"form-footer"}>
                    <a className={"register-anchor"} onClick={() => navigate("/register")}>Not registered? Sign up</a>
                    <img className={"brand-logo"} src={"/images/cross.png"} alt=""/>
                    <a className={"main-anchor"} onClick={() => navigate("/")}>Back to main page</a>
                </div>
            </form>

        </section>
    );
}

export default Login;
