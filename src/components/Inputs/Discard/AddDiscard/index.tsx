import * as React from "react";
import Config from "../../../../Config";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MySnackbar from "../../../MySnackbar";
import Snackbar from "@material-ui/core/Snackbar";

const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const session_url = base_url + Config.PATHS.inputDiscard;

export default class AddDiscard extends React.Component {
  state = {
    discardDate: "",
    donorID: "",
    bagNo: "",
    collectionDate: "",
    staffName: "",
    reason:"",
    moName:"",
    success: false,
    errorText: "",
    variant: ""
  };
  async sendingData() {
    const data = {
      data: {
        discardDate: this.state.discardDate,
        donorID: parseInt(this.state.donorID, 10),
        bagNo: parseInt(this.state.bagNo,10),
        collectionDate: this.state.collectionDate,
        reason: this.state.reason,
        moName: this.state.moName,
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
            donorID: "",
            discardDate: "",
            bagNo: "",
            collectionDate: "",
            staffName: "",
            reason:"",
            moName: "",
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
            <h3>Input Discarded Blood Record</h3>
              <TextField
                className="inputs"
                label="Discard Date"
                required
                type="date"
                value={this.state.discardDate}
                onChange={this.handleChange("discardDate")}
                margin="normal"
                helperText="Date"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="Collection Date"
                required
                type="date"
                value={this.state.collectionDate}
                onChange={this.handleChange("collectionDate")}
                margin="normal"
                helperText="Date"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="Motivator Name"
                required
                type="text"
                margin="normal"
                value={this.state.moName}
                helperText="Motivator Name"
                onChange={this.handleChange("moName")}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="Bag Number"
                required
                type="text"
                margin="normal"
                value={this.state.bagNo}
                helperText="Enter Bag Number."
                onChange={this.handleChange("bagNo")}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="Reason"
                required
                type="text"
                margin="normal"
                value={this.state.reason}
                helperText="Valid donor ID"
                onChange={this.handleChange("reason")}
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
