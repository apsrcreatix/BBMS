import React from "react";
import axios from "axios";
import Config from "../../../Config";

const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const session_url = base_url + Config.PATHS.getTotalDonors;

export default class Overview extends React.Component {
    state = {
        totalCount: "loading"
    };
    componentDidMount(){
    axios.get(session_url, {
          auth: {
            username,
            password
          }
        })
        .then((response: any) => {
            this.setState({totalCount:response.data.response});
        })
    }
    render(){
        return(
            <div>
                <h5 className="style-chart-title">Overview</h5>
                <div className="overview-cards">    
                <span style={{fontSize: '4rem'}}>{this.state.totalCount}</span>
                <p>Total number of donors available for donation</p>
                </div>
            </div>
        ) 
    }
}