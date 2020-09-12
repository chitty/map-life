import React, { useState } from 'react';
import './App.css';
import MapChart from "./MapChart";
import Ranking from "./Ranking";
import ReactTooltip from "react-tooltip";
import CSVReader from 'react-csv-reader'

function App() {
  const [content, setContent] = useState("")
  const [data, setData] = useState(JSON.parse(localStorage.getItem('dataSet')) || []);

  const loadData = (data) => {
    setData(data)
    localStorage.setItem('dataSet', JSON.stringify(data));
  }

  const papaparseOptions = {
    header: true,
  }

  return (
    <>
      <h1>Time by country</h1>
      <CSVReader onFileLoaded={(data, fileInfo) => loadData(data, fileInfo)} parserOptions={papaparseOptions}/>
      <div className="flex-container">
        <div style={{flexGrow: 8}}>
          <MapChart setTooltipContent={setContent} travelData={data} />
          <ReactTooltip>{content}</ReactTooltip>
        </div>
        <div style={{flexGrow: 1}}>
          {data && <Ranking countries={data} />}
        </div> 
      </div>
    </>
  );
}

export default App;
