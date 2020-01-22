import React from "react";
import i18n from "i18next";
import { Link } from 'react-router-dom';

/**
 * Page route not founded
 */

export function NotFound() {
    return (
        <React.Fragment>
            <main className="centered-container">
                <h2>{i18n.t("Page not found")}</h2>
                <div className="m-t-lg btn-container">
                    <Link to="/account/login">{i18n.t("Login")}</Link>
                </div>
            </main>
        </React.Fragment>
    );
}