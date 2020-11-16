import React from "react";

const Buttons = ({ topN, setTopN }) => {
  const buttons = [
    { title: "Top 3", val: 3 },
    { title: "Top 5", val: 5 },
    { title: "Top 10", val: 10 },
    { title: "Show all", val: 280 },
  ];
  return (
    <>
      {buttons.map((button, index) => (
        <button
          key={index}
          className="button"
          onClick={() => setTopN(button.val)}
          disabled={topN === button.val}
        >
          {button.title}
        </button>
      ))}
    </>
  );
};

export default Buttons;
