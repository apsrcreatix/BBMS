import * as React from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import "./EntryForm.css";

// const OBJECT_BODY = {
//   "regDate": "",
//   "regCenter": "",
//   "motivatedBy": "",
//   "name": "",
//   "dob": "",
//   "gender": "",
//   "bloodGroup": "",
//   "rhType": "",
//   "fatherSpouseName": "",
//   "education": "",
//   "occupation": "",
//   "wbDonor": {
//     "lastDonation": null,
//     "nextDonation": null
//   },
//   "platletDonor": {
//     "lastDonation": null,
//     "nextDonation": null
//   },
//   "plasmaDonor": {
//     "lastDonation": null,
//     "nextDonation": null
//   },
//   "drcDonor": {
//     "lastDonation": null,
//     "nextDonation": null
//   },
//   "lastDonated": {
//     "type": "",
//     "lastDonation": "",
//     "nextDonation": ""
//   },
//   "residentialAddress": {
//     "address": "",
//     "pincode": "",
//     "door": "",
//     "buildingName": "",
//     "city": "",
//     "postOffice": "",
//     "area": "",
//     "taluk": "",
//     "district": "",
//     "mobile": "",
//     "email": "",
//     "phone": ""
//   },
//   "officeAddress": {
//     "address": "",
//     "pincode": "",
//     "door": "",
//     "buildingName": "",
//     "city": "",
//     "postOffice": "",
//     "area": "Kuniyamuthur",
//     "taluk": "",
//     "district": "",
//     "phone": "",
//     "email": "",
//     "mobile": ""
//   }
// };

const INITIAL_STATE = {
  "regDate": "",
  "regCenter": "",
  "motivatedBy": "",
  "name": "",
  "dob": "",
  "gender": "",
  "bloodGroup": "",
  "rhType": "",
  "fatherSpouseName": "",
  "education": "",
  "occupation": "",
  "wbDonor_lastDonation": null,
  "wbDonor_nextDonation": null,
  "platletDonor_lastDonation": null,
  "platletDonor_nextDonation": null,
  "plasmaDonor_lastDonation": null,
  "plasmaDonor_nextDonation": null,
  "drcDonor_lastDonation": null,
  "drcDonor_nextDonation": null,
  "lastDonated_type": "",
  "lastDonated_lastDonation": "",
  "lastDonated_nextDonation": "",
  "r_address": "",
  "r_pincode": "",
  "r_door": "",
  "r_buildingName": "",
  "r_city": "",
  "r_postOffice": "",
  "r_area": "",
  "r_taluk": "",
  "r_district": "",
  "r_mobile": "",
  "r_email": "",
  "r_phone": "",
  "o_address": "",
  "o_pincode": "",
  "o_door": "",
  "o_buildingName": "",
  "o_city": "",
  "o_postOffice": "",
  "o_area": "Kuniyamuthur",
  "o_taluk": "",
  "o_district": "",
  "o_phone": "",
  "o_email": "",
  "o_mobile": "",
  data: []
  };
const testData = [
  {
    value: "A",
    label: "Apple"
  },
  {
    value: "B",
    label: "Ball"
  },
  {
    value: "C",
    label: "Cat"
  },
  {
    value: "D",
    label: "Doggo"
  }
];

export default class EntryForm extends React.Component {
  state = INITIAL_STATE;
  constructor(props: any) {
    super(props);
  }
  handleChange = (name: any) => (event: any) => {
    this.setState({ [name]: event.target.value });
  };
  render() {

    return (
      <div>
      <h1>Add New Donor</h1>
      <form className="form" noValidate autoComplete="off">
       <h3>Registration Detail</h3>
        <TextField
          className="inputs"
          id="reg-date"
          label="Registraion Date"
          required
          type="date"
          onChange={this.handleChange("regDate")}
          value={this.state.regDate}
          helperText="Fill Date/Month/Year"
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />

        <TextField
          className="inputs"
          select
          label="Registration Centre"
          value={this.state.regCenter}
          onChange={this.handleChange("regCenter")}
          SelectProps={{
            native: true
          }}
          InputLabelProps={{
            shrink: true
          }}
          required
          helperText="Please select registration centre"
          margin="normal"
        >
          {testData.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>

        <FormControl>
          <TextField
            className="inputs"
            select
            label="Motivated By"
            value={this.state.motivatedBy}
            onChange={this.handleChange("motivatedBy")}
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            helperText="Select motivator from list"
            margin="normal"
          >
            {testData.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <h5>OR</h5>
          <TextField
            className="inputs"
            label="Motivated by"
            required
            type="text"
            placeholder="Full Name"
            margin="normal"
            helperText="Fill Motivated by OR Select from list"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <Divider/>
        <h3>Basic Information</h3>
        <TextField
          label="Name"
          className="inputs"
          value={this.state.name}
          placeholder="Full Name"
          onChange={this.handleChange('name')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
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
          helperText="Fill Date/Month/Year"
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />
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
          {testData.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          </TextField>
          <TextField
          className="inputs"
          select
          label="Blood Group"
          value={this.state.bloodGroup}
          onChange={this.handleChange("bloodGroup")}
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
          {testData.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          </TextField>
          <TextField
          className="inputs"
          select
          label="Rh Type"
          value={this.state.rhType}
          onChange={this.handleChange("rhType")}
          SelectProps={{
            native: true
          }}
          InputLabelProps={{
            shrink: true
          }}
          required
          helperText="Please select Rh Type"
          margin="normal"
        >
          {testData.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          </TextField>
          <TextField
          label="Father's/Spouse's Name"
          className="inputs"
          value={this.state.fatherSpouseName}
          placeholder="Full Name"
          onChange={this.handleChange('fatherSpouseName')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          helperText="Fill father's or spouce's name"
          required
        />
        <TextField
          label="Education"
          className="inputs"
          value={this.state.education}
          placeholder="Education"
          onChange={this.handleChange('education')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          helperText="Fill about last degree"
          required
        />
        <TextField
          label="Occupation"
          className="inputs"
          value={this.state.occupation}
          placeholder="Occupation"
          onChange={this.handleChange('occupation')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          helperText="Fill about occupation"
          required
        />
        <Divider/>
        <h3>Blood Donation</h3>
        <h1>@TODO</h1>
        <Divider/>
        <h3>Residence</h3>
        <TextField
          label="Pincode"
          className="inputs"
          placeholder="pincode"
          value={this.state.r_pincode}
          onChange={this.handleChange('r_pincode')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          helperText="Enter 6 digit pincode."
          required
        />
      </form>
      </div>
    );
  }
}
