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
const session_url = base_url + Config.PATHS.outputPreservation;

export default class AddSP extends React.Component {
    state = {
        donorID: "",
        bloodBank: "",
        donorName: "",
        bloodGroup: "",
        rhType: "",
        name: "",
        hospital: "",
        sample: "",
        second: "",
        third: "",
        fourth: "",
        fifth: "",
        sixth: "",
        seventh: "",
        discard: "",
        success: false,
        errorText: "",
        variant: ""
    };
    async sendingData() {
        const data = {
            data: {
                donorID: parseInt(this.state.donorID,10),
                bloodBank: this.state.bloodBank,
                donorName: this.state.donorName,
                bloodGroup: this.state.bloodGroup,
                rhType: this.state.rhType,
                name: this.state.name,
                hospital: this.state.hospital,
                sample: this.state.sample,
                second: this.state.second,
                third: this.state.third,
                fourth: this.state.fourth,
                fifth: this.state.fifth,
                sixth: this.state.sixth,
                seventh: this.state.seventh,
                discard: this.state.discard
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
                        bloodBank: "",
                        donorName: "",
                        bloodGroup: "",
                        rhType: "",
                        name: "",
                        hospital: "",
                        sample: "",
                        second: "",
                        third: "",
                        fourth: "",
                        fifth: "",
                        sixth: "",
                        seventh: "",
                        discard: "",
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
            .catch(function (error: any) {
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
                            <h3>Input Preservation Record</h3>
                            <TextField
                                className="inputs"
                                label="Donor ID"
                                required
                                type="numeric"
                                value={this.state.donorID}
                                onChange={this.handleChange("donorID")}
                                margin="normal"
                                helperText="Donor ID"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="Blood Bank"
                                required
                                type="text"
                                margin="normal"
                                value={this.state.bloodBank}
                                helperText="Enter Blood Bank"
                                onChange={this.handleChange("bloodBank")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="Donor Name"
                                required
                                type="text"
                                margin="normal"
                                value={this.state.donorName}
                                helperText="Enter Donor Name"
                                onChange={this.handleChange("donorName")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="Blood Group"
                                required
                                type="text"
                                margin="normal"
                                value={this.state.bloodGroup}
                                helperText="Enter Blood Group"
                                onChange={this.handleChange("bloodGroup")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="Rh Type"
                                required
                                type="text"
                                margin="normal"
                                value={this.state.rhType}
                                helperText="Enter Rh Type"
                                onChange={this.handleChange("rhType")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="Hospital"
                                required
                                type="text"
                                margin="normal"
                                value={this.state.hospital}
                                helperText="Enter Hospital."
                                onChange={this.handleChange("hospital")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="Name"
                                required
                                type="text"
                                margin="normal"
                                value={this.state.name}
                                helperText="Enter Name"
                                onChange={this.handleChange("name")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="Sample Date"
                                required
                                type="date"
                                margin="normal"
                                value={this.state.sample}
                                helperText="Enter Sample Date"
                                onChange={this.handleChange("sample")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="Second Date"
                                required
                                type="date"
                                margin="normal"
                                value={this.state.second}
                                helperText="Enter Second Date"
                                onChange={this.handleChange("second")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="Third Date"
                                required
                                type="date"
                                margin="normal"
                                value={this.state.third}
                                helperText="Enter Third Date"
                                onChange={this.handleChange("third")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="Fourth Date"
                                required
                                type="date"
                                margin="normal"
                                value={this.state.fourth}
                                helperText="Enter Fourth Date"
                                onChange={this.handleChange("fourth")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="Fifth Date"
                                required
                                type="date"
                                margin="normal"
                                value={this.state.fifth}
                                helperText="Enter Fifth Date"
                                onChange={this.handleChange("fifth")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="Sixth Date"
                                required
                                type="date"
                                margin="normal"
                                value={this.state.sixth}
                                helperText="Enter Sixth Date"
                                onChange={this.handleChange("sixth")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="Seventh Date"
                                required
                                type="date"
                                margin="normal"
                                value={this.state.seventh}
                                helperText="Enter Seventh Date"
                                onChange={this.handleChange("seventh")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="Discards"
                                required
                                type="text"
                                margin="normal"
                                value={this.state.discard}
                                helperText="Enter Discard Date"
                                onChange={this.handleChange("discard")}
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
