import Input from "../Input";
import { acUserLogin } from "../../store/user/action";
import { useAppDispatch } from "../../store";
import { ICredentials } from "../../store/user/types";
import { validateEmail, validatePassword } from "../../utils/validators";
import { acSetPosts } from "store/posts/action";
import { toastLoginError, toastFormat, toastLoginSuccess } from "utils/constants";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [emailErr, setEmailErr] = useState<string>("");
    const [passwordErr, setPasswordErr] = useState<string>("");
    const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
    const [show, setShow] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setShow(true);
    }, []);

    useEffect(() => {
        const inputIsInvalid: boolean = emailErr !== "" || passwordErr !== "" || email === "" || password === "";
        if (btnDisabled !== inputIsInvalid) {
            setBtnDisabled(inputIsInvalid);
        }
    }, [emailErr, passwordErr, email, password]);

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const credentials: ICredentials = {
            email,
            password,
        };
        dispatch(acUserLogin(credentials))
            .then(() => {
                dispatch(acSetPosts());
                toast.success(toastLoginSuccess, toastFormat);
                navigate("/");
            })
            .catch(() => toast.error(toastLoginError, toastFormat));

        setEmail("");
        setPassword("");
    };
    return (
        <Container
            className="gradient-background"
            sx={{
                display: "flex",
            }}
        >
            <Slide direction="down" in={show} timeout={700}>
                <Box className="noselect form" maxWidth="s">
                    <Typography
                        component="h1"
                        variant="h5"
                        sx={{
                            fontWeight: "bold",
                            fontFamily: "'Open Sans'",
                        }}
                    >
                        Welcome to Kaypoh.forum
                    </Typography>
                    <Typography component="h1" variant="h6">
                        Login
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleLogin} maxWidth="xs" sx={{ mt: 3, width: "80vw" }}>
                        <Input
                            placeholder="Email address"
                            autoComplete="email"
                            value={email}
                            setValue={setEmail}
                            setMessage={setEmailErr}
                            validate={validateEmail}
                            autoFocus
                            message={emailErr}
                        ></Input>
                        <Input
                            placeholder="Password"
                            autoComplete="password"
                            type="password"
                            value={password}
                            setValue={setPassword}
                            setMessage={setPasswordErr}
                            validate={validatePassword}
                            message={passwordErr}
                        ></Input>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={btnDisabled}
                        >
                            Login
                        </Button>
                        <Link to="/signup" style={{ color: "#005e97" }}>
                            {"Don't have an account yet? Sign Up"}
                        </Link>
                    </Box>
                </Box>
            </Slide>
        </Container>
    );
};

export default Login;
