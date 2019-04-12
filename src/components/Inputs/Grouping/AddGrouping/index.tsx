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
const session_url = base_url + Config.PATHS.inputGrouping;

export default class AddGrouping extends React.Component {
  state = {
    donorID: "",
    date: "",
    antiA: "",
    antiB: "",
    antiAB: "",
    antiD: "",
    dTest: "",
    a1Lectin: "",
    aCells: "",
    bCells: "",
    saline: "",
    papain: "",
    staffName: "",
    success: false,
    errorText: "",
    variant: ""
  };
  async sendingData() {
    const data = {
      data: {
        donorID: parseInt(this.state.donorID, 10),
        date: this.state.date,
        antiA: this.state.antiA,
        antiB: this.state.antiB,
        antiAB: this.state.antiAB,
        antiD: this.state.antiD,
        dTest: this.state.dTest,
        a1Lectine: this.state.a1Lectin,
        aCells: this.state.aCells,
        bCells: this.state.bCells,
        saline: this.state.saline,
        papain: this.state.papain,
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
            date: "",
            antiA: "",
            antiB: "",
            antiAB: "",
            antiD: "",
            dTest: "",
            a1Lectin: "",
            aCells: "",
            bCells: "",
            saline: "",
            papain: "",
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
            <h3>Input Grouping Record</h3>
              <TextField
                className="inputs"
                label="Donor ID"
                required
                type="numeric"
                value={this.state.donorID}
                onChange={this.handleChange("donorID")}
                margin="normal"
                helperText="DonorID"
                InputLabelProps={{
                  shrink: true
                }}
              />
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
                label="anti A"
                required
                type="text"
                margin="normal"
                value={this.state.antiA}
                helperText="Anti A"
                onChange={this.handleChange("antiA")}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="anti B"
                required
                type="text"
                margin="normal"
                value={this.state.antiB}
                helperText="Anti B"
                onChange={this.handleChange("antiB")}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="anti AB"
                required
                type="text"
                margin="normal"
                value={this.state.antiAB}
                helperText="Anti AB"
                onChange={this.handleChange("antiAB")}
                InputLabelProps={{
                    shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="anti D"
                required
                type="text"
                margin="normal"
                value={this.state.antiD}
                helperText="Anti D"
                onChange={this.handleChange("antiD")}
                InputLabelProps={{
                    shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="dTest"
                required
                type="text"
                margin="normal"
                value={this.state.dTest}
                helperText="d Test"
                onChange={this.handleChange("dTest")}
                InputLabelProps={{
                    shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="a1Lactin"
                required
                type="text"
                margin="normal"
                value={this.state.a1Lectin}
                helperText="a1Lectin"
                onChange={this.handleChange("a1Lectin")}
                InputLabelProps={{
                    shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="aCells"
                required
                type="text"
                margin="normal"
                value={this.state.aCells}
                helperText="aCells"
                onChange={this.handleChange("aCells")}
                InputLabelProps={{
                    shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="bCells"
                required
                type="text"
                margin="normal"
                value={this.state.bCells}
                helperText="bCells"
                onChange={this.handleChange("bCells")}
                InputLabelProps={{
                    shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="saline"
                required
                type="text"
                margin="normal"
                value={this.state.saline}
                helperText="Saline"
                onChange={this.handleChange("saline")}
                InputLabelProps={{
                    shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="Papain"
                required
                type="text"
                margin="normal"
                value={this.state.papain}
                helperText="Papain"
                onChange={this.handleChange("papain")}
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
                onChange={this.handleChange("staffName")}  InputLabelProps={{
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
