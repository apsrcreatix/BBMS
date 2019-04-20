import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import Config from "../../../Config";

const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const session_url = base_url + Config.PATHS.getAnalytics;

class Motivator extends Component {
  state = {
    chartData: {}
  };
  componentDidMount() {
    axios.get(session_url, {
      auth: {
        username,
        password
      }
    })
      .then((response: any) => {
        let pair = response.data.response.motivators;
        let tags = [];
        let values = [];
        for (var index in pair) {
          tags.push(pair[index]._id);
          values.push(pair[index].total);
        }
        this.setState({
          chartData: {
            labels: tags,
            datasets: [{
              label: "Motovators",
              data: values,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
              ]
            }]
          }
        })
      }).catch(function (error: any) {
        console.log(`error in authentication : ${error}`);
      });
  }
  render() {
    return (
      <div>
        <h5 className="style-chart-title">Motivators</h5>
        <Bar data={this.state.chartData} options={{
          scales: {
            yAxes: [{
              display: true,
              ticks: {
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
export default Motivator;
