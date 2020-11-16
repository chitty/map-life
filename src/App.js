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

  const loadData = (data) => {
    setData(data);
    localStorage.setItem("dataSet", JSON.stringify(data));
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
        </>
      )}
    </div>
  );
}

export default App;
