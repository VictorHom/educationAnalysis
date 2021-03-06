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

const generateBar = (students) => {
  let data = students.reduce((accum, student) => {
    if (accum[student.CourseCode]) {
      accum[student.CourseCode] += 1;
    } else {
      accum[student.CourseCode] = 1;
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
    .rangeBands([0, w], 0.1, 2);

  let xScaleCategory = d3.scale.ordinal()
    .domain(values.map((val) => val.name ))
    .rangeBands([0, w], 0.1, 2);

  let yScale = d3.scale.linear()
    .domain([0, d3.max(values.map(val => val.count ))])
    .range([0, h]);

  let yScaleAxis = d3.scale.linear()
    .domain([0, d3.max(values.map(val => val.count ))])
    .range([h, 0]);

  svg.selectAll('rect')
  .data(values)
  .enter()
  .append('rect')
  .style('fill', 'steelblue')
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
    .scale(xScaleCategory)
    .orient('bottom');

  let yAxis = d3.svg.axis()
    .scale(yScaleAxis)
    .orient('left');

  svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0, '+ (h + 0) + ')')
    .call(xAxis)
    .selectAll("text")
    .attr("y", 5)
    .attr("x", 9)
    .attr("dy", ".20em")
    .attr("transform", "rotate(45)")
    .style("text-anchor", "start");

  svg.append('g')
    .attr('class', 'y axis')
    // .attr('transform', 'translate('  + w + ',0' + ')')
    .call(yAxis);
}

const generateDonut = (students) => {
  let innerWidth = 75;
  let h = 300, w = 300;
  let radius = Math.min(w, h) /2;
  let color = d3.scale.category20b();


  let dataset = students.reduce((acc, student) => {
      if (acc[student.gender]) {
        acc[student.gender] += 1
      } else {
        if (student.gender === ""){
          if (acc["NA"]) {
            acc["NA"] += 1;
            return acc;
          } else {
            acc["NA"] = 1;
            return acc;
          }
        }
        acc[student.gender] = 1;
      }
      return acc;
  }, {});
  let data = [];
  for (var genderKey in dataset) {
    data.push({label : genderKey, count : dataset[genderKey], enabled : true});
  }

  let svg = d3.select(".simpleDonut")
    .append('svg')
    .attr('width', w)
    .attr('height', h)
    .append('g')
    // check after to see if you need to translate
    .attr('transform', 'translate(' + (w / 2) +  ',' + (h / 2) + ')');


    // need to transform the student data into the right format
    let arc = d3.svg.arc()
      .innerRadius(radius - innerWidth).outerRadius(radius); //draws circle
    let pie = d3.layout.pie()
      .value(function(d) {return d.count }) // this is incorrect
      .sort(null);
    //draws out the dividing segments

    let path = svg.selectAll('path')
      .data(pie(data))
      .enter()
      .append("path")
      .attr('d', arc)
      .attr('fill', function(d, i) {
        return color(d.data.label);
      })
      .each(function(d) { this._current = d; });

    let legendRectSize = 18;
    let legendSpacing = 4;
    let legend = svg.selectAll('.legend')
      .data(color.domain())
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', function(d,i) {
        let height = legendRectSize + legendSpacing;
        let offset = height * color.domain().length/2;
        let horz = -2 * legendRectSize;
        let vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
      });
    legend.append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', color)
      .style('stroke', color)
      .on('click', function(label) {
        let rect = d3.select(this);
          let enabled = true;
          let totalEnabled = d3.sum(data.map(function(d) {
            return (d.enabled) ? 1 : 0;
          }));

          if (rect.attr('class') === 'disabled') {
            rect.attr('class', '');
          } else {
            if (totalEnabled < 2) return;
            rect.attr('class', 'disabled');
            enabled = false;
          }

          pie.value(function(d) {
            if (d.label === label) d.enabled = enabled;
            return (d.enabled) ? d.count : 0;
          });

          path = path.data(pie(data));

          path.transition()
            .duration(750)
            .attrTween('d', function(d) {
              let interpolate = d3.interpolate(this._current, d);
              this._current = interpolate(0);
              return function(t) {
                return arc(interpolate(t));
              };
            });
      });
    legend.append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - 2)
      .text(function(d){ return d.toUpperCase(); });

    let tooltip = d3.select('.simpleDonut')
      .append('div')
      .attr('class', 'tooltip');

    tooltip.append('div')
      .attr('class', 'label');

    tooltip.append('div')
      .attr('class', 'count');

    tooltip.append('div')
      .attr('class', 'percent');

    path.on('mouseover', function(d) {
      let total = d3.sum(data.map(function(d) {
        return (d.enabled) ? d.count : 0;
      }));
      let percent = Math.round(1000 * d.data.count / total) / 10;
      tooltip.select('.label').html(d.data.label);
      tooltip.select('.count').html(d.data.count);
      tooltip.select('.percent').html(percent + '%');
      tooltip.style('display', 'block');
    });

    path.on('mouseout', function(d) {
      tooltip.style('display', 'none');
    });

    path.on('mousemove', function(d) {
      tooltip.style('top', (d3.event.layerY + 10) + 'px')
        .style('left', (d3.event.layerX + 10) + 'px');
    });
}

const chartMaker = {
  generateBar : generateBar,
  generateDonut : generateDonut
}

module.exports = chartMaker;
