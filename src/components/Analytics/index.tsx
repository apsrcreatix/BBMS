import Age from './Age';
import Blood from './BloodGroup';
import Areawise from './AreaWise';
import Gender from './Gender';
import * as React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


export default class AnalyticsDashboard extends React.Component{
    
    render(){
        return (
            <div className="charts-container">
                <div><Card><CardContent><Age/></CardContent></Card></div>
                <div><Card><CardContent><Blood/></CardContent></Card></div>
                <div><Card><CardContent><Areawise/></CardContent></Card></div>
                <div><Card><CardContent><Gender/></CardContent></Card></div>
            </div>
        );
    }
}