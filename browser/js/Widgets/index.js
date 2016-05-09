import React, { Component } from 'react';
import d3 from 'd3';
import chartMaker from './chart/';


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
};

let currentViz = ["simpleBar", "simpleDonut"];
let currentVizIndex = 0;
let students;

export default class Widgets extends React.Component {
  constructor(props) {
    super(props);
  }

  switchViz() {
    currentVizIndex++;
    if (currentVizIndex === currentViz.length) {
      currentVizIndex = 0;
    }
    console.log(currentVizIndex);
    var widgets = document.getElementsByClassName('widgetContainer')[0];
    var charts = widgets.getElementsByClassName('chart');
    for (let i = 0; i < charts.length; i++) {
      if (charts[i].className.includes("hideChart")){
        let currentClasses = charts[i].className;
        currentClasses = currentClasses.slice(0, currentClasses.indexOf("hideChart")) +
          currentClasses.slice(currentClasses.indexOf("hideChart")+"hideChart".length)
        charts[i].className = currentClasses.trim();
      }
      // remove hideChart everytime and add back on
      if(currentVizIndex !== i) {
        charts[i].className = charts[i].className + " hideChart";
      }
    }
    // if (currentVizIndex === 0){
    //   chartMaker.generateBar(students);
    // } else if (currentVizIndex === 1) {
    //   chartMaker.generateDonut(students);
    // }
  }

  render() {
    students = this.props.students;
    console.log(this.props.students);
    chartMaker.generateBar(this.props.students);
    chartMaker.generateDonut(this.props.students);
    return (
      <div className="widgetContainer">
        <button
          onClick=
          {
            this.switchViz
          }
        >
        NEXT
        </button>
        <div className={ "chart simpleBar" }></div>
        <div className={ "chart simpleDonut hideChart" }></div>
        {/* put in other charts like so */}
      </div>
    )
  }
}
