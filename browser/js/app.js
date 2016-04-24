'use strict';
import '../style.scss';
import React from 'react';
import ReactDom from 'react-dom';
const Mapbox = require('mapbox');

(function(){
  L.mapbox.accessToken = 'pk.eyJ1IjoidmljdG9yaG9tIiwiYSI6ImNpanhubDJzajE1eG52Z2x6M3Foa2xndWwifQ.JgTA8hpRA2Dq_m6wSPAW2A';
  var map = L.mapbox.map('map', 'mapbox.streets', {
    zoomControl: false
  });
  L.control.zoomslider().addTo(map);
})()

var Test = React.createClass({
	render() {
		return (
			<div>
			<div>Hello Test</div>
			<div id="cube"></div>
			</div>
		);
	}
});
// add in react router;
ReactDom.render(<Test/>, document.getElementById("mooc_visualizations"));
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
