import React, { Component } from 'react';
import d3 from 'd3';

let courseCodeMap = {
  "CB22x" : 'The Ancient Greek Hero',
  "CS50x" : 'Introduction to Computer Science',
  "ER22x" : 'Justice',
  "PH207x" : 'Health in Numbers : Quantitative methods in Clinical and Public Health Research',
  "PH278x" : 'Human Health and Global Environmental Change' ,
  "14.73x" : 'The Challenges of Global Poverty',
  "6.002x" : 'Circuits and Electronics',
  "2.01x" : 'Elements of Structure',
  "3.091x" : 'Introduction to Solid State Chemistry',
  "6.00x" : 'Introduction to Computer Science and Programming',
  "7.00x" : 'Introduction to Biology',
  "8.02x" : 'Electricity and Magnetism' ,
  "8.MReV" : 'Mechanics Review'
}

// let testDivs = this.props.students.map((student,index) => {
//   return (<div key={index}>{courseCodeMap[student.CourseCode]}</div>);
// });

export default class Widgets extends React.Component {
  constructor(props) {
    super(props);
  }

  generateBar() {
    let data = this.props.students.reduce((accum, student) => {
      if (accum[courseCodeMap[student.CourseCode]]) {
        accum[courseCodeMap[student.CourseCode]] += 1;
      } else {
        accum[courseCodeMap[student.CourseCode]] = 1;
      }
      return accum;
    },{})
    let values = [];
    for (let prop in data) {
      values.push({name : prop, count : data[prop] });
    }

    var margin = {top: 20, right: 20, bottom: 60, left: 60};

    let w = 400 - margin.left - margin.right,
     h = 400 - margin.top - margin.bottom;
    let svg = d3.select('.simpleBar').append('svg')
      .attr('width', w + margin.left + margin.right)
      .attr('height', h + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    let xScale = d3.scale.ordinal()
      .domain(values.map((val) => val.count ))
      .rangeBands([0, w], 0.1, 0);

    let yScale = d3.scale.linear()
      .domain([0, d3.max(values.map(val => val.count ))])
      .range([0, h]);

    svg.selectAll('rect')
    .data(values)
    .enter()
    .append('rect')
    .style('fill', 'green')
    .attr('x', function (d, i) {
      return xScale(d.count);
    })
    .attr('y', function (d) {
      return h - yScale(d.count);
    })
    .attr('width', xScale.rangeBand())
    .attr('height', function (d) {
      return yScale(d.count);
    });

    let xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom')
      // .ticks(5)
      .tickValues(values.map( val => val.name))
      // .innerTickSize(6)
      // .outerTickSize(12)
      // .tickPadding(12);

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, '+ (h + 0) + ')')
        .call(xAxis);
  }

  componentDidMount() {}

  render() {
    this.generateBar();
    return (
      <div className="widgetContainer">
        <div className="simpleBar"></div>
      </div>
    )
  }
}
