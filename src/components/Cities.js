import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { getCityName } from "../http/cityService";

export function Cities({ onClickCity, city = "" }) {
    const [searchTerm, setSearchTerm] = useState(city);
    const [cities, setCities] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        setSearchTerm(city);
    }, [city]);

    useEffect(() => {
        if (searchTerm.length >= 3) {
            getCityName(searchTerm).then(response => {
                setCities(response.data.rows);
            });
        }

    if (searchTerm.length < 3) {
      setShowResult(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (cities.length !== 0) {
      setShowResult(true);
    } else {
      setShowResult(false);
    }
  }, [cities]);

  return (
    <div className="findCity">
      <input
        type="text"
        name="city_id"
        id="city_id"
        placeholder={t("Find the city ...")}
        value={searchTerm}
        onChange={e => {
          setSearchTerm(e.target.value);
        }}
      />
      {showResult && (
        <div
          className="resFindCity"
          onMouseLeave={e => {
            setShowResult(false);
          }}
        >
          <ul>
            {cities.map(city => (
              <li
                key={city.name}
                className="itemsCities"
                onClick={e => {
                  e.stopPropagation();
                  setSearchTerm(city.name);
                  onClickCity(city.id);
                  setCities([]);
                  setShowResult(false);
                }}
              >
                {city.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
