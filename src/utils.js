import { logOut } from "./http/authService";

export const executeLogout = () => {
    return logOut()
        .then(response => {
            localStorage.removeItem("currentUser");
            localStorage.removeItem("currentEmail");
        })
        .catch(error => {
            localStorage.removeItem("currentUser");
            localStorage.removeItem("currentEmail");
        })
        .finally(() => {
            window.location.href = "/home";
        });
};