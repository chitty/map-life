import React from "react";
import ContryCard from "./CountryCard";

const Ranking = ({ countries, topN }) => {
  const totalDays = countries.reduce(function (acc, country) {
    return acc + parseInt(country.time);
  }, 0);

  return (
    <div className="flex-container">
      {countries.slice(0, topN).map((country, index) => (
        <ContryCard key={index} rank={index+1} country={country} totalDays={totalDays} />
      ))}
    </div>
  );
};

export default Ranking;
