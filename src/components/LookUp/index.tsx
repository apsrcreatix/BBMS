import * as React from "react";
import MaterialTable from "material-table";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Data from "../Data";
import "./LookUp.css";
import axios from "axios";
import Config from "../../Config";

const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const session_url = base_url + Config.PATHS.getDonors;
const areas = base_url + Config.PATHS.getAreas;
const postOffice = base_url + Config.PATHS.getPostoffice;

let log  = {
	"query": {
		"limit": 100,
		"index": 0
	}
};

const INITIAL_STATE = {
  eligibility: false,
  motivatedBy: "",
  gender: "",
  bloodGroup: "",
  rhType: "",
  postOffice: "",
  ageGroup: "",
  donorType: "",
  age_max: "",
  age_min: "",
  addressKeyword: "",
  area:"",
  data: [],
  areaList: [],
  postOfficeList:[]
};

export default class LookUp extends React.Component {
  state = INITIAL_STATE;
  constructor(props: any) {
    super(props);
  }
// handle changes when input fields changes 
  handleChange = (name: any) => (event: any) => {
    this.setState({ [name]: event.target.value });
  };

  printDocument = () => {
 
    const pri = window.frames[0];
    pri.document.open();

    pri.document.write(JSON.stringify(this.state.data));
    pri.document.close();
    pri.focus();
    pri.print();
  }

  handleAge = (name: any) => (event: any) =>{
    this.setState({
      age_max: event.target.value[1],
      age_min: event.target.value[0]
    })
  }

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
    if( this.state.eligibility === true ){
      filter.onlyEligibleDonor = true;
    }
    if( this.state.motivatedBy != ""){
      filter = Object.assign(filter,{
        motivatedBy: this.state.motivatedBy
      })
    }
    if( this.state.gender != ""){
      filter = Object.assign(filter,{
        gender: this.state.gender
      })
    }
    if( this.state.rhType != ""){
      filter = Object.assign(filter,{
        rhType: this.state.rhType
      })
    }
    if( this.state.age_min != "" && this.state.age_max != "" ){
      Object.assign(filter,{
        age: {
          max: this.state.age_max,
          min: this.state.age_min
        }
      })
    }
    if(this.state.area != ""){
      filter = Object.assign(filter,{
        area: this.state.area
      })
    }
    if(this.state.addressKeyword != ""){
      filter = Object.assign(filter,{
        address: this.state.addressKeyword
      })
    }
    if(this.state.postOffice != ""){
      filter = Object.assign(filter,{
        postOffice: this.state.postOffice
      })
    }
    if(this.state.bloodGroup != ""){
      filter = Object.assign(filter,{
        bloodGroup: this.state.bloodGroup
      })
    }
    if(this.state.donorType != ""){
      filter = Object.assign(filter,{
        donorType: this.state.donorType
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
  async componentDidMount(){
     await axios
      .post(
        session_url,
        log,
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
      
      await axios
      .get(
        `${areas}`,
        {
          auth: {
            username,
            password
          }
        }
      )
      .then((response:any)=>{
        this.setState(()=>({
          areaList: response.data.response
        }));
      })
      .catch(function (error: any) {
        console.log(`error in authentication : ${error}`);
      });
      await axios
      .get(
        `${postOffice}`,
        {
          auth: {
            username,
            password
          }
        }
      )
      .then((response:any)=>{
        this.setState(()=>({
          postOfficeList: response.data.response
        }));
      })
      .catch(function (error: any) {
        console.log(`error in authentication : ${error}`);
      });
  }
  render() {
    return (

  <div>
      <div className="container">
      <div className="box_options">
        <form className="form" noValidate autoComplete="off" />
        <TextField
          className="inputs"
          select
          label="Eligibilty"
          value={this.state.eligibility}
          onChange={this.handleChange("eligibility")}
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
        <option value="">
              All
            </option>
          <option value="true">
          Only Eligible Donors
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
         <option value="">
              All
            </option>
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
          value={this.state.rhType}
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
         <option value="">
              All
            </option>
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
          value={`${this.state.age_min} - ${this.state.age_max}`}
          onChange={this.handleAge("age_min")}
          SelectProps={{
            native: true
          }}
          InputLabelProps={{
            shrink: true
          }}
          required
          helperText="Please select age group"
          margin="normal"
        >
        <option value="">
              All
          </option>
          {Data.AGE_GROUP.map((option: any) => (
            <option key={option} value={option}>
              {`${option[0]} - ${option[1]}`}         
            </option>
          ))}
        </TextField>
        <TextField
          className="inputs"
          select
          label="Donor Type"
          value={this.state.donorType}
          onChange={this.handleChange("donorType")}
          SelectProps={{
            native: true
          }}
          InputLabelProps={{
            shrink: true
          }}
          required
          helperText="Please select donor type"
          margin="normal"
        >
         <option value="">
              All
            </option>
          {Data.DONOR_TYPE.map((option: any) => (
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
         <option value="">
              All
            </option>
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
          value={this.state.area}
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
         <option value="">
              All
            </option>
          {this.state.areaList.map((option: any) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>

        <TextField
          className="inputs"
          select
          label="Post Office"
          value={this.state.postOffice}
          onChange={this.handleChange("postOffice")}
          SelectProps={{
            native: true
          }}
          InputLabelProps={{
            shrink: true
          }}
          required
          helperText="Please select post office"
          margin="normal"
        >
         <option value="">
              All
            </option>
          {this.state.postOfficeList.map((option: any) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>

        <TextField
          label="Address Keyword"
          className="inputs"
          value={this.state.addressKeyword}
          placeholder=""
          onChange={this.handleChange("addressKeyword")}
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
          value={this.state.motivatedBy}
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
         <option value="">
              All
            </option>
          {Data.TEMP_MOTIVATORS.map((option: any) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
        <br/>
        <Divider />
        <br/>
        </div>
        <div className="box_buttons">
 
        <Button
        className="inputs"
        variant="contained"
        color="default"
        onClick={() =>this.fetchDonorList()}
        >
          Apply
        </Button>
        <Button
          className="inputs"
          variant="contained"
          color="default"
          onClick={() => {this.setState(INITIAL_STATE);this.componentDidMount();}}
        >
          Clear
        </Button>
        <Button
          className="inputs"
          variant="contained"
          color="default"
          onClick={()=>this.printDocument()}
        >
          Print
        </Button>
        </div>
      </div>
      <div className="box_table">
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
          title="Donor Lookup Data"
          options={{
            loadingType: "linear"
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
