import React, { useEffect } from "react";
import * as d3 from "d3";

const createLineChart = async (props) => {

  const { lineData } = props
  const parseDate = d3.timeParse('%Y-%m-%dT%H:%M:%SZ');

  const margin = { top: 20, right: 20, bottom: 30, left: 50 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  const valueline = d3
    .line()
    .x(function (d) {
      d.Date = parseDate(d.Date)      
      return x(d.Date);
    })
    .y(function (d) {
      return y(d.Deaths);
    });


  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const data = lineData;
  data.forEach(function (d) {
    d.Deaths = +d.Deaths;
  });

  x.domain(
    d3.extent(data, function (d) {
      d.Date = parseDate(d.Date)
      return d.Date;
    })
  );

  y.domain([
    0,
    d3.max(data, function (d) {
      return d.Deaths;
    })
  ]);


  svg.append("path").data([data]).attr("class", "line").attr("d", valueline);

  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  svg.append("g").call(d3.axisLeft(y));
};

export default function LineChart(props) {
  useEffect(() => {
    createLineChart(props);
  }, [props]);

  return (
    <div className="App">
      <style>{`
        .line {
          fill: none;
          stroke: green;
          stroke-width: 5px;
        }
      `}</style>
    </div>
  );
}