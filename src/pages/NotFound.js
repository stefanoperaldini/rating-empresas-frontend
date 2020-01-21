import React from "react";
import i18n from "i18next";

/**
 * Page route not founded
 */

export function NotFound() {
    return (
        <main>
            <h2>{i18n.t("Not found")}</h2>
        </main>
    );
}