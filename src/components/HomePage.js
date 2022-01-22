import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import CSVReader from "react-csv-reader";

import MapChart from "./MapChart";
import Ranking from "./Ranking";
import Buttons from "./Buttons";
import { SampleData } from "../data/SampleData";
import { API_URL } from "../data/Constants";
import "../App.css";
import "./HomePage.css";

const HomePage = () => {
  const [content, setContent] = useState("");
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("dataSet")) || []
  );
  const [topN, setTopN] = useState(parseInt(localStorage.getItem("topN")) || 5);
  const [CSVFormatError, setCSVFormatError] = useState(null);

  useEffect(() => {
    let dataLoaded = JSON.parse(localStorage.getItem("dataSet"));
    if (!dataLoaded || dataLoaded.length < 1) loadData(SampleData);
  }, []);

  const setTopNCountries = (num) => {
    localStorage.setItem("topN", num);
    setTopN(num);
  };

  const loadData = (data) => {
    const valid = data.reduce((acc, row) => {
      return acc && row.time && row.ISO3;
    }, true);
    if (valid) {
      const iso3 = data.reduce((acc, row) => {
        return `${acc}${row.ISO3},`;
      }, "");
      fetch(`${API_URL}?codes=${iso3}`)
        .then((res) => res.json())
        .then(
          (result) => {
            let merged = [];

            for (let i = 0; i < result.length; i++) {
              merged.push({
                ...result[i],
                ...data.find(
                  (itmInner) => itmInner.ISO3 === result[i].alpha3Code
                ),
              });
            }
            setData(merged);
            localStorage.setItem("dataSet", JSON.stringify(merged));
          },
          (error) => {
            console.log("Error fetching countries data: ", error);
            setData(data);
          }
        );
    } else {
      setCSVFormatError(
        "Invalid format, please make sure the file has headers 'time' and 'ISO3'."
      );
    }
  };

  const clearData = () => {
    localStorage.removeItem("dataSet");
    setData([]);
  };

  const papaparseOptions = {
    header: true,
  };

  return (
    <div className="container">
      <h1 className="center">Where in the world?</h1>
      {data.length > 0 ? (
        <>
          <div className="center">
            <Buttons topN={topN} setTopN={setTopNCountries} />
            <button className="button" onClick={() => clearData()}>
              New data
            </button>
            <Ranking countries={data} topN={topN} />
          </div>
          <div>
            <MapChart setTooltipContent={setContent} travelData={data} />
            <ReactTooltip>{content}</ReactTooltip>
          </div>
        </>
      ) : (
        <>
          <p>
            Let's see where in the world have you spent your life. Upload a data
            file and find out!
          </p>
          <CSVReader
            onFileLoaded={(data, fileInfo) => loadData(data, fileInfo)}
            parserOptions={papaparseOptions}
            label="Upload file"
            cssLabelClass="button upload-button"
          />
          {CSVFormatError && (
            <strong className="error-msg">{CSVFormatError}</strong>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
