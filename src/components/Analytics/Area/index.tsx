import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import Config from "../../../Config";

const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const session_url = base_url + Config.PATHS.getAnalytics;

class Area extends Component {
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
        let pair = response.data.response.mappedRegion;
        let tags = [];
        let values = [];
        for (var index in pair) {
          tags.push(pair[index]._id);
          values.push(pair[index].total);
        }
        console.log(pair);
        console.log(tags);
        console.log(values);
        this.setState({
          chartData: {
            labels: tags,
            datasets: [{
              label: "Area",
              data: values,
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
              scaleOverride: true,
              scaleSteps: 10,
              scaleStepWidth: 50,
              scaleStartValue: 0

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
        <h5 className="style-chart-title">Area-wise Blood Donation</h5>
        <Line
          data={this.state.chartData}
        />
      </div>
    );
  }
}
export default Area;