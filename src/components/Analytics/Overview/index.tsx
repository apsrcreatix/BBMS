import React from "react";
import axios from "axios";
import Config from "../../../Config";

const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const gettingTotalDonors = base_url + Config.PATHS.getTotalDonors;
const gettingAnalytics = base_url + Config.PATHS.getAnalytics;

export default class Overview extends React.Component {
    state = {
        totalCount: "loading",
        totalMotivators: "loading",
        totalFemale: "loading",
        totalMale: "loading"
    };
    componentDidMount(){
    axios.get(gettingTotalDonors, {
          auth: {
            username,
            password
          }
        })
        .then((response: any) => {
            this.setState({totalCount:response.data.response});
        })
        axios.get(gettingAnalytics, {
            auth: {
              username,
              password
            }
          })
          .then((response: any) => {
              this.setState({
                  totalMale:response.data.response.gender.male,
                  totalFemale: response.data.response.gender.femaleCount,
                  totalMotivators: response.data.response.motivators.length
                });
          })
    }
    render(){
        return(
            <div>
                <h5 className="style-chart-title">Overview</h5>
                <div style={{backgroundColor: '#2C3A47',boxShadow: '0 3px 5px 2px rgba(44, 58, 71,0.3)'}} className="overview-cards">
                    <span style={{
                        fontSize: '3rem',fontWeight: 'bolder'
                    }}>{this.state.totalCount}</span>
                    <p>Total number of donors available for donation</p>
                </div>
                <div style={{backgroundColor: '#B33771',boxShadow: '0 3px 5px 2px rgba(179, 55, 113,0.3)'}} className="overview-cards">
                    <span style={{
                        fontSize: '3rem',fontWeight: 'bolder'
                    }}>{this.state.totalMotivators}</span>
                    <p>Total number of Motivators available for donation</p>
                </div>
                <div style={{backgroundColor: '#EAB543',boxShadow: '0 3px 5px 2px rgba(234, 181, 67,0.3)'}} className="overview-cards">
                    <span style={{
                        fontSize: '3rem',fontWeight: 'bolder'
                    }}>{this.state.totalMale}</span>
                    <p>Total number of male available for donation</p>
                </div>
                <div style={{backgroundColor: '#82589F',boxShadow: '0 3px 5px 2px rgba(130, 88, 159,0.3)'}} className="overview-cards">
                    <span style={{
                        fontSize: '3rem',fontWeight: 'bolder'
                    }}>{this.state.totalFemale}</span>
                    <p>Total number of female available for donation</p>
                </div>
            </div>
        ) 
    }
}