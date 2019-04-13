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
const session_url = base_url + Config.PATHS.outputBMR;

export default class AddReject extends React.Component {
    state = {
        usedDate: "",
        name: "",
        age: "",
        hospitalName: "",
        donorID: "",
        quantity: "",
        sex: "",
        patientBloodGroup: "",
        patientRhType: "",
        component: "",
        salineMajor: "",
        salineMinor: "",
        bsaMajor: "",
        bsaMinor: "",
        coombsSeraMajor: "",
        coombsSeraMinor: "",
        compatible: "",
        staffName: "",
        success: false,
        errorText: "",
        variant: ""
    };
    async sendingData() {
        const data = {
            data: {
                usedDate: this.state.usedDate,
                name: this.state.name,
                age: this.state.age,
                hospitalName: this.state.hospitalName,
                donorID: parseInt(this.state.donorID,10),
                quantity: parseInt(this.state.quantity,10),
                sex: this.state.sex,
                patientBloodGroup: this.state.patientBloodGroup,
                patientRhType: this.state.patientRhType,
                component: this.state.component,
                salineMajor: this.state.salineMajor,
                salineMinor: this.state.salineMinor,
                bsaMajor: this.state.bsaMajor,
                bsaMinor: this.state.bsaMinor,
                coombsSeraMajor: this.state.coombsSeraMajor,
                coombsSeraMinor: this.state.coombsSeraMinor,
                compatible: this.state.compatible,
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
                        usedDate: "",
                        name: "",
                        age: "",
                        hospitalName: "",
                        donorID: "",
                        quantity: "",
                        sex: "",
                        patientBloodGroup: "",
                        patientRhType: "",
                        component: "",
                        salineMajor: "",
                        salineMinor: "",
                        bsaMajor: "",
                        bsaMinor: "",
                        coombsSeraMajor: "",
                        coombsSeraMinor: "",
                        compatible: "",
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
                                label="Used Date"
                                required
                                type="date"
                                margin="normal"
                                value={this.state.usedDate}
                                helperText="Enter Used Date."
                                onChange={this.handleChange("usedDate")}
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
                                label="Used Date"
                                required
                                type="date"
                                value={this.state.usedDate}
                                onChange={this.handleChange("usedDate")}
                                margin="normal"
                                helperText="DOB"
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
                                value={this.state.hospitalName}
                                helperText="Enter Address."
                                onChange={this.handleChange("hospitalName")}
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
