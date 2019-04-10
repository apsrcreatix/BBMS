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
const session_url = base_url + Config.PATHS.inputScreening;

export default class AddScreening extends React.Component {
  state = {
    date: "",
    donorID: "",
    hiv12: "",
    hbsag: "",
    hcv: "",
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
        hiv12: this.state.hiv12,
        hcv: this.state.hcv,
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
            type: "",
            quantity: "",
            donorID: "",
            hiv12: "",
            hbsag: "",
            hcv: "",
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
            <h3>Input Screening Record</h3>
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
                label="hiv12"
                value={this.state.hiv12}
                onChange={this.handleChange("hiv12")}
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
                label="hbsag"
                value={this.state.hbsag}
                onChange={this.handleChange("hbsag")}
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
                label="hcv"
                value={this.state.hcv}
                onChange={this.handleChange("hcv")}
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
