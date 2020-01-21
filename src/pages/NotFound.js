import React from "react";
import i18n from "i18next";

/**
 * Page route not founded
 */

export function NotFound() {
    return (
        <div>
            <h1>{i18n.t("Not found")}</h1>
        </div>
    );
}