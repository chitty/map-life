import React, { memo } from "react";
import { scaleLinear } from "d3-scale";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { getTime } from "../utils/getTime"

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-50m-simplified.json";

const colorScale = scaleLinear()
  .domain([0, 30, 100, 500, 7800])
  .range(["#ffece8", "#ff9280", "#ff5233", "#ff2700", "#47002e"]);

const MapChart = ({ setTooltipContent, travelData }) => {
  const createTooltipContent = (countryName, data) => {
    return `${countryName}:${getTime(data)}`;
  };

  return (
    <>
      <ComposableMap
        width={400}
        height={200}
        data-tip=""
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 80,
        }}
      >
        <Geographies geography={geoUrl} stroke="#FFFFFF" strokeWidth={0.2}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const row = travelData.find(
                (s) => s.ISO3 === geo.properties.ISO_A3
              );
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={row ? colorScale(row["time"]) : "#B8B8B8"}
                  onMouseEnter={() => {
                    const { NAME } = geo.properties;
                    setTooltipContent(createTooltipContent(NAME, row));
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    hover: {
                      fill: "#F53",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
