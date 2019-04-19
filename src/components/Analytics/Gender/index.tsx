import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

class Gender extends Component {
        state = {
            chartData: {
                labels: ["Male", "Female"],
                datasets: [{
                    data: [73, 27],
                    backgroundColor: ["#FF6384", "#36A2EB"],
                    hoverBackgroundColor: ["#FF6384", "#36A2EB"]
                }]
            }
        };
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