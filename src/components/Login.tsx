import Input from "./Input";
import Warning from "./Warning";
import { acUserLogin } from "../store/user/action";
import { useAppSelector, useAppDispatch } from "../store";
import { ICredentials } from "../store/user/types";
import { validateEmail, validatePassword } from "../utils/validators";
import { toastLoginError, toastFormat, toastLoginSuccess } from "utils/constants";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { AxiosError } from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
//import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { TheatersRounded } from "@mui/icons-material";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {"Copyright © "}
            CVWO {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const Login = (): JSX.Element => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [emailErr, setEmailErr] = useState<string>("");
    const [passwordErr, setPasswordErr] = useState<string>("");
    const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const inputIsInvalid: boolean = emailErr !== "" || passwordErr !== "" || email === "" || password === "";
        if (btnDisabled !== inputIsInvalid) {
            setBtnDisabled(inputIsInvalid);
        }
    }, [emailErr, passwordErr, email, password]);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const credentials: ICredentials = {
            email,
            password,
        };
        dispatch(acUserLogin(credentials))
            .then(() => toast.success(toastLoginSuccess, toastFormat))
            .catch(() => toast.error(toastLoginError, toastFormat));

        setEmail("");
        setPassword("");
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    mt: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 3 }}>
                    <Grid container>
                        <Input
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            setInput={setEmail}
                            setMessage={setEmailErr}
                            validate={validateEmail}
                            autoFocus
                            message={emailErr}
                        ></Input>
                        <Input
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={password}
                            setInput={setPassword}
                            setMessage={setPasswordErr}
                            validate={validatePassword}
                            message={passwordErr}
                        ></Input>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={btnDisabled}>
                        Login
                    </Button>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link to="/signup">{"Don't have an account yet? Sign Up"}</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
            <ToastContainer />
        </Container>
    );
};

export default Login;
