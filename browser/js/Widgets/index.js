import React, { Component } from 'react';
import d3 from 'd3';
import chartMaker from './barchart/';


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


export default class Widgets extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    chartMaker.generateBar(this.props.students);
    return (
      <div className="widgetContainer">
        <div className="simpleBar"></div>
        <div className="simplePie"></div>
        {/* put in other charts like so */}
      </div>
    )
  }
}
