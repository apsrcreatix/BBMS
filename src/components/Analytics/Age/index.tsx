import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class Age extends Component {
  state = {
      chartData: {
        labels: ["18-28", "29-39", "40-50", "51-61", "62-72", "73+"],
        datasets: [
          {
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            label: "Age groups",
            data: [65, 53, 40, 18, 9, 2]
          }
        ]
      }
    };
  render() {
    return (
      <div>
        <h1>Age-wise Blood Donation</h1>
        <Line
          data={this.state.chartData}
        />
      </div>
    );
  }
}
export default Age;
