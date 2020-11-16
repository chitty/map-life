import React, { useState } from "react";
import "./App.css";
import MapChart from "./components/MapChart";
import Ranking from "./components/Ranking";
import Buttons from "./components/Buttons";
import ReactTooltip from "react-tooltip";
import CSVReader from "react-csv-reader";

function App() {
  const [content, setContent] = useState("");
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("dataSet")) || []
  );
  const [topN, setTopN] = useState(5);
  const [CSVFormatError, setCSVFormatError] = useState(null);

  const loadData = (data) => {
    const valid = data.reduce((acc, row) => {
      return acc && row.time && row.ISO3 && row.time && row.name;
    }, true);
    if (valid) {
      setData(data);
      localStorage.setItem("dataSet", JSON.stringify(data));
    } else {
      setCSVFormatError(
        "Invalid format, please make sure the file has headers 'name', 'time' and 'ISO3'."
      );
    }
  };

  const papaparseOptions = {
    header: true,
  };

  return (
    <div className="container">
      <h1>Time spent by country</h1>
      {data.length > 0 ? (
        <>
          <Buttons topN={topN} setTopN={setTopN} />
          <Ranking countries={data} topN={topN} />
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
          />
          {CSVFormatError && (
            <strong className="error-msg">{CSVFormatError}</strong>
          )}
        </>
      )}
    </div>
  );
}

export default App;
