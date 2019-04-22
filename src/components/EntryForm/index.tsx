import * as React from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Snackbar from "@material-ui/core/Snackbar";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import "./../../index.css";
import DATA from "../Data";
import axios from "axios";
import Config from "../../Config";
import MySnackbarContentWrapper from "../MySnackbar";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const session_url = base_url + Config.PATHS.getPincodeDetails;
const postOffice = base_url + Config.PATHS.getPostoffice;
const motivators = base_url + Config.PATHS.getMotivators;
const addDonor = base_url + Config.PATHS.addDonor;

const RHTYPE = DATA.RH_TYPE;
const BLOOD = DATA.BLOOD_GROUP;
const GENDER = DATA.GENDER;
const REG_CENTRE = DATA.TEMP_REG_CENTRE;


class EntryForm extends React.Component {
  state = {
    regDate: "",
    regCenter: "",
    motivatedBy: "",
    name: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    rhType: "",
    fatherSpouseName: "",
    education: "",
    occupation: "",
    wb_check: false,
    wbDonor_lastDonation: "",
    wbDonor_nextDonation: "",
    platlet_check: false,
    platletDonor_lastDonation: "",
    platletDonor_nextDonation: "",
    plasma_check: false,
    plasmaDonor_lastDonation: "",
    plasmaDonor_nextDonation: "",
    drc_check: false,
    drcDonor_lastDonation: "",
    drcDonor_nextDonation: "",
    lastDonated_type: "",
    lastDonated_lastDonation: "",
    lastDonated_nextDonation: "",
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
    postOfficeList: [],
    motivatedByList: [],
    open: false,
    variant: "",
    message: ""
  };

  constructor(props: any) {
    super(props);
    axios
      .get(`${postOffice}`, {
        auth: {
          username,
          password
        }
      })
      .then((response: any) => {
        this.setState(() => ({
          postOfficeList: response.data.response
        }));
      })
      .catch(function(error: any) {
        console.log(`error in authentication : ${error}`);
      });
    axios
      .get(`${motivators}`, {
        auth: {
          username,
          password
        }
      })
      .then((response: any) => {
        this.setState(() => ({
          motivatedByList: response.data.response
        }));
      })
      .catch(function(error: any) {
        console.log(`error in authentication : ${error}`);
      });
  }

  handleChange = (name: any) => (event: any) => {
    this.setState({ [name]: event.target.value });
  };
  
  async fetchPincode(pincode: any, type: string) {
    await axios
      .get(session_url + pincode, {
        auth: {
          username,
          password
        }
      })
      .then((response: any) => {
        if (type == "residence") {
          this.setState({
            r_district: response.data.response.district,
            r_taluk: response.data.response.taluk,
            r_postOffice: response.data.response.postOffice
          });
        }
        if (type == "office") {
          this.setState({
            o_district: response.data.response.district,
            o_taluk: response.data.response.taluk,
            o_postOffice: response.data.response.postOffice
          });
        }
        console.log(JSON.stringify(response.data.response));
      })
      .catch(function(error: any) {
        console.log(`error in authentication : ${error}`);
      });
  }

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  onSaveSumbit = (event:any) => {
    event.preventDefault();
    let donorData = {
      donor: {
        regDate: this.state.regDate,
        regCenter: this.state.regCenter,
        motivatedBy: this.state.motivatedBy,
        name: this.state.name,
        dob: this.state.dob,
        gender: this.state.gender,
        bloodGroup: this.state.bloodGroup,
        rhType: this.state.rhType,
        fatherSpouseName: this.state.fatherSpouseName,
        education: this.state.education,
        occupation: this.state.occupation,
        wbDonor: {
          lastDonation: this.state.wbDonor_lastDonation,
          nextDonation: this.state.wbDonor_nextDonation
        },
        platletDonor: {
          lastDonation: this.state.platletDonor_lastDonation,
          nextDonation: this.state.platletDonor_nextDonation
        },
        plasmaDonor: {
          lastDonation: this.state.plasmaDonor_lastDonation,
          nextDonation: this.state.plasmaDonor_nextDonation
        },
        drcDonor: {
          lastDonation: this.state.drcDonor_lastDonation,
          nextDonation: this.state.drcDonor_nextDonation
        },
        lastDonated: {
          type: this.state.lastDonated_type,
          lastDonation: this.state.lastDonated_lastDonation,
          nextDonation: this.state.lastDonated_nextDonation
        },
        residentialAddress: {
          address: this.state.r_address,
          pincode: this.state.r_pincode,
          door: this.state.r_door,
          buildingName: this.state.r_buildingName,
          city: this.state.r_city,
          postOffice: this.state.r_postOffice,
          area: this.state.r_area,
          taluk: this.state.r_taluk,
          district: this.state.r_district,
          mobile: this.state.r_mobile,
          email: this.state.r_email,
          phone: this.state.r_phone
        },
        officeAddress: {
          address: this.state.o_address,
          pincode: this.state.o_pincode,
          door: this.state.o_door,
          buildingName: this.state.o_buildingName,
          city: this.state.o_city,
          postOffice: this.state.o_postOffice,
          area: this.state.o_area,
          taluk: this.state.o_taluk,
          district: this.state.o_district,
          phone: this.state.o_phone,
          email: this.state.o_email,
          mobile: this.state.o_mobile
        }
      }
    };
    console.log(JSON.stringify(donorData));
    axios
      .post(addDonor, donorData, {
        auth: {
          username,
          password
        }
      })
      .then((response: any) => {
        if (response.data.success == true){
          this.setState(DATA.D_DETAILS_BLANK);
                this.setState({ open: true,
                variant: "success",
                message: `Successfully added as ${response.data.response.id}`
                });
        }else{
          this.setState({
            open: true,
                variant: "error",
                message: `${response.data.response}`
          })
        }
      })
      .catch(function(error: any) {
        console.log(`error in authentication : ${error}`);
      });
  }

