import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import CountryPage from "./components/CountryPage";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/country/:iso3">
          <CountryPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
