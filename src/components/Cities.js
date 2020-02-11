import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next";

import { getCityName, } from "../http/cityService";

export function Cities({ value, onRegister, }) {
    console.log(value);
    const [searchTerm, setSearchTerm] = useState(value);
    const [cities, setCities] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        if (searchTerm.length >= 3) {
            getCityName(searchTerm).then(response => {
                setCities(response.data.rows);
                if (cities.length !== 0) {
                    setShowResult(true);
                } else {
                    setShowResult(false);
                }
            });
        }

        if (searchTerm.length < 3) {
            setShowResult(false);
        }

    }, [searchTerm, cities]);

    console.log(searchTerm);

    return (
        <div className="autocompletamiento">
            <div className="busqueda">
                <input ref={onRegister()} type="text" name="cities" id="cities" placeholder={t("Find the city...")} value={searchTerm}
                    onChange={e => {
                        setSearchTerm(e.target.value);
                    }} onKeyDown={e => {
                        if (e.key === "ArrowDown") {
                            console.log("arrowDown");
                        } else if (e.key === "ArrowUp") {
                            console.log("arrowUp");
                        }
                    }} />
                <div>
                    {showResult &&
                        <ul className="resBusqueda">
                            {cities.map(city => (
                                <li key={city.name} onClick={e => {
                                    setSearchTerm(city.name);
                                    setCities([]);
                                    setShowResult(false);
                                }}>
                                    {city.name}
                                </li>
                            ))}
                        </ul>}
                </div>
            </div>
        </div >

    );
}