import * as React from "react";
import MaterialTable from "material-table";
import Divider from "@material-ui/core/Divider";
import Config from "../../../Config";
import Data from "../../Data";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddStock from './AddStocks';
const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const session_url = base_url + Config.PATHS.inputStock;

export default class InputsStock extends React.Component {
  state = {
    stockData: [],
    selectedStock: ""
  };

  async fetchData() {
    await axios
      .get(session_url + "?type=" + this.state.selectedStock, {
        auth: {
          username,
          password
        }
      })
      .then((response: any) => {
        this.setState({
          stockData: response.data.response.stocks
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
            <AddStock />
          </div>
          <Divider />
          <p>Choose to view status of data, then apply for result.</p>
          <div className="input-container">
            <div className="input-inputs">
              <TextField
                className="inputs"
                select
                label="Select Stock"
                value={this.state.selectedStock}
                onChange={this.handleChange("selectedStock")}
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
                {Data.INPUT_STOCK.map((option: any) => (
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
                disabled={this.state.selectedStock == ""}
                onClick={() => this.fetchData()}
              >
                Apply
              </Button>
            </div>
          </div>
          <div className="something-table">
            <MaterialTable
              title="Stock Data"
              columns={[
                { title: "Quantity", field: "quantity", type: "numeric" },
                { title: "Type", field: "type" },                
                { title: "Blood Bank", field: "bloodBank", type: "string" },                
                { title: "Donor Name", field: "donorName", type: "string" },
                { title: "Blood Group", field: "bloodGroup", type: "string" },
                { title: "RH Type", field: "rhType", type: "string" }
              ]}
              data={this.state.stockData}
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
