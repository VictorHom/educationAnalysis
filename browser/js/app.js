'use strict';
import '../style.scss';
import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import InteractiveMap from './InteractiveMap/';
import Widgets from './Widgets/'

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      students : []
    }
  }

  componentDidMount() {
    axios.get('/api/students')
    .then( students => {
      this.setState({students : students.data});
      console.log("in axios")
      console.log(this.state.students);
    });
  }

	render() {
		return (
			<div className="container">
        <InteractiveMap students={this.state.students} />
        <Widgets students={this.state.students} />
			</div>
		);
	}
};
// add in react router;
ReactDom.render(<Dashboard/>, document.getElementById("mooc_visualizations"));
// window.app = angular.module('edv', ['ui.router']);
//
// app.config(function ($urlRouterProvider, $locationProvider) {
//     // This turns off hashbang urls (/#about) and changes it to something normal (/about)
//     $locationProvider.html5Mode(true);
//     // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
//     $urlRouterProvider.otherwise('/');
//     // Trigger page refresh when accessing an OAuth route
//     // $urlRouterProvider.when('/auth/:provider', function () {
//     //     window.location.reload();
//     // });
// });
