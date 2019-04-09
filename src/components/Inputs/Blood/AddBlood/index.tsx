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
const session_url = base_url + Config.PATHS.inputBlood;

export default class AddBlood extends React.Component {
  state = {
    type: "",
    quantity: "",
    donorID: "",
    hospitalName: "",
    issuedDate: "",
    collectionDate: "",
    expiryDate: "",
    success: false,
    errorText: "",
    variant: ""
  };
  async sendingData() {
    const data = {
      data: {
        type: this.state.type,
        quantity: parseInt(this.state.quantity, 10),
        donorID: parseInt(this.state.donorID, 10),
        hospitalName: this.state.hospitalName,
        issuedDate: this.state.issuedDate,
        collectionDate: this.state.collectionDate,
        expiryDate: this.state.expiryDate
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
            hospitalName: "",
            issuedDate: "",
            collectionDate: "",
            expiryDate: "",
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
            <h3>Input Blood Record</h3>
              <TextField
                className="inputs"
                select
                label="Type"
                value={this.state.type}
                onChange={this.handleChange("type")}
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
                {Data.INPUT_BLOOD.map((option: any) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
              <TextField
                className="inputs"
                label="Quantity"
                required
                type="number"
                value={this.state.quantity}
                onChange={this.handleChange("quantity")}
                margin="normal"
                helperText="Enter quantity"
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
                label="Hospital Name"
                required
                type="text"
                margin="normal"
                value={this.state.hospitalName}
                helperText="Enter hospital name."
                onChange={this.handleChange("hospitalName")}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="Issued Date"
                required
                type="date"
                value={this.state.issuedDate}
                onChange={this.handleChange("issuedDate")}
                margin="normal"
                helperText="Date you have purchased."
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="Collection date"
                required
                type="date"
                value={this.state.collectionDate}
                onChange={this.handleChange("collectionDate")}
                margin="normal"
                helperText="Manufracturing date on product"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="Expiry date"
                required
                type="date"
                value={this.state.expiryDate}
                onChange={this.handleChange("expiryDate")}
                margin="normal"
                helperText="Expiry date on product"
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
