import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class BloodGroup extends Component {
state = {
      chartData: {
        labels: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        datasets: [
          {
              label: "Blood Group Chart",
              data: [180,120,200,80,160,70,400,10],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(341, 120, 54, 0.2)',
                'rgba(700, 99, 300, 0.2)'
              ],
          }
        ]
      }
    };

  render() {
    return (
      <div>
        <h5 className="style-chart-title">Blood Group</h5>
        <Bar data={this.state.chartData} options={{}} />
      </div>
    );
  }
}
export default BloodGroup;
