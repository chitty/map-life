import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CountryPage from "./components/CountryPage";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/country/:iso3" element={<CountryPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
