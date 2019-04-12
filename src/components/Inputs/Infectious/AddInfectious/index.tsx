import * as React from "react";
import Config from "../../../../Config";
import Data from "../../../Data";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MySnackbar from "../../../MySnackbar";
import Snackbar from "@material-ui/core/Snackbar";
const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const session_url = base_url + Config.PATHS.inputInfectious;

export default class AddInfectious extends React.Component {
  state = {
    date: "",
    donorID: "",
    spotHIV12: "",
    spotHBsAg: "",
    spotHCV: "",
    elisaHIV12: "",
    elisaHBsAg: "",
    elisaHCV: "",
    vdrl: "",
    malarialParasite: "",
    microFilaria: "",
    staffName: "",
    success: false,
    errorText: "",
    variant: ""
  };
  async sendingData() {
    const data = {
      data: {
        date: this.state.date,
        donorID: parseInt(this.state.donorID, 10),
        spotHIV12: this.state.spotHIV12,
        spotHBsAg: this.state.spotHBsAg,
        spotHCV: this.state.spotHCV,
        elisaHIV12: this.state.elisaHIV12,
        elisaHBsAg: this.state.elisaHBsAg,
        elisaHCV: this.state.elisaHCV,
        vdrl: this.state.vdrl,
        malarialParasite: this.state.malarialParasite,
        microFilaria: this.state.microFilaria,
        staffName: this.state.staffName
      }
    };
    console.log(`${data}${JSON.stringify(data)}`);
    await axios
      .post(session_url, data, {
        auth: {
          username,
          password
        }
      })
      .then((response: any) => {
        if (response.data.success == true) {
          this.setState({
            date: "",
            donorID: "",
            spotHIV12: "",
            spotHBsAg: "",
            spotHCV: "",
            elisaHIV12: "",
            elisaHBsAg: "",
            elisaHCV: "",
            vdrl: "",
            malarialParasite: "",
            microFilaria: "",
            staffName: "",
            success: true,
            errorText: "Successfully added",
            variant: "success"
          });
        } else {
          this.setState({
            success: true,
            errorText: response.data.response,
            variant: "error"
          });
          console.log(response.data.response + "hello");
        }
      })
      .catch(function(error: any) {
        console.log(`error in authentication : ${error}`);
      });
  }
  handleSnackbar = (event: any, reason: any) => {
    if (reason === "clickaway") return;
    this.setState({
      success: false
    });
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(JSON.stringify(this.state));
    this.sendingData();
  };

  handleChange = (name: any) => (event: any) => {
    this.setState({ [name]: event.target.value });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="input-container container">
            <div className="input-inputs">
            <h3>Input Infectious Record</h3>
              <TextField
                className="inputs"
                label="Date"
                required
                type="date"
                value={this.state.date}
                onChange={this.handleChange("date")}
                margin="normal"
                helperText="Date"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="Donor ID"
                required
                type="text"
                margin="normal"
                value={this.state.donorID}
                helperText="Valid donor ID"
                onChange={this.handleChange("donorID")}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                select
                label="spot HIV12"
                value={this.state.spotHIV12}
                onChange={this.handleChange("spotHIV12")}
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
                <option value="">Select a status</option>
                {Data.REPORT.map((option: any) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
              <TextField
                className="inputs"
                select
                label="SPOT HBsAg"
                value={this.state.spotHBsAg}
                onChange={this.handleChange("spotHBsAg")}
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
                <option value="">Select a status</option>
                {Data.REPORT.map((option: any) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
              <TextField
                className="inputs"
                select
                label="SPOT hcv"
                value={this.state.spotHCV}
                onChange={this.handleChange("spotHCV")}
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
                <option value="">Select a status</option>
                {Data.REPORT.map((option: any) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
              <TextField
                className="inputs"
                select
                label="Elias HIV12"
                value={this.state.elisaHIV12}
                onChange={this.handleChange("elisaHIV12")}
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
                <option value="">Select a status</option>
                {Data.REPORT.map((option: any) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
              <TextField
                className="inputs"
                select
                label="Elias hcv"
                value={this.state.elisaHCV}
                onChange={this.handleChange("elisaHCV")}
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
                <option value="">Select a status</option>
                {Data.REPORT.map((option: any) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
              <TextField
                className="inputs"
                select
                label="Eliase HBsAg"
                value={this.state.elisaHBsAg}
                onChange={this.handleChange("elisaHBsAg")}
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
                <option value="">Select a status</option>
                {Data.REPORT.map((option: any) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
              <TextField
                className="inputs"
                select
                label="vdrl"
                value={this.state.vdrl}
                onChange={this.handleChange("vdrl")}
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
                <option value="">Select a status</option>
                {Data.REPORT.map((option: any) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
              <TextField
                className="inputs"
                select
                label="Malarial Parasite"
                value={this.state.malarialParasite}
                onChange={this.handleChange("malarialParasite")}
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
                <option value="">Select a status</option>
                {Data.REPORT.map((option: any) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
              <TextField
                className="inputs"
                select
                label="Micro Filaria"
                value={this.state.microFilaria}
                onChange={this.handleChange("microFilaria")}
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
                <option value="">Select a status</option>
                {Data.REPORT.map((option: any) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
              <TextField
                className="inputs"
                label="Staff Name"
                required
                type="text"
                margin="normal"
                value={this.state.staffName}
                helperText="Enter Staff name."
                onChange={this.handleChange("staffName")}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>
            <div className="input-buttons">
              <Button
                className="inputs"
                type="submit"
                color="primary"
                variant="contained"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          open={this.state.success}
          autoHideDuration={6000}
          onClose={this.handleSnackbar}
        >
          <MySnackbar
            onClose={this.handleSnackbar}
            variant={this.state.variant}
            message={this.state.errorText}
          />
        </Snackbar>
      </div>
    );
  }
}
