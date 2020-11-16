import React from "react";

import { CountryISOMapping } from "../data/CountryISOMapping";
import { getTime } from "../utils/getTime";

const CountryCard = ({ rank, country, totalDays }) => {
  const flag_filename = `https://flagcdn.com/w160/${CountryISOMapping[
    country.ISO3
  ].toLowerCase()}.png`;
  return (
    <div className="card">
      <i>
        #{rank} - {((100 * country.time) / totalDays).toFixed(2)}%
      </i>
      <img
        className="flag"
        src={flag_filename}
        alt={`${country.name}'s flag`}
      />
      <div className="card-container">
        <h4>
          <b>{country.name}</b>
        </h4>
        <p>{getTime(country)}</p>
      </div>
    </div>
  );
};

export default CountryCard;