  render() {
    return (
      <div className="container">
        <div>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
          >
            <MySnackbarContentWrapper
              onClose={this.handleClose}
              variant={this.state.variant}
              message={this.state.message}
            />
          </Snackbar>
        </div>

        <h1>Donor Registration</h1>
        <p>Please fill all the required (*) information properly, we care about data.</p>
        <form
          className="form"
          autoComplete="off"
          onSubmit={this.onSaveSumbit}
        >
        <Card>
          <CardContent>
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
          <option  value="">
                select
              </option>
            {REG_CENTRE.map(option => (
              <option key={option} value={option}>
                {option}
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
            <option  value="">
                select
              </option>
              {this.state.motivatedByList.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </TextField>
            <h5>OR</h5>
            <TextField
              className="inputs"
              label="Motivated by"
              required
              type="text"
              value={this.state.motivatedBy}
              placeholder="Full Name"
              margin="normal"
              helperText="Fill Motivated by OR Select from list"
              InputLabelProps={{
                shrink: true
              }}
            />
          </FormControl>
          <br/>
          <Divider />
          <br/>
          <h3>Basic Information</h3>
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
          <option  value="">
                select
              </option>
            {GENDER.map((option: string) => (
              <option key={option} value={option}>
                {option}
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
          <option  value="">
                select
              </option>
            {BLOOD.map(option => (
              <option key={option} value={option}>
                {option}
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
          <option  value="">
                select
              </option>
            {RHTYPE.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
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
          <TextField
            label="Education"
            className="inputs"
            value={this.state.education}
            placeholder="Education"
            onChange={this.handleChange("education")}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            helperText="Fill about last degree"
            required
          />
          <TextField
            label="Occupation"
            className="inputs"
            value={this.state.occupation}
            placeholder="Occupation"
            onChange={this.handleChange("occupation")}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            helperText="Fill about occupation"
            required
          />
          <br/>
          <Divider />
          <br/>
          <h3>Blood Donation</h3>
          <p>It is mendatory to select WB for first time donor.</p>
          <FormControl error={false} component="div">
            <div className="fourInLine">

            <FormGroup className="formGroup">
              <FormControlLabel
                control={
                  <Checkbox
                    required
                    checked={this.state.wb_check}
                    onChange={() =>
                      this.setState({ wb_check: !this.state.wb_check })
                    }
                    value={`"${this.state.wb_check}"`}
                  />
                }
                label="WB Donor"
              />
              <TextField
                className="inputs"
                required
                label="Last Donation Date"
                disabled={this.state.wb_check ? false : true}
                type="date"
                onChange={this.handleChange("wbDonor_lastDonation")}
                value={this.state.wbDonor_lastDonation}
                helperText="Fill Date/Month/Year"
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
              />
              <TextField
                className="inputs"
                required
                label="Next Donation Date"
                disabled={this.state.wb_check ? false : true}
                type="date"
                onChange={this.handleChange("wbDonor_nextDonation")}
                value={this.state.wbDonor_nextDonation}
                helperText="Fill Date/Month/Year"
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
              />
            </FormGroup>
            <FormGroup className="formGroup">
              <FormControlLabel
                control={
                  <Checkbox
                    value={`"${this.state.platlet_check}"`}
                    onChange={() =>
                      this.setState({
                        platlet_check: !this.state.platlet_check
                      })
                    }
                    checked={this.state.platlet_check}
                  />
                }
                label="Platelet Donor"
              />
              <TextField
                className="inputs"
                label="Last Donation Date"
                disabled={this.state.platlet_check ? false : true}
                type="date"
                onChange={this.handleChange("platletDonor_lastDonation")}
                value={this.state.platletDonor_lastDonation}
                helperText="Fill Date/Month/Year"
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
              />
              <TextField
                className="inputs"
                label="Next Donation Date"
                disabled={this.state.platlet_check ? false : true}
                type="date"
                onChange={this.handleChange("platletDonor_nextDonation")}
                value={this.state.platletDonor_nextDonation}
                helperText="Fill Date/Month/Year"
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
              />
            </FormGroup>
            <FormGroup className="formGroup">
              <FormControlLabel
                control={
                  <Checkbox
                    value={`"${this.state.plasma_check}"`}
                    onChange={() =>
                      this.setState({ plasma_check: !this.state.plasma_check })
                    }
                    checked={this.state.plasma_check}
                  />
                }
                label="Plasma Donor"
              />
              <TextField
                className="inputs"
                label="Last Donation Date"
                disabled={this.state.plasma_check ? false : true}
                type="date"
                onChange={this.handleChange("plasmaDonor_lastDonation")}
                value={this.state.plasmaDonor_lastDonation}
                helperText="Fill Date/Month/Year"
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
              />
              <TextField
                className="inputs"
                label="Next Donation Date"
                disabled={this.state.plasma_check ? false : true}
                type="date"
                onChange={this.handleChange("plasmaDonor_nextDonation")}
                value={this.state.plasmaDonor_nextDonation}
                helperText="Fill Date/Month/Year"
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    value={`"${this.state.drc_check}"`}
                    onChange={() =>
                      this.setState({ drc_check: !this.state.drc_check })
                    }
                    checked={this.state.drc_check}
                  />
                }
                label="DRC Donor"
              />
              <TextField
                className="inputs"
                label="Last Donation Date"
                disabled={this.state.drc_check ? false : true}
                type="date"
                onChange={this.handleChange("drcDonor_lastDonation")}
                value={this.state.drcDonor_lastDonation}
                helperText="Fill Date/Month/Year"
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
              />
              <TextField
                className="inputs"
                label="Next Donation Date"
                disabled={this.state.drc_check ? false : true}
                type="date"
                onChange={this.handleChange("drcDonor_nextDonation")}
                value={this.state.drcDonor_nextDonation}
                helperText="Fill Date/Month/Year"
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
              />
            </FormGroup>
            </div>
          </FormControl>
          <br/>
          <Divider />
          <br/>
          <h3>Residence</h3>
          <TextField
            label="Pincode"
            className="inputs"
            placeholder="pincode"
            value={this.state.r_pincode}
            onChange={this.handleChange("r_pincode")}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            helperText="Enter 6 digit pincode."
            required
          />
          <Button
            variant="contained"
            onClick={() => this.fetchPincode(this.state.r_pincode, "residence")}
          >
            ...
          </Button>
          <TextField
            label="Door No, Street/Road"
            className="inputs"
            value={this.state.r_door}
            onChange={this.handleChange("r_door")}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            helperText="Please fill the required"
            required
          />
          <TextField
            label="Area"
            className="inputs"
            value={this.state.r_area}
            onChange={this.handleChange("r_area")}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            helperText="Please fill the area"
          />
          <TextField
            label="Taluk"
            className="inputs"
            disabled={true}
            value={this.state.r_taluk}
            onChange={this.handleChange("r_taluk")}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            label="Email Address"
            className="inputs"
            type="email"
            value={this.state.r_email}
            placeholder="example@email.com"
            onChange={this.handleChange("r_email")}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            label="Building Name"
            className="inputs"
            type="text"
            value={this.state.r_buildingName}
            placeholder="Building name here"
            onChange={this.handleChange("r_buildingName")}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            className="inputs"
            disabled={true}
            type="text"
            label="Post Office"
            value={this.state.r_postOffice}
            onChange={this.handleChange("r_postOffice")}
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            required
            helperText="This will be added from pincode."
            margin="normal"
          />
          
          <TextField
            label="District"
            className="inputs"
            disabled={true}
            value={this.state.r_district}
            onChange={this.handleChange("r_district")}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
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
            label="Old Format Residence Address"
            multiline
            rowsMax="4"
            className="inputs"
            value={this.state.r_address}
            onChange={this.handleChange("r_address")}
            margin="normal"
            placeholder="Door No, Street/Area,
          City, State"
            helperText="Provide Address in old format"
            InputLabelProps={{
              shrink: true
            }}
          />
          <br/>
          <Divider />
          <br/>             
          <h3>Office</h3>
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
          <Button
            variant="contained"
            onClick={() => this.fetchPincode(this.state.r_pincode, "office")}
          >
            ...
          </Button>
          <TextField
            label="Door No, Street/Road"
            className="inputs"
            value={this.state.o_door}
            onChange={this.handleChange("o_door")}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            helperText="Please fill the required"
            required
          />
          <TextField
            label="Area"
            className="inputs"
            value={this.state.o_area}
            onChange={this.handleChange("o_area")}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            helperText="Please fill the area"
          />
          <TextField
            label="Taluk"
            className="inputs"
            disabled={true}
            value={this.state.o_taluk}
            onChange={this.handleChange("o_taluk")}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            label="Email Address"
            className="inputs"
            type="email"
            value={this.state.o_email}
            placeholder="example@email.com"
            onChange={this.handleChange("o_email")}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            label="Building Name"
            className="inputs"
            type="text"
            value={this.state.o_buildingName}
            placeholder="Building name here"
            onChange={this.handleChange("o_buildingName")}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            className="inputs"
            disabled={true}
            type="text"
            label="Post Office"
            value={this.state.o_postOffice}
            onChange={this.handleChange("o_postOffice")}
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            required
            helperText="This will be added from pincode."
            margin="normal"
          />
          <TextField
            label="District"
            className="inputs"
            disabled={true}
            value={this.state.o_district}
            onChange={this.handleChange("o_district")}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            label="Mobile Number"
            className="inputs"
            type="number"
            value={this.state.o_mobile}
            onChange={this.handleChange("o_mobile")}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            label="Landline"
            className="inputs"
            type="number"
            value={this.state.o_phone}
            onChange={this.handleChange("o_phone")}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            label="Old Format Residence Address"
            multiline
            rowsMax="4"
            className="inputs"
            value={this.state.o_address}
            onChange={this.handleChange("o_address")}
            margin="normal"
            placeholder="Door No, Street/Area,
          City, State"
            helperText="Provide Address in old format"
            InputLabelProps={{
              shrink: true
            }}
          />
           </CardContent>
          </Card>
          <br />
          <Divider />
          <br />
          <Card>
            <CardContent>
          <div className="center">
            <Button
              className="inputs"
              variant="contained"
              color="default"
              type="submit"            
            >
              Save
            </Button>
            <Button
              className="inputs"
              variant="contained"
              color="default"
              onClick={() => {
                this.setState(DATA.D_DETAILS_BLANK);
                this.setState({ open: true,
                variant: "info",
                message: "All data cleared!"
                });
              }}
            >
              Reset
            </Button>
          </div> 
          </CardContent>
          </Card>
        </form>
      </div>
    );
  }
}

export default EntryForm;
