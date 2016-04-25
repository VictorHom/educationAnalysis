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

ReactDom.render(<Dashboard/>, document.getElementById("mooc_visualizations"));
