import React, { useEffect } from "react";
import * as d3 from "d3";
import moment from 'moment';

const createLineChart = async (props) => {

  const { lineData } = props
  const parseDate = d3.timeParse('%Y-%m-%d');
  // const parseDate = d3.timeParse('%Y-%m-%dT%H:%M:%SZ');

  const margin = { top: 20, right: 50, bottom: 30, left: 150 },
    width = 960 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  const activeline = d3
    .line()
    .x(function (d) {
      return x(d.date);
    })
    .y(function (d) {
      return y(d.active);
    });

  const deathline = d3
    .line()
    .x(function (d) {
      return x(d.date);
    })
    .y(function (d) {
      return y(d.value);
    });

  const recoveredline = d3
    .line()
    .x(function (d) {
      console.log("d.date",d.date)
      return x(d.date);
    })
    .y(function (d) {
      console.log("recovered",d.recovered)
      return y(d.recovered);
    });

  


  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


  function parseData(data) {
    var arr = [];
    for (var i = 0; i < data.length; ++i) {
      arr.push({
        date: moment(data[i].Date).format('YYYY-MM-DD'), //date            
        value: +data[i].Deaths, //convert string to number  
        recovered: +data[i].Recovered, //convert string to number  
        active: +data[i].Active, //convert string to number  
      });
    }
    return arr;
  }

  const data = parseData(lineData);

  data.forEach(function (d) {
    d.value = +d.value;
    d.recovered = +d.recovered;
    d.active = +d.active;
  });

  x.domain(
    d3.extent(data, function (d) {
      d.date = parseDate(d.date)
      return d.date;
    })
  );

  y.domain([
    0,
    d3.max(data, function (d) {
      return d.active;
    })
  ]);

  svg.append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", activeline)
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5);

  svg.append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", deathline)
    .attr("stroke", "red")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5);

  svg.append("path").data([data])
    .attr("class", "line")
    .attr("d", recoveredline)
    .attr("stroke", "green")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5);



  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .append("text")
    .attr("fill", "#fff")
    .attr("x", `${width}`)
    .attr("y", -20)
    .attr("dy", "0.8em")
    .attr("text-anchor", "end")
    .text("Date");
    // .select(".domain")
    // .remove();

  svg.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("fill", "#fff")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.8em")
    .attr("text-anchor", "end")
    .text("No. of patients");

  // d3.selectAll("svg > *").remove();
};

export default function LineChart(props) {
  useEffect(() => {
    createLineChart(props);
  }, [props]);

  return (
    <div className="container">
      <style>{`
        .line {
          fill: none;
        }
      `}</style>
    </div>
  );
}