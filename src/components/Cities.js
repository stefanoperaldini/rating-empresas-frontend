import React, { useState, useEffect } from "react"
import axios from "axios";
import { useTranslation } from "react-i18next";

const BASE_URL = "http://127.0.0.1:8000/v1/cities";

export function Cities() {
    const [searchTerm, setSearchTerm] = useState("");
    const [cities, setCities] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        if (searchTerm.length >= 3) {
            axios.get(`${BASE_URL}?name=${searchTerm}`).then(response => {
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

    return (
        <div className="autocompletamiento">
            <label htmlFor="cities">{t("City")}</label>
            <div className="busqueda">
                <input type="text" name="cities" id="cities" placeholder={t("Find the city...")} value={searchTerm}
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