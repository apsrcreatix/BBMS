import * as React from "react";
import MaterialTable from "material-table";
import Divider from "@material-ui/core/Divider";
import Config from "../../../Config";
import Data from "../../Data";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddBlood from "./AddBlood";
const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const session_url = base_url + Config.PATHS.inputBlood;

export default class InputsBlood extends React.Component {
  state = {
    bloodData: [],
    selectedBlood: ""
  };

  async fetchData() {
    await axios
      .get(session_url + "?type=" + this.state.selectedBlood, {
        auth: {
          username,
          password
        }
      })
      .then((response: any) => {
        this.setState({
          bloodData: response.data.response.stocks
        });
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
            <AddBlood />
          </div>
          <Divider />
          <p>Choose to view status of data, then apply for result.</p>
          <div className="input-container">
            <div className="input-inputs">
              <TextField
                className="inputs"
                select
                label="Select Blood"
                value={this.state.selectedBlood}
                onChange={this.handleChange("selectedBlood")}
                SelectProps={{
                  native: true
                }}
                InputLabelProps={{
                  shrink: true
                }}
                required
                helperText="Choose one before apply"
                margin="normal"
              >
                <option value="">Select a type</option>
                {Data.INPUT_BLOOD.map((option: any) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
            </div>
            <div className="input-buttons">
              <Button
                className="inputs"
                variant="contained"
                color="default"
                disabled={this.state.selectedBlood == ""}
                onClick={() => this.fetchData()}
              >
                Apply
              </Button>
            </div>
          </div>
          <div className="something-table">
            <MaterialTable
              title="Blood Data"
              columns={[
                { title: "Quantity", field: "quantity", type: "numeric" },
                { title: "Type", field: "type" },
                {
                  title: "Hospital Name",
                  field: "hospitalName",
                  type: "string"
                },
                { title: "Blood Bank", field: "bloodBank", type: "string" },
                {
                  title: "Issue Date",
                  field: "issuedDate",
                  render: rowData => {
                    return humanReadableDate(rowData.issuedDate);
                  }
                },
                {
                  title: "Expiry Date",
                  field: "expiryDate",
                  render: rowData => {
                    return humanReadableDate(rowData.expiryDate);
                  }
                },
                {
                  title: "Collection Date",
                  field: "collectionDate",
                  render: rowData => {
                    return humanReadableDate(rowData.collectionDate);
                  }
                },
                { title: "Donor Name", field: "donorName", type: "string" },
                { title: "Blood Group", field: "bloodGroup", type: "string" },
                { title: "RH Type", field: "rhType", type: "string" }
              ]}
              data={this.state.bloodData}
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
