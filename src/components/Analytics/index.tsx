import Age from "./Age";
import Blood from "./BloodGroup";
import Areawise from "./AreaWise";
import Gender from "./Gender";
import Overview from "./Overview";
import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export default class AnalyticsDashboard extends React.Component {
  render() {
    return (
        <div>
              <div className="overview-container">
          
          <Card>
            <CardContent>
              <Overview />
            </CardContent>
          </Card>
        </div>
        <div className="charts-container">
      
        <div>
          <Card>
            <CardContent>
              <Age />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardContent>
              <Blood />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardContent>
              <Areawise />
            </CardContent>
          </Card>
        </div>
        <div>
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
