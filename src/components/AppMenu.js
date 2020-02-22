import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useTranslation } from "react-i18next";
import { useHistory, } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { executeLogout } from "../utils";
import menu from "../img/menu-black.png";

export function AppMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const { t } = useTranslation();
    const history = useHistory();
    const { role, } = useAuth();

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCompanyCreate = () => {
        history.push("/company/create");
    };

    const handleReviewCreate = () => {
        history.push("/review/create");
    };

    const handleMyReviews = () => {
        history.push("/review/user");
    };

    const handleProfile = () => {
        history.push("/user/update");
    };
    const handlePasswordChange = () => {
        history.push("/account/password/change");
    };

    const handleDeleteAccount = () => {
        history.push("/user/delete");
    };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <img src={menu} alt={t("Menu icon")} />
            </Button>
            <Menu
                id="app-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {role === "2" && (<MenuItem onClick={handleCompanyCreate}>{t("My company")}</MenuItem>)}
                {role === "1" && (
                    <div>
                        <MenuItem onClick={handleReviewCreate}>{t("Create review")}</MenuItem>
                        <MenuItem onClick={handleMyReviews}>{t("My reviews")}</MenuItem>
                    </div>
                )}
                <MenuItem onClick={handleProfile}>{t("Profile")}</MenuItem>
                <MenuItem onClick={handlePasswordChange}>{t("Change password")}</MenuItem>
                <MenuItem onClick={handleDeleteAccount}>{t("Delete account")}</MenuItem>
                <MenuItem onClick={executeLogout}>{t("Sign out")}</MenuItem>
            </Menu>
        </div>
    );
}