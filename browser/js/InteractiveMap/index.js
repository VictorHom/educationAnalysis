import React, { Component } from 'react';

export default class InteractiveMap extends React.Component{


  componentDidMount() {
    L.mapbox.accessToken = 'pk.eyJ1IjoidmljdG9yaG9tIiwiYSI6ImNpanhubDJzajE1eG52Z2x6M3Foa2xndWwifQ.JgTA8hpRA2Dq_m6wSPAW2A';
    var map = L.mapbox.map('map', 'mapbox.streets', {
      zoomControl: false
    });
    L.control.zoomslider().addTo(map);
  }

  render() {
    return (
        <div id='map'></div>
    )
  }
}
