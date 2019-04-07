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
import UseBloodBag from './UseBloodBag';
import AddBloodBag from './AddBloodBag';
import MySnackbar from "../../MySnackbar";
import Snackbar from '@material-ui/core/Snackbar';

const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const getBloodBags = base_url + Config.PATHS.getBloodBags;

export default class BloodBags extends React.Component {
  state = {
    bloodBagsData: [],
    bloodBagsLog: [],
    selectBloodBag: "",
    usingBloodBag: false,
    addingBloodBag: false,
    passedData: {},
    anchorEl: null,
    failed: false,
    errortext:"",
    currentData:""
  };

  constructor(props: any) {
    super(props);
  }

  handleChange = (name: any) => (event: any) => {
    this.setState({ [name]: event.target.value });
  };

  handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleCloseUseBloodBag = () => {
    this.setState({ usingBloodBag: false});
  }
  handleCloseAddBloodBag = () => {
    this.setState({ addingBloodBag: false});
  }
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSnackbar=(event:any,reason:any)=>{
    if(reason === 'clickaway') return;
    this.setState({
      failed: false
    });
  }

  async fetchData() {
    await axios
      .get(getBloodBags+"?type="+this.state.selectBloodBag, {
        auth: {
          username,
          password
        }
      })
      .then((response: any) => {
        if(response.data.success==true 
          && 
          response.data.response.stocks.toString()!=""){
         this.setState(() => ({
          bloodBagsData: response.data.response.stocks,
          bloodBagsLog: response.data.response.logs,
          currentData:this.state.selectBloodBag
        }));
      }else{
          this.setState(
            {
              failed:true,
              errortext: "No data found!"
            }
          );
        }
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
         
          <Link key={99} to={"/bloodbags/use"} >
          <MenuItem
            onClick={() =>
              this.setState({
                usingBloodBag: true
              })
            }
          >
            Edit
          </MenuItem>
          </Link>
        </Menu>
        <h1>BloodBags</h1>
        <div className="box_options">
          <TextField
            className="inputs"
            select
            label="BloodBag's Type"
            value={this.state.selectBloodBag}
            onChange={this.handleChange("selectBloodBag")}
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
            {Data.BLOOD_BAG.map((option: any) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
          <h4 style={{color:'darkblue'}}>The given data is about {(this.state.currentData!="")?this.state.currentData:"selected bloodbag"}, please select above and apply for any other.</h4>
        </div>
        <div className="box_buttons">
        <Tooltip title="Press apply to load data for selected bloodbag." placement="left-start">
          <span><Button
            className="inputs"
            variant="contained"
            color="default"
            disabled={this.state.selectBloodBag==""}
            onClick={() => this.fetchData()}
          >
            Apply
          
          </Button>
          </span>
        </Tooltip>
          <br />
          <Tooltip title="Press Add Stock to add data for any bllodbag." placement="left-start">
          <span>
          <Link key={98} to={"/bloodbags/add"}>
          <Button
            className="inputs"
            variant="contained"
            color="primary"
            disabled={this.state.selectBloodBag==""}
            onClick={() => {
              this.setState({
                  addingBloodBag: true
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
        <h4 style={{color:'maroon'}}>Please click apply after adding or using the data to refresh the data.</h4>
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
            data={this.state.bloodBagsData}
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
          <br/>
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
            data={this.state.bloodBagsLog}
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
                path={`/bloodbags/use`}
                component={() => <UseBloodBag open={this.state.usingBloodBag} passed={this.state.passedData} onClose={this.handleCloseUseBloodBag}/>}
        />
        <Route
                key={98}
                exact={true}
                path={`/bloodbags/add`}
                component={() => <AddBloodBag open={this.state.addingBloodBag} type={this.state.selectBloodBag} onClose={this.handleCloseAddBloodBag}/>}
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.failed}
          autoHideDuration={6000}
          onClose={this.handleSnackbar}
        >
          <MySnackbar
            onClose={this.handleSnackbar}
            variant="error"
            message={this.state.errortext}
          />
        </Snackbar>
      </div>
      </Router>
    );
  }
}

