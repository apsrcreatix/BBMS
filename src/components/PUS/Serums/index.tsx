import * as React from "react";
import Data from "../../Data";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Config from "src/Config";
import axios from "axios";
import MaterialTable from "material-table";
import Tooltip from '@material-ui/core/Tooltip';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UseSerum from './UseSerum';
import AddSerum from './AddSerum';


const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const getSerums = base_url + Config.PATHS.getSerums;

const INITIAL_STATE = {
  serumsData: [],
  serumsLog: [],
  selectSerum: "",
  usingSerum: false,
  addingSerum: false,
  passedData: {},
  anchorEl: null,
};

export default class Serums extends React.Component {
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
  handleClickOpen = () => {
    this.setState({ usingSerum: true});
  };
  handleCloseUseSerum = () => {
    this.setState({ usingSerum: false});
  }
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  async fetchData() {
    await axios
      .get(getSerums+"?type="+this.state.selectSerum, {
        auth: {
          username,
          password
        }
      })
      .then((response: any) => {
         this.setState(() => ({
          serumsData: response.data.response.stocks,
          serumsLog: response.data.response.logs
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

    if (this.state.usingSerum) {
      console.log("modal for use of serum");
    }

    if (this.state.addingSerum) {
      console.log("modal for adding serum");
    }

    const { anchorEl } = this.state;
    
    return (
      <Router>
      <div className="lookup-inputs-container container">
       <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
         
          <Link key={99} to={"/serums/use"} >
          <MenuItem
            onClick={() =>
              this.setState({
                usingSerum: true
              })
            }
          >
            Edit
          </MenuItem>
          </Link>
        </Menu>
        <h1>Serums</h1>
        <div className="box_options">
          <TextField
            className="inputs"
            select
            label="Serum's Type"
            value={this.state.selectSerum}
            onChange={this.handleChange("selectSerum")}
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
            {Data.SERUMS.map((option: any) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
        </div>
        <div className="box_buttons">
        <Tooltip title="Press apply to load data for selected serum." placement="left-start">
          <span><Button
            className="inputs"
            variant="contained"
            color="default"
            disabled={this.state.selectSerum==""}
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
            disabled={this.state.selectSerum==""}
            onClick={() => {
              this.setState(INITIAL_STATE);
            }}
          >
            Clear
          </Button>
          </span>
          </Tooltip>
          <br />
          <Tooltip title="Press Add Stock to add data for any serum." placement="left-start">
          <span>
          <Link key={98} to={"/serums/add"}>
          <Button
            className="inputs"
            variant="contained"
            color="primary"
            disabled={this.state.selectSerum==""}
            onClick={() => {
              this.setState({
                  addingSerum: true
              });
            }}
          >
            Add Stock
            
          </Button>
          </Link>
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
            data={this.state.serumsData}
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
            data={this.state.serumsLog}
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
        <Route
                key={99}
                exact={true}
                path={`/serums/use`}
                component={() => <UseSerum open={this.state.usingSerum} passed={this.state.passedData} onClose={this.handleCloseUseSerum}/>}
        />
        <Route
                key={98}
                exact={true}
                path={`/serums/add`}
                component={() => <AddSerum open={this.state.addingSerum} type={this.state.selectSerum} onClose={this.handleCloseUseSerum}/>}
        />
  
      </div>
      </Router>
    );
  }
}

