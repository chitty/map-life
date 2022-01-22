import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getTime } from "../utils/getTime";
import { CountryNameMapping } from "../data/CountryNameMapping";
import { API_URL } from "../data/Constants";
import Loading from "./Loading";
import "../App.css";
import "./CountryPage.css";

const CountryPage = () => {
  let { iso3 } = useParams();
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState(
    JSON.parse(localStorage.getItem(iso3)) || {}
  );

  useEffect(() => {
    const url = `${API_URL}/${iso3}`;
    const data = JSON.parse(localStorage.getItem("dataSet")) || [];
    if (!country.name || country.ISO3 !== iso3) {
      setLoading(true);
      fetch(url)
        .then((res) => res.json())
        .then(
          (result) => {
            const fullCountry = {
              ...result,
              ...data.find((itmInner) => itmInner.ISO3 === result.alpha3Code),
            };
            setCountry(fullCountry);
            localStorage.setItem(country.ISO3, JSON.stringify(fullCountry));
            setLoading(false);
          },
          (error) => {
            console.log("Error fetching country data: ", error);
            setLoading(false);
          }
        );
    }
  }, [country.name, country.ISO3, iso3]);

  const details = country.name
    ? [
        { name: "Native Name", content: country.nativeName },
        { name: "Population", content: country.population.toLocaleString() },
        { name: "Region", content: country.region },
        { name: "Sub Region", content: country.subregion },
        { name: "Capital", content: country.capital },
        {
          name: country.languages.length > 1 ? "Languages" : "Language",
          content: country.languages.reduce((acc, lang) => {
            return acc ? `${acc}, ${lang.name}` : lang.name;
          }, ""),
        },
        {
          name: country.currencies.length > 1 ? "Currencies" : "Currency",
          content: country.currencies.reduce((acc, curr) => {
            return acc
              ? `${acc}, ${curr.name} (${curr.code} ${curr.symbol})`
              : `${curr.name} (${curr.code} ${curr.symbol})`;
          }, ""),
        },
      ]
    : [];

  return (
    <div className="container">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="center">
            {country.name ? country.name : "Country Unavailable"}
          </h1>
          {country.name && (
            <div className="center country-page">
              <div className="full-flag">
                <img
                  src={country.flag}
                  alt={`${country.name}'s flag`}
                  className="full-flag-img"
                />
              </div>
              <div className="country-details">
                {details.map((detail, i) => (
                  <div className="country-detail" key={i}>
                    <b>{detail.name}:</b> {detail.content}
                  </div>
                ))}

                <div className="country-detail">
                  <b>Time spent here: </b>
                  {country.Years || country.Months || country.Days
                    ? getTime(country)
                    : "You have not been here yet!"}
                </div>

                <div className="border-countries">
                  <div className="border-countries-title">
                    <b>Border Countries:</b>
                  </div>
                  <div className="border-countries-list">
                    {country.borders.length
                      ? country.borders.map((border, i) => (
                          <Link to={`/country/${border}`} key={i}>
                            <button className="button border-country">
                              {border in CountryNameMapping
                                ? CountryNameMapping[border]
                                : border}
                            </button>
                          </Link>
                        ))
                      : " None"}
                  </div>
                </div>
              </div>
            </div>
          )}
          <Link to="/">
            <button className="button">{`← Back`}</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default CountryPage;
