import React, { useContext, useState } from "react";

const ReContext = React.createContext();


export function ReProvider({ children }) {

    const [lang, setLang] = useState("en");

    return (
        <ReContext.Provider value={{ lang, setLang }}>
            {children}
        </ReContext.Provider>
    );
}

export function useRe() {
    const context = useContext(ReContext);
    return context;
}