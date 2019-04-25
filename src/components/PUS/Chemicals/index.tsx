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
import UseChemical from './UseChemical';
import AddChemical from './AddChemical';
import MySnackbar from "../../MySnackbar";
import Snackbar from '@material-ui/core/Snackbar';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const getChemicals = base_url + Config.PATHS.getChemicals;

export default class Chemicals extends React.Component {
  state = {
    chemicalsData: [],
    chemicalsLog: [],
    selectChemicals: "",
    usingChemical: false,
    addingChemical: false,
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
  handleCloseUseChemical = () => {
    this.setState({ usingChemical: false});
  }
  handleCloseAddChemical = () => {
    this.setState({ addingChemical: false});
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
      .get(getChemicals+"?type="+this.state.selectChemicals, {
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
          chemicalsData: response.data.response.stocks,
          chemicalsLog: response.data.response.logs,
          currentData:this.state.selectChemicals
        }));
        console.log("insidecall:"+JSON.stringify(response.data.response));
      }else{        console.log("insidecall:"+JSON.stringify(response.data.response));

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

    if (this.state.usingChemical) {
      console.log("modal for use of chemical");
    }

    if (this.state.addingChemical) {
      console.log("modal for adding chemical");
    }

    const { anchorEl } = this.state;
    
    return (
      <Router>
        <Card>
          <CardContent>
          <h1>Chemicals</h1>
      <div className="lookup-inputs-container">
       <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
         
          <Link key={99} to={"/chemicals/use"} >
          <MenuItem
            onClick={() =>
              this.setState({
                usingChemical: true
              })
            }
          >
            Edit
          </MenuItem>
          </Link>
        </Menu>
        <div className="box_options">
          <TextField
            className="inputs"
            select
            label="Chemical's Type"
            value={this.state.selectChemicals}
            onChange={this.handleChange("selectChemicals")}
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
            {Data.CHEMICALS.map((option: any) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
          <h4 style={{color:'darkblue'}}>The given data is about {(this.state.currentData!="")?this.state.currentData:"selected chemical"}, please select above and apply for any other.</h4>
        </div>
        <div className="box_buttons">
        <Tooltip title="Press apply to load data for selected chemical." placement="left-start">
          <span><Button
            className="inputs"
            variant="contained"
            color="default"
            disabled={this.state.selectChemicals==""}
            onClick={() => this.fetchData()}
          >
            Apply
          
          </Button>
          </span>
        </Tooltip>
          <br />
          <Tooltip title="Press Add Stock to add data for any chemical." placement="left-start">
          <span>
          <Link key={98} to={"/chemicals/add"}>
          <Button
            className="inputs"
            variant="contained"
            color="primary"
            disabled={this.state.selectChemicals==""}
            onClick={() => {
              this.setState({
                  addingChemical: true
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
            data={this.state.chemicalsData}
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
            data={this.state.chemicalsLog}
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
                path={`/chemicals/use`}
                component={() => <UseChemical open={this.state.usingChemical} passed={this.state.passedData} onClose={this.handleCloseUseChemical}/>}
        />
        <Route
                key={98}
                exact={true}
                path={`/chemicals/add`}
                component={() => <AddChemical open={this.state.addingChemical} type={this.state.selectChemicals} onClose={this.handleCloseAddChemical}/>}
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
      </CardContent>
    </Card>
      </Router>
    );
  }
}

