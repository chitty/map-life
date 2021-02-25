import React from "react";
import { Link } from "react-router-dom";

import { CountryISOMapping } from "../data/CountryISOMapping";
import { getTime } from "../utils/getTime";
import "../App.css";

const CountryCard = ({ rank, country, totalDays }) => {
  const flag_filename = `https://flagcdn.com/h240/${CountryISOMapping[
    country.ISO3
  ].toLowerCase()}.png`;
  return (
    <Link
      to={`/${country.ISO3}`}
      onClick={() =>
        localStorage.setItem(country.ISO3, JSON.stringify(country))
      }
    >
      <div className="card">
        <div className="flag-container">
          <img
            className="flag"
            src={flag_filename}
            alt={`${country.name}'s flag`}
          />
        </div>
        <div className="card-container">
          <h4>
            <b>
              {rank}. {country.name}
            </b>
          </h4>

          <div className="card-detail">
            <b>Region:</b> {country.region}
          </div>
          <div className="card-detail">
            <b>Capital:</b> {country.capital}
          </div>
          <div className="card-detail">
            <b>Time: </b>
            {getTime(country)}
          </div>
          <div className="percentage">
            That's {((100 * country.time) / totalDays).toFixed(2)}% of your life
            here!
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
