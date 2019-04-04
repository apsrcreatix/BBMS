import * as React from "react";
import Data from "../../Data";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Config from "src/Config";
import axios from "axios";
import MaterialTable from "material-table";
import Tooltip from '@material-ui/core/Tooltip';

const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const getKits = base_url + Config.PATHS.getKits;

const INITIAL_STATE = {
  kitsData: [],
  kitsLog: [],
  selectKit: "",
  usingKit: false,
  addingKit: false,
  passedData: ""
};

export default class Kit extends React.Component {
  state = INITIAL_STATE;

  constructor(props: any) {
    super(props);
  }

  handleChange = (name: any) => (event: any) => {
    this.setState({ [name]: event.target.value });
  };

  handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  async fetchData() {
    await axios
      .get(getKits+"?type="+this.state.selectKit, {
        auth: {
          username,
          password
        }
      })
      .then((response: any) => {
         this.setState(() => ({
          kitsData: response.data.response.stocks,
          kitsLog: response.data.response.logs
        }));
      })
      .catch(function(error: any) {
        console.log(`error in authentication : ${error}`);
      });
  }

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

    if (this.state.usingKit) {
      console.log("modal for use of kit");
    }

    if (this.state.addingKit) {
      console.log("modal for adding kit");
    }

    return (
      <div className="lookup-inputs-container container">
        <h1>Kits</h1>
        <div className="box_options">
          <TextField
            className="inputs"
            select
            label="Kits Type"
            value={this.state.selectKit}
            onChange={this.handleChange("selectKit")}
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
            {Data.KITS.map((option: any) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
        </div>
        <div className="box_buttons">
        <Tooltip title="Press apply to load data for selected kit." placement="left-start">
          <span><Button
            className="inputs"
            variant="contained"
            color="default"
            disabled={this.state.selectKit==""}
            onClick={() => this.fetchData()}
          >
            Apply
          </Button>
          </span>
        </Tooltip>
          <br />
          <Tooltip title="Press clear to reset data." placement="left-start">
          <span><Button
            className="inputs"
            variant="contained"
            color="default"
            disabled={this.state.selectKit==""}
            onClick={() => {
              this.setState(INITIAL_STATE);
            }}
          >
            Clear
          </Button>
          </span>
          </Tooltip>
          <br />
          <Tooltip title="Press Add Stock to add data for any kit." placement="left-start">
          <span><Button
            className="inputs"
            variant="contained"
            color="primary"
            onClick={() => {
              this.setState({
                  usingKit: true
              });
            }}
          >
            Add Stock
          </Button>
          </span>
          </Tooltip>
        </div>
        <div className="box_table">
          <MaterialTable
            columns={[
              { title: "Quantity", field: "quantity" },
              { title: "Type", field: "type" },
              {
                title: "Purchase Date",
                field: "purchasedDate",
                render: rowData => {
                  return humanReadableDate(rowData.purchasedDate);
                }
              },
              { title: "Blood Bank", field: "bloodBank" },
              {
                title: "Manufacturing Date",
                field: "manufacturingDate",
                render: rowData => {
                  return humanReadableDate(rowData.manufacturingDate);
                }
              },
              { title: "Manufacturer Name", field: "manufacturerName" },
              { title: "Batch Number", field: "batchNumber" },
              { title: "Expiry Date", field: "expiryDate" },
              { title: "Status", field: "status" }
            ]}
            data={this.state.kitsData}
            title="Stocks"
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Donor Data",
                onClick: (event, rowData) => {
                  this.setState({
                    passedData: rowData
                  });
                  this.handleClick(event);
                }
              }
            ]}
            options={{
              loadingType: "linear",
              pageSize: 5,
              toolbar: true,
              columnsButton: true
            }}
            localization={{
              body: {
                emptyDataSourceMessage: "Use apply to search results"
              },
              header: {
                actions: "Actions"
              }
            }}
          />
          <MaterialTable
            columns={[
              { title: "Quantity", field: "quantity" },
              { title: "Type", field: "type" },
              {
                title: "Purchase Date",
                field: "purchasedDate",
                render: rowData => {
                  return humanReadableDate(rowData.purchasedDate);
                }
              },
              { title: "Blood Bank", field: "bloodBank" },
              {
                title: "Manufacturing Date",
                field: "manufacturingDate",
                render: rowData => {
                  return humanReadableDate(rowData.manufacturingDate);
                }
              },
              { title: "Manufacturer Name", field: "manufacturerName" },
              { title: "Batch Number", field: "batchNumber" },
              { title: "Expiry Date", field: "expiryDate" },
              { title: "Status", field: "status" },
              {
                title: "Used Date",
                field: "usedDate",
                render: rowData => {
                  return humanReadableDate(rowData.manufacturingDate);
                }
              },
              { title: "Used for", field: "use" },
              { title: "Donor ID", field: "donorID" },
              { title: "Donor Name", field: "donorName" },
              { title: "Blood Group", field: "bloodGroup" },
              { title: "Rh Type", field: "rhType" },
              { title: "Patient Name", field: "patientName" },
              {
                title: "Missed Repeated Count",
                field: "missedRepeatedCount",
                type: "numeric"
              },
              { title: "Technician Name", field: "technicianName" }
            ]}
            data={this.state.kitsLog}
            title="Logs"
            options={{
              loadingType: "linear",
              pageSize: 5,
              toolbar: true,
              columnsButton: true
            }}
            localization={{
              body: {
                emptyDataSourceMessage: "Use apply to search results"
              }
            }}
          />
        </div>
      </div>
    );
  }
}
