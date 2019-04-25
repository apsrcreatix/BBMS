import * as React from "react";
import MaterialTable from "material-table";
import Divider from "@material-ui/core/Divider";
import Config from "../../../Config";
import axios from "axios";
import Button from "@material-ui/core/Button";
import AddGrouping from './AddPG';

const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const session_url = base_url + Config.PATHS.outputPG;

export default class PatientGrouping extends React.Component {
  constructor(props: any){
    super(props);
    axios
    .get(session_url, {
      auth: {
        username,
        password
      }
    })
    .then((response: any) => {
      this.setState({
        groupingData: response.data.response.tests
      });
      console.log(this.state.groupingData+""+response.data.response.success);
    })
    .catch(function(error: any) {
      console.log(`error in authentication : ${error}`);
    });
  }
  state = {
    groupingData: []
    };

  async fetchData() {
    await axios
      .get(session_url, {
        auth: {
          username,
          password
        }
      })
      .then((response: any) => {
        this.setState({
          groupingData: response.data.response.stocks
        });
        console.log(this.state.groupingData+""+response.data.response.success);
      })
      .catch(function(error: any) {
        console.log(`error in authentication : ${error}`);
      });
  }
  handleChange = (name: any) => (event: any) => {
    this.setState({ [name]: event.target.value });
  };
  render() {
    return (
      <div>
        <div>
          <div>
            <AddGrouping />
          </div>
          <Divider />
          <div className="input-container">
            <div className="input-inputs">
  <p>Please press refresh button to view latest uploaded data.</p>
            </div>
            <div className="input-buttons">
              <Button
                className="inputs"
                variant="contained"
                color="default"
                onClick={() => this.fetchData()}
              >
                Refresh
              </Button>
            </div>
          </div>
          <div className="something-table">
            <MaterialTable
              title="Grouping Data"
              columns={[
                { title: "Blood Bank", field: "bloodBank", type: "string" },
                { title: "Patient", field: "patient", type: "string" },
                { title: "Age", field: "age", type: "string"},
                { title: "Sex", field: "sex", type: "string"},
                { title: "Blood Group", field: "bloodGroup", type: "string"},
                { title: "RH Type", field: "rhType", type: "string" },
                {title: "Anti A", field: "cells.antiA", type: "string"},
                {title: "Anti B", field: "cells.antiB", type: "string"},
                {title: "Anti AB", field: "cells.antiAB", type: "string"},
                {title: "Anti D", field: "cells.antiD", type: "string"},
                {title: "D Test", field: "dTest", type: "string"},
                {title: "a1Lectin", field: "a1Lectin", type: "string"},
                {title: "aCells", field: "serum.aCells", type: "string"},
                {title: "bCells", field: "serum.bCells", type: "string"},
                {title: "Saline", field: "serum.oCells.saline", type: "string"},
                {title: "Papain", field: "serum.oCells.papain", type: "string"},
                {
                  title: "Staff Name",
                  field: "staffName",
                  type: "string"
                }
            ]} 
              data={this.state.groupingData}
              options={{
                loadingType: "linear",
                pageSize: 5,
                toolbar: true,
                columnsButton: true
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
