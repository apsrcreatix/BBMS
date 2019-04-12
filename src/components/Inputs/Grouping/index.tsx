import * as React from "react";
import MaterialTable from "material-table";
import Divider from "@material-ui/core/Divider";
import Config from "../../../Config";
import axios from "axios";
import Button from "@material-ui/core/Button";
import AddGrouping from './AddGrouping';

const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const session_url = base_url + Config.PATHS.inputGrouping;

export default class Grouping extends React.Component {
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
    function humanReadableDate(value: any) {
        let event = new Date(value);
        let options = {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          timezone: "Asia/Kolkata"
        };
        return event.toLocaleDateString("en-IN", options);
      }
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
                {title: "Donor ID", field: "donorID", type: "numeric"},
                {
                    title: "Date",
                    field: "date",
                    render: rowData => {
                      return humanReadableDate(rowData.date);
                    }
                },
                {title: "Anti A", field: "cellGrouping.antiA", type: "string"},
                {title: "Anti B", field: "cellGrouping.antiB", type: "string"},
                {title: "Anti AB", field: "cellGrouping.antiAB", type: "string"},
                {title: "Anti D", field: "cellGrouping.antiD", type: "string"},
                {title: "D Test", field: "dTest", type: "string"},
                {title: "a1Lectin", field: "a1Lectin", type: "string"},
                {title: "aCells", field: "serumGrouping.aCells", type: "string"},
                {title: "bCells", field: "serumGrouping.bCells", type: "string"},
                {title: "Saline", field: "serumGrouping.oCells.saline", type: "string"},
                {title: "Papain", field: "serumGrouping.oCells.papain", type: "string"},
                {
                  title: "Staff Name",
                  field: "staffName",
                  type: "string"
                },
                { title: "Blood Bank", field: "bloodBank", type: "string" },
                { title: "Donor Name", field: "donorName", type: "string" },
                { title: "Blood Group", field: "bloodGroup", type: "string" },
                { title: "RH Type", field: "rhType", type: "string" }
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
