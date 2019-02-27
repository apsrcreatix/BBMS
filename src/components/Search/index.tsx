// @TODO
// 1.Optimization for > 6000 collections.
// 2.Organizing Structure.

import MaterialTable from "material-table";
import * as React from "react";
import axios from "axios";
import Config from "../../Config";
import './search.css';
import UpdateDonor from '../UpdateDonor';
import { BrowserRouter as Router } from "react-router-dom";

let username = Config.AUTH.username;
let password = Config.AUTH.token;
let base_url = Config.SERVER_URL;
let session_url = base_url + Config.PATHS.getDonors;

interface state {
  data: object,
  setData: any,
  redirectTo: boolean
}
export default class TableWithContent extends React.Component<{}, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      setData: "",
      redirectTo: false
    };
    axios
      .post(
        session_url,
        {},
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
      let microSecondsDiff = Math.abs(
        datefromAPITimeStamp - nowTimeStamp
      );
      // Number of milliseconds per day = 24 hrs/day * 60 minutes/hour * 60 seconds/minute * 1000 msecs/second
      return Math.floor(microSecondsDiff / 31556952000);
    }
    function humanReadableDate(value: any){
      let event = new Date(value);
      let options = { year: 'numeric', month: 'numeric', day: 'numeric', timezone: 'Asia/Kolkata' };
      return event.toLocaleDateString('en-IN', options);
    }
    if (this.state.redirectTo) {
      return <UpdateDonor data={this.state.setData}/>;
    }
    return (
    <Router>
      <div className="container">
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
              type: 'date'
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
            { title: "Registration Center", field: "regCenter" },
          ]}
          data={data}
          title="Donor Directory Seach"
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit Donor Data',
              onClick: (event, rowData) => {
              this.setState({setData : rowData, redirectTo:true});
              console.log(event);
              },
            },
          ]
          }
          options={{
            filtering: true,
            searchable: true,
            loadingType: "linear",
            pageSize: 10,
            toolbar: true,
            columnsButton: true
          }}
          localization={{
            body: {
              emptyDataSourceMessage: 'Loading ... This may take a while ...',
            },
            header:{
              actions: "Edit"
            }
          }}
        />
         </div>
  </Router>
    );
  }
}
