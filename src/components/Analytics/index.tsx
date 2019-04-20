import Area from "./Area";
import Blood from "./BloodGroup";
import Motivators from "./Motivators";
import Gender from "./Gender";
import Overview from "./Overview";
import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export default class AnalyticsDashboard extends React.Component {
  render() {
    return (
        <div>
             
        <div className="charts-container">
        <div className="overview-container oc">
          <Card>
            <CardContent>
              <Overview />
            </CardContent>
          </Card>
        </div>
        <div className="abd">
          <Card>
            <CardContent>
              <Area />
            </CardContent>
          </Card>
        </div>
        <div className="bg">
          <Card>
            <CardContent>
              <Blood />
            </CardContent>
          </Card>
        </div>
        <div className="awbd">
          <Card>
            <CardContent>
              <Motivators />
            </CardContent>
          </Card>
        </div>
        <div className="mfbdr">
          <Card>
            <CardContent>
              <Gender />
            </CardContent>
          </Card>
        </div>
      </div>
        </div>
      
    );
  }
}
