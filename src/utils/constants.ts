import type { ToastOptions } from "react-toastify";

export const toastSignUpError = (errors: { email?: string; username?: string }): string => {
    let message = "";
    if ("email" in errors) {
        message += "Email";
    }
    if ("username" in errors) {
        message = message === "" ? "Username" : message + " and username";
    }
    return `${message} has already been taken`;
};
export const toastSignUpSuccess = "Signed up successfully!";
export const toastLoginError = "Incorrect email and/or password";
export const toastLoginSuccess = "Logged in successfully!";
export const toastFormat: ToastOptions = {
    position: "bottom-right",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
};

export const emailRegex = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
export const clientId = "644077220041-d30ip5992q0qd1e2ieu3q3naokcpnv51.apps.googleusercontent.com";
