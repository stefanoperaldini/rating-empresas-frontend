import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { getCityName } from "../http/cityService";

function filterCities(nameCity, cities) {
  if (nameCity.length === 0) {
    return cities;
  }
  const filterdCities = cities.filter((cityElement) => cityElement.name === nameCity);
  if (filterdCities.length === 0) {
    return cities;
  }
  return filterdCities;
}

export function Cities({ onClickCity, cityToSet = "" }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [cityParam, setCityParam] = useState(cityToSet);
  const [cities, setCities] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setSearchTerm(cityToSet);

  }, [cityToSet,]);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      getCityName(searchTerm).then(response => {
        const filterdCities = filterCities(cityParam, response.data.rows);
        if (cityParam.length !== 0 && filterdCities.length === 1) {
          onClickCity(filterdCities[0].id);
          setCityParam("");
        } else {
          setCities(response.data.rows);
        }
        setShowResult(false);
      })
    }
    if (searchTerm.length < 3) {
      setShowResult(false);
    }
  }, [searchTerm, onClickCity, cityParam]);

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
