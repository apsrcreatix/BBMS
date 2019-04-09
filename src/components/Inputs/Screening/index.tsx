import * as React from "react";
import MaterialTable from "material-table";
import Divider from "@material-ui/core/Divider";
import Config from "../../../Config";
import Data from "../../Data";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddScreening from "./AddScreening";
const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const session_url = base_url + Config.PATHS.inputBlood;

export default class InputsScreening extends React.Component {
  state = {
    screeningData: [],
    selectedScreening: ""
  };

  async fetchData() {
    await axios
      .get(session_url + "?type=" + this.state.selectedScreening, {
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
    return (
      <div>
        <div>
          <div>
            <AddScreening />
          </div>
          <Divider />
          <p>Choose to view status of data, then apply for result.</p>
          <div className="input-container">
            <div className="input-inputs">
              <TextField
                className="inputs"
                select
                label="Screening"
                value={this.state.selectedScreening}
                onChange={this.handleChange("selectedScreening")}
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
                {Data.DONOR_ID.map((option: any) => (
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
                disabled={this.state.selectedScreening == ""}
                onClick={() => this.fetchData()}
              >
                Apply
              </Button>
            </div>
          </div>
          <div className="something-table">
            <MaterialTable
              title="Screening Data"
              columns={[
                {title: "Donor ID", field: "donorID", type: "numeric"},
                {
                  title: "Staff Name",
                  field: "staffName",
                  type: "string"
                },
                { title: "HIV 12", field: "hiv12", type: "string" },
                { title: "HSBAG", field: "hsbag", type: "string" },
                { title: "HCV", field: "hcv", type: "string" },
                { title: "VDRL", field: "vdrl", type: "string" },
                { title: "Malarial Parasite", field: "malarialParasite", type: "string" },
                { title: "Micro Filaria", field: "microFilaria", type: "string" },
                { title: "Staff Name", field: "staffName", type: "string" },
                { title: "Blood Bank", field: "bloodBank", type: "string" },
                { title: "Donor Name", field: "donorName", type: "string" },
                { title: "Blood Group", field: "bloodGroup", type: "string" },
                { title: "RH Type", field: "rhType", type: "string" }
              ]}
              data={this.state.screeningData}
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
