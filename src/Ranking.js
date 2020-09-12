import React from "react";


const Ranking = ({ countries }) => {

  const totalDays = countries.reduce(function (acc, country) {
    return acc + parseInt(country.time)
  }, 0)

  return (
    <ol>
      {countries.slice(0,10).map((country, index) =>
        <li key={index}>
          {country.name}: {(100*country.time/totalDays).toFixed(2)}%
        </li>
      )}
    </ol>
  );
};

export default Ranking;
