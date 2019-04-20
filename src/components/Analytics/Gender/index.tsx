import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import Config from "../../../Config";

const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const session_url = base_url + Config.PATHS.getAnalytics;

class Gender extends Component {
        state = {
            chartData: {}
        };
        componentDidMount(){
            axios.get(session_url, {
                auth: {
                  username,
                  password
                }
              })
              .then((response: any) => {
                let pair = response.data.response.gender;  
                let tags = []; 
                let values = [];
                for(var key in pair){
                    tags.push(key);
                    values.push(pair[key]);
                    }
                this.setState({
                    chartData:  {
                        labels: ["Male", "Female"],
                        datasets: [{
                            data: values,
                            backgroundColor: ["#FF6384", "#36A2EB"],
                            hoverBackgroundColor: ["#FF6384", "#36A2EB"]
                        }]
                    }
                })                
              }).catch(function(error: any) {
                console.log(`error in authentication : ${error}`);
              });
        }
    render() {
        return (
            <div>
                <h5 className="style-chart-title"> Male / Female Blood Donation Ratio </h5>
                <Pie data={this.state.chartData}
                    options={
                        {
                            animation: {
                                animateScale: true
                            }
                        }
                    }
                /> </div >
        );
    }
}

export default Gender;