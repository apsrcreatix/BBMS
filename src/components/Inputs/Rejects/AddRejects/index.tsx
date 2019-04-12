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
const session_url = base_url + Config.PATHS.inputReject;

export default class AddReject extends React.Component {
    state = {
        date: "",
        place: "",
        name: "",
        dob: "",
        address: "",
        phone: "",
        deferDuration: "",
        deferReason: "",
        success: false,
        errorText: "",
        variant: ""
    };
    async sendingData() {
        const data = {
            data: {
                date: this.state.date,
                place: this.state.place,
                name: this.state.name,
                dob: this.state.dob,
                address: this.state.address,
                phone: this.state.phone,
                deferDuration: this.state.deferDuration,
                deferReason: this.state.deferReason,
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
                        place: "",
                        name: "",
                        dob: "",
                        address: "",
                        phone: "",
                        deferDuration: "",
                        deferReason: "",
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
                            <h3>Input Reject Record</h3>
                            <TextField
                                className="inputs"
                                label="Place"
                                required
                                type="text"
                                margin="normal"
                                value={this.state.place}
                                helperText="Enter Place."
                                onChange={this.handleChange("place")}
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
                                helperText="Enter Name."
                                onChange={this.handleChange("name")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="Date of Birth"
                                required
                                type="date"
                                value={this.state.date}
                                onChange={this.handleChange("dob")}
                                margin="normal"
                                helperText="DOB"
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
                                label="Address"
                                required
                                type="text"
                                margin="normal"
                                value={this.state.address}
                                helperText="Enter Address."
                                onChange={this.handleChange("address")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="Phone Number"
                                required
                                type="numeric"
                                margin="normal"
                                value={this.state.phone}
                                helperText="Enter Phone Number."
                                onChange={this.handleChange("phone")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="Defer Duration"
                                required
                                type="text"
                                margin="normal"
                                value={this.state.deferDuration}
                                helperText="Enter Defer Duration."
                                onChange={this.handleChange("deferDuration")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="Defer Reason"
                                required
                                type="text"
                                margin="normal"
                                value={this.state.deferReason}
                                helperText="Enter Defer Reason."
                                onChange={this.handleChange("deferReason")}
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
