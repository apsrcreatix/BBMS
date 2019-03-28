import MaterialTable from "material-table";
import * as React from "react";
import axios from "axios";
import Config from "../../Config";
import "./search.css";
import UpdateDonor from "../UpdateDonor";
import { BrowserRouter as Router } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Redirect, Route, Switch } from "react-router";
import TextField from "@material-ui/core/TextField";
import { Button } from '@material-ui/core';

let username = Config.AUTH.username;
let password = Config.AUTH.token;
let base_url = Config.SERVER_URL;
let session_url = base_url + Config.PATHS.getDonors;

interface state {
  data: object[];
  setData: any;
  redirectTo: boolean;
  anchorEl: any;
  name: string;
  r_mobile: string;
  o_mobile: string;
  r_phone: string;
  o_phone: string;
  dob: string;
  fatherSpouseName: string;
  o_pincode: string;
  r_pincode: string;
}
export default class TableWithContent extends React.Component<{}, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      setData: "",
      redirectTo: false,
      anchorEl: null,
      name: " ",
      r_mobile: " ",
      o_mobile: " ",
      r_phone: " ",
      o_phone: " ",
      dob: " ",
      fatherSpouseName: " ",
      o_pincode: " ",
      r_pincode: " "
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (name: any) => (event: any) => {
    this.setState({ name: event.target.value });
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
        limit: 200,
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
     if( this.state.o_mobile != ""){
       filter = Object.assign(filter,{
         o_mobile: this.state.o_mobile
       })
     }
     if( this.state.o_phone != ""){
       filter = Object.assign(filter,{
         o_phone: this.state.o_phone
       })
     }
     
     if(this.state.o_pincode != ""){
       filter = Object.assign(filter,{
         o_pincode: this.state.o_pincode
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
     if(this.state.r_mobile != ""){
       filter = Object.assign(filter,{
         r_mobile: this.state.r_mobile
       })
     }
     Object.assign(log,{
       query: {
         limit: 200,
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
      <div className="search-container container">
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
        <div className="search-inputs-container">
          <div className="search-inputs-box">
            <TextField
              label="Mobile Number"
              className="inputs"
              type="number"
              value={this.state.r_mobile}
              onChange={this.handleChange("r_mobile")}
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              className="inputs"
              id="dob"
              label="Date of birth"
              value={this.state.dob}
              onChange={this.handleChange("dob")}
              required
              type="date"
              helperText="Fill Date/Month/Year"
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
            />
            <TextField
              label="Landline"
              className="inputs"
              type="number"
              value={this.state.r_phone}
              onChange={this.handleChange("r_phone")}
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              label="Pincode"
              className="inputs"
              placeholder="pincode"
              value={this.state.o_pincode}
              onChange={this.handleChange("o_pincode")}
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              helperText="Enter 6 digit pincode."
              required
            />
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
              helperText="Fill father's or spouce's name"
              required
            />
          </div>
          <div className="search-buttons-box">
          <Button
        className="inputs"
        variant="contained"
        color="default"
        onClick={() =>this.fetchDonorList()}
        >
          Apply
        </Button>
        <br/>
        <Button
          className="inputs"
          variant="contained"
          color="default"
          onClick={() => {console.log("button pressed")}}
        >
          Clear
        </Button>
        <br/>
        </div>
        </div>
        <div className="box_table">
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
            filtering: true,
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
