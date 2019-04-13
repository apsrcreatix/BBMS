import Age from './Age';
import Blood from './BloodGroup';
import Areawise from './AreaWise';
import Gender from './Gender';
import * as React from "react";

export default class AnalyticsDashboard extends React.Component{
    
    render(){
        return (
            <div className="charts-container container">
                <div><Age/></div>
                <div><Blood/></div>
                <div><Areawise/></div>
                <div><Gender/></div>
            </div>
        );
    }
}