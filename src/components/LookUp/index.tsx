import * as React from "react";
import MaterialTable from "material-table";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Data from "../Data";
import "./LookUp.css";

const INITIAL_STATE = {
  eligibility: "",
  motivatedBy: "",
  name: "",
  dob: "",
  gender: "",
  bloodGroup: "",
  rhType: "",
  r_address: "",
  r_pincode: "",
  r_door: "",
  r_buildingName: "",
  r_city: "",
  r_postOffice: "",
  r_area: "",
  r_taluk: "",
  r_district: "",
  r_mobile: "",
  r_email: "",
  r_phone: "",
  o_address: "",
  o_pincode: "",
  o_door: "",
  o_buildingName: "",
  o_city: "",
  o_postOffice: "",
  o_area: "",
  o_taluk: "",
  o_district: "",
  o_phone: "",
  o_email: "",
  o_mobile: "",
  data: []
};

export default class LookUp extends React.Component {
  state = INITIAL_STATE;
  constructor(props: any) {
    super(props);
  }

  handleChange = (name: any) => (event: any) => {
    this.setState({ [name]: event.target.value });
  };
  printDocument = () => {
    // const content = document.getElementById("printableArea");
    const pri = window.frames[0];
    pri.document.open();
    // if(content!=null) pri.document.write(content.innerHTML);
    pri.document.write(JSON.stringify(this.state.data));
    pri.document.close();
    pri.focus();
    pri.print();
  }
  render() {
    return (
      <div>
        <form className="form" noValidate autoComplete="off" />
        <TextField
          className="inputs"
          select
          label="Eligibilty"
          value={this.state.gender}
          onChange={this.handleChange("gender")}
          SelectProps={{
            native: true
          }}
          InputLabelProps={{
            shrink: true
          }}
          required
          helperText="Please select Eligibilty"
          margin="normal"
        >
          {Data.GENDER.map((option: any) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
        <TextField
          className="inputs"
          select
          label="Blood Group"
          value={this.state.gender}
          onChange={this.handleChange("blooGroup")}
          SelectProps={{
            native: true
          }}
          InputLabelProps={{
            shrink: true
          }}
          required
          helperText="Please select Blood Group"
          margin="normal"
        >
          {Data.BLOOD_GROUP.map((option: any) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
        <TextField
          className="inputs"
          select
          label="RH Type"
          value={this.state.gender}
          onChange={this.handleChange("rhType")}
          SelectProps={{
            native: true
          }}
          InputLabelProps={{
            shrink: true
          }}
          required
          helperText="Please select RH Type"
          margin="normal"
        >
          {Data.RH_TYPE.map((option: any) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
        <TextField
          className="inputs"
          select
          label="Age Group"
          value={this.state.gender}
          onChange={this.handleChange("dob")}
          SelectProps={{
            native: true
          }}
          InputLabelProps={{
            shrink: true
          }}
          required
          helperText="Please select Gender"
          margin="normal"
        >
          {Data.AGE_GROUP.map((option: any) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
        <TextField
          className="inputs"
          select
          label="Donor Type"
          value={this.state.gender}
          onChange={this.handleChange("gender")}
          SelectProps={{
            native: true
          }}
          InputLabelProps={{
            shrink: true
          }}
          required
          helperText="Please select Gender"
          margin="normal"
        >
          {Data.GENDER.map((option: any) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
        <TextField
          className="inputs"
          select
          label="Gender"
          value={this.state.gender}
          onChange={this.handleChange("gender")}
          SelectProps={{
            native: true
          }}
          InputLabelProps={{
            shrink: true
          }}
          required
          helperText="Please select Gender"
          margin="normal"
        >
          {Data.GENDER.map((option: any) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
        <TextField
          className="inputs"
          select
          label="Area"
          value={this.state.gender}
          onChange={this.handleChange("area")}
          SelectProps={{
            native: true
          }}
          InputLabelProps={{
            shrink: true
          }}
          required
          helperText="Please select Area"
          margin="normal"
        >
          {Data.AREAS.map((option: any) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>

        <TextField
          className="inputs"
          select
          label="Post Office"
          value={this.state.gender}
          onChange={this.handleChange("r_postOffice")}
          SelectProps={{
            native: true
          }}
          InputLabelProps={{
            shrink: true
          }}
          required
          helperText="Please select Post Office"
          margin="normal"
        >
          {Data.POSTOFFICES.map((option: any) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>

        <TextField
          label="Address Keyword"
          className="inputs"
          value={this.state.name}
          placeholder=""
          onChange={this.handleChange("r_address")}
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          required
        />

        <TextField
          className="inputs"
          select
          label="Motivated By"
          value={this.state.gender}
          onChange={this.handleChange("motivatedBy")}
          SelectProps={{
            native: true
          }}
          InputLabelProps={{
            shrink: true
          }}
          required
          helperText="Please select Motivated By"
          margin="normal"
        >
          {Data.TEMP_MOTIVATORS.map((option: any) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
        <br/>
        <Divider />
        <br/>
        <Button
        className="inputs"
        variant="contained"
        color="primary"
        onClick={() => this.setState({
          data: [
            {
              "_id": "5c61483f7339b42d0d3a33ca",
        "regDate": "2019-02-11T10:02:39.548Z",
        "regCenter": "Lions Blood Bank - Coimbatore",
        "motivatedBy": "Sabu",
        "name": "Suresh",
        "dob": "1985-04-05T18:30:00.000Z",
        "gender": "Male",
        "bloodGroup": "B+",
        "rhType": "+",
        "fatherSpouseName": "MOORTHI",
        "education": "XXXXXX",
        "occupation": "XXXX",
        "wbDonor": {
          "lastDonation": null,
          "nextDonation": "2010-06-11T18:30:00.000Z"
        },
        "platletDonor": {
          "lastDonation": null,
          "nextDonation": null
        },
        "plasmaDonor": {
          "lastDonation": null,
          "nextDonation": null
        },
        "drcDonor": {
          "lastDonation": null,
          "nextDonation": null
        },
        "lastDonated": {
          "type": "WB",
          "lastDonation": "2010-06-08T18:30:00.000Z",
          "nextDonation": "2010-06-11T18:30:00.000Z"
        },
        "residentialAddress": {
          "address": "3A,MARIYAPPA ASARI ST,\nKUNIYAMUTHUR,\nCOIMBATORE",
          "pincode": "641008",
          "door": "3a, Mariyappa Asari Street",
          "buildingName": "",
          "city": "",
          "postOffice": "1",
          "area": "Kuniyamuthur",
          "taluk": "",
          "district": "",
          "mobile": "+919894461553",
          "email": "PUGALENTHI_S@YAHOO.CO.IN",
          "phone": ""
        },
        "officeAddress": {
          "address": "",
          "pincode": "",
          "door": "",
          "buildingName": "",
          "city": "",
          "postOffice": "",
          "area": "Kuniyamuthur",
          "taluk": "",
          "district": "",
          "phone": "",
          "email": "",
          "mobile": ""
        }
      }
  ]
  })}>
          Look
        </Button>
        <Button
          className="inputs"
          variant="contained"
          color="secondary"
          onClick={() => this.setState(INITIAL_STATE)}
        >
          Reset
        </Button>
        <Button
          className="inputs"
          variant="contained"
          color="default"
          onClick={()=>this.printDocument()}
        >
          Print
        </Button>
<div id="printableArea">
        <MaterialTable
          columns={[
            { title: "Name", field: "name" },
            {
              title: "Date Of Birth",
              render: rowData => {
                var dateFromAPI = rowData.dob;

                var now = new Date();
                var datefromAPITimeStamp = new Date(dateFromAPI).getTime();
                var nowTimeStamp = now.getTime();

                var microSecondsDiff = Math.abs(
                  datefromAPITimeStamp - nowTimeStamp
                );
                // Number of milliseconds per day =
                //   24 hrs/day * 60 minutes/hour * 60 seconds/minute * 1000 msecs/second
                var daysDiff = Math.floor(microSecondsDiff / 31556952000);

                return daysDiff;
              }
            },
            { title: "Blood Group", field: "bloodGroup" },
            { title: "Gender", field: "gender" },
            { title: "Donor Type", field: "lastDonated.type" },
            { title: "Eligibility", field: "lastDonated.type" },
            { title: "Contact", field: "residentialAddress.mobile" }
          ]}
          data={this.state.data}
          title="Donor Look Up"
          options={{
            filtering: true,
            searchable: true,
            loadingType: "linear",
            pageSize: 10,
            toolbar: true
          }}
        />
        </div>
        <iframe id="ifmcontentstoprint" style={{
                        height: '0px',
                        width: '0px',
                        position: 'absolute'
                    }}></iframe>    
      </div>
    );
  }
}
