import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

import classes from './ManaCurve.module.css';

class ManaCurve extends Component {

  getOccurance = (array, value) => {
    return array.filter((v) => (v === value)).length;
  }

  getHighCostOccurance = (array) => {
    return array.filter((v) => (v >= 7)).length;
  }

  render() {

    const options = {
			title: {
				text: "Mana Distribution"
			},
			data: [
			{
				// Change type to "doughnut", "line", "splineArea", etc.
				type: "column",
				dataPoints: [
					{ label: "0",  y: this.getOccurance(this.props.curve, 0) },
					{ label: "1", y: this.getOccurance(this.props.curve, 1) },
					{ label: "2", y: this.getOccurance(this.props.curve, 2) },
					{ label: "3",  y: this.getOccurance(this.props.curve, 3) },
					{ label: "4",  y: this.getOccurance(this.props.curve, 4) },
          { label: "5",  y: this.getOccurance(this.props.curve, 7) },
          { label: "6",  y: this.getOccurance(this.props.curve, 6) },
          { label: "7+",  y: this.getHighCostOccurance(this.props.curve) },

				]
			}
			]
		};

    return (
      <div className={classes.ManaCurve}>
        <CanvasJSChart options={options}/>
      </div>
    );
  }
};

export default ManaCurve;
