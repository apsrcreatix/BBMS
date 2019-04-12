import MaterialTable from "material-table";
import * as React from "react";
import axios from "axios";
import Config from "../../Config";
import "./../../index.css";
import UpdateDonor from "../UpdateDonor";
import { BrowserRouter as Router } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Redirect, Route, Switch } from "react-router";
import TextField from "@material-ui/core/TextField";
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

let username = Config.AUTH.username;
let password = Config.AUTH.token;
let base_url = Config.SERVER_URL;
let session_url = base_url + Config.PATHS.getDonors;

export default class TableWithContent extends React.Component {

 state = {
      data: [],
      setData: "",
      redirectTo: false,
      anchorEl: null,
      name: "",
      dob: "",
      fatherSpouseName: "",
      donor_id: "",
      pincode:"",
      mobile:"",
      telephone:"",
      open: false
    };
   

  handleChange = (name: any) => (event: any) => {
    this.setState({ [name]: event.target.value });
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClickClose = () => {
    this.setState({ open: false });
  };
  handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  filterState(){
    var log = {
      query: {
        limit: 600,
        index: 0
      }
    };
    var filter = {
     onlyEligibleDonor: false
    };
     if( this.state.name != ""){
       filter = Object.assign(filter,{
         name: this.state.name
       })
     }
     if( this.state.mobile != ""){
       filter = Object.assign(filter,{
         mobile: this.state.mobile
       })
     }
     if( this.state.telephone != ""){
       filter = Object.assign(filter,{
         telephone: this.state.telephone
       })
     }
     
     if(this.state.pincode != ""){
       filter = Object.assign(filter,{
         pincode: this.state.pincode
       })
     }
     if(this.state.fatherSpouseName != ""){
       filter = Object.assign(filter,{
         fatherSpouseName: this.state.fatherSpouseName
       })
     }
     if(this.state.dob != ""){
       filter = Object.assign(filter,{
         dob: this.state.dob
       })
     }
     Object.assign(log,{
       query: {
         limit: 900,
         index: 0,
         filter: filter
       }
     })
 
     return  log;
     }

  async fetchDonorList() {

    const filter = this.filterState();

    await axios.post(
      session_url,
      filter,
      {
        auth: {
          username,
          password
        }
      }
    )
      .then((response: any) => {
        this.setState(() => ({
          data: response.data.response
        }));
      })
      .catch(function (error: any) {
        console.log(`error in authentication : ${error}`);
      });
  }

  render() {
    const { data } = this.state;

    function calculateAge(value: any) {
      let now = new Date();
      let datefromAPITimeStamp = new Date(value).getTime();
      let nowTimeStamp = now.getTime();
      let microSecondsDiff = Math.abs(datefromAPITimeStamp - nowTimeStamp);
      // Number of milliseconds per day = 24 hrs/day * 60 minutes/hour * 60 seconds/minute * 1000 msecs/second
      return Math.floor(microSecondsDiff / 31556952000);
    }

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

    if (this.state.redirectTo) {
      return (
        <Router>
          <Switch>
            <Route
              path={"/updateDonors"}
              exact={true}
              component={() => <UpdateDonor data={this.state.setData} />}
            />
            <Redirect push to="/updateDonors" />
          </Switch>
        </Router>
      );
    }

    const { anchorEl } = this.state;

    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Want to a add new donor?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
             We are not able to find the donor related to the information you have provided. Would you like to add a new donor data ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              No
            </Button>
            <Button onClick={this.handleClickClose} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      <div className="search-container">
        <Router>
          <Switch>
            <Route
              path={"/updateDonors"}
              exact={true}
              component={() => <UpdateDonor data={this.state.setData} />}
            />
          </Switch>
        </Router>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem
            onClick={() =>
              this.setState({
                redirectTo: true
              })
            }
          >
            Edit
          </MenuItem>
          <MenuItem onClick={this.handleClose}>More...</MenuItem>
        </Menu>
         <div className="search-inputs-box">
            <TextField
              label="Name"
              className="inputs"
              type="text"
              value={this.state.name}
              placeholder="Full Name"
              onChange={this.handleChange("name")}
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              required
            />
            <TextField
              label="Father's/Spouse's Name"
              className="inputs"
              value={this.state.fatherSpouseName}
              placeholder="Full Name"
              onChange={this.handleChange("fatherSpouseName")}
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              helperText="Father's or Spouce's full name."
              required
            />
            <TextField
              className="inputs"
              id="dob"
              label="Date of birth"
              value={this.state.dob}
              onChange={this.handleChange("dob")}
              required
              type="date"
              helperText="Date/Month/Year as DD/MM/YYYY"
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
            />
            <p style={{color:'royalblue'}}>You can fill these for donor's office or residence.</p>
            <TextField
              label="Landline"
              className="inputs"
              type="number"
              value={this.state.telephone}
              onChange={this.handleChange("telephone")}
              placeholder="1234123456"
              helperText="STD code with Telephone number without space."
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
            />
             <TextField
              label="Mobile Number"
              className="inputs"
              type="number"
              value={this.state.mobile}
              onChange={this.handleChange("mobile")}
              placeholder="9876543210"
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              label="Pincode"
              className="inputs"
              placeholder="123456"
              value={this.state.pincode}
              onChange={this.handleChange("pincode")}
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              helperText="Enter 6 digit pincode."
              required
            />
          </div>
          <div className="span-text">
          <h1 style={{color:'royalblue'}}> OR </h1>
          <p style={{color:'royalblue'}}>(Choose one)</p>
          </div>
          <div className="search-donor-id">
          <TextField
              label="Donor ID"
              className="inputs"
              type="number"
              value={this.state.donor_id}
              placeholder="ID Number"
              onChange={this.handleChange("donor_id")}
              helperText="Please enter valid ID"
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              required
            />
          </div>
          <div className="search-buttons-box">
          <Button
        className="inputs"
        variant="contained"
        color="primary"
        onClick={() =>this.fetchDonorList()}
        >
          Search
        </Button>
        <br/>
        <Button
          className="inputs"
          variant="contained"
          color="default"
          onClick={() => {console.log("button pressed")}}
        >
          Reset
        </Button>
        <Button
          className="inputs"
          variant="contained"
          color="secondary"
          onClick={this.handleClickOpen}
        >
          Add Donor
        </Button>
        <br/>
        </div>
       </div>
       <div className="search-box_table">
        <MaterialTable
          columns={[
            { title: "Name", field: "name" },
            { title: "Gender", field: "gender" },
            { title: "Father/Spouse", field: "fatherSpouseName" },
            {
              title: "Date Of Birth",
              field: "dob",
              render: rowData => {
                return humanReadableDate(rowData.dob);
              },
              type: "date"
            },
            {
              title: "Age",
              field: "dob",
              render: rowData => {
                return calculateAge(rowData.dob);
              }
            },
            { title: "Residence Mobile", field: "residentialAddress.mobile" },
            { title: "Blood Group", field: "bloodGroup" },
            { title: "Rh Type", field: "rhType" },
            { title: "Donor Type", field: "lastDonated.type" },
            {
              title: "Last WB",
              field: "wbDonor.lastDonation",
              render: rowData => {
                return humanReadableDate(rowData.wbDonor.lastDonation);
              }
            },
            {
              title: "Next WB",
              field: "wbDonor.nextDonation",
              render: rowData => {
                return humanReadableDate(rowData.wbDonor.nextDonation);
              }
            },
            {
              title: "Last Platlet",
              field: "platletDonor.lastDonation",
              render: rowData => {
                return humanReadableDate(rowData.platletDonor.lastDonation);
              }
            },
            {
              title: "Next Platlet",
              field: "platletDonor.nextDonation",
              render: rowData => {
                return humanReadableDate(rowData.platletDonor.nextDonation);
              }
            },
            {
              title: "Last DRC",
              field: "drcDonor.lastDonation",
              render: rowData => {
                return humanReadableDate(rowData.drcDonor.lastDonation);
              }
            },
            {
              title: "Next DRC",
              field: "drcDonor.nextDonation",
              render: rowData => {
                return humanReadableDate(rowData.drcDonor.nextDonation);
              }
            },
            {
              title: "Last Plasma",
              field: "plasmaDonor.lastDonation",
              render: rowData => {
                return humanReadableDate(rowData.plasmaDonor.lastDonation);
              }
            },
            {
              title: "Next Plasma",
              field: "plasmaDonor.nextDonation",
              render: rowData => {
                return humanReadableDate(rowData.plasmaDonor.nextDonation);
              }
            },
            { title: "Residence Pincode", field: "residentialAddress.pincode" },
            { title: "Office Pincode", field: "officeAddress.pincode" },
            { title: "Office Landline", field: "officeAddress.phone" },
            { title: "Residence Landline", field: "residentialAddress.phone" },
            { title: "Registration Center", field: "regCenter" }
          ]}
          data={data}
          title="Donor Directory Seach"
          actions={[
            {
              icon: "edit",
              tooltip: "Edit Donor Data",
              onClick: (event, rowData) => {
                this.setState({
                  setData: rowData
                });
                this.handleClick(event);
              }
            }
          ]}
          options={{
            searchable: true,
            loadingType: "linear",
            pageSize: 5,
            toolbar: true,
            columnsButton: true
          }}
          localization={{
            body: {
              emptyDataSourceMessage: "Loading ... This may take a while ..."
            },
            header: {
              actions: "Edit"
            }
          }}
        />
        </div>
      </div>
    );
  }
}
