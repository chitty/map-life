import React from "react";
import loader from "../assets/loader.gif";

const Loading = () => {
  return (
    <div className="center">
      <img src={loader} alt="loading..." />
    </div>
  );
};

export default Loading;
