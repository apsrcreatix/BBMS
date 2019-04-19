import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class Area extends Component {
    state = {
      chartData: {
        labels: ["Area 1","Area 2","Area 3","Area 4","Area 5"],
        datasets: [
          {
              label: "Area-wise Blood Donation",
              data: [180,120,200,100,160],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
              ],
          }
        ]
      }
    };
  render() {
    return (
      <div>
        <h5 className="style-chart-title">Area-wise Blood Donation</h5>
        <Bar data={this.state.chartData} options={{
            scales:{
                yAxes:[{
                    display:true,
                    ticks:{
                        suggestedMax: 220,
                        suggestedMin: 80,
                    }
                }]
            }
        }} />
      </div>
    );
  }
}
export default Area;
