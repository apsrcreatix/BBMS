import * as React from "react";
import Config from "../../../../Config";
//import Data from "../../../Data";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MySnackbar from "../../../MySnackbar";
import Snackbar from "@material-ui/core/Snackbar";
const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const session_url = base_url + Config.PATHS.outputCM;

export default class AddCM extends React.Component {
    state = {
        donorID: "",
        bloodBank: "",
        donorName: "",
        bloodGroup: "",
        rhType: "",
        usedDate: "",
        name: "",
        age: "",
        sex: "",
        patientBloodGroup: "",
        patientRhType: "",
        hospitalName: "",
        component: "",
        normalSaline_major: "",
        normalSaline_minor: "",
        bsa_major: "",
        bsa_minor: "",
        coombsSera_major: "",
        coombsSera_minor: "",
        compatible: "",
        staffName: "",
        success: false,
        errorText: "",
        variant: ""
    };
    async sendingData() {
        const data = {
            data: {
                donorID: parseInt(this.state.donorID, 10),
                bloodBank: this.state.bloodBank,
                donorName: this.state.donorName,
                bloodGroup: this.state.bloodGroup,
                rhType: this.state.rhType,
                usedDate: this.state.usedDate,
                name: this.state.name,
                age: parseInt(this.state.age, 10),
                sex: this.state.sex,
                patientBloodGroup: this.state.patientBloodGroup,
                patientRhType: this.state.patientRhType,
                hospitalName: this.state.hospitalName,
                component: this.state.component,
                normalSaline_major: this.state.normalSaline_major,
                normalSaline_minor: this.state.normalSaline_minor,
                bsa_major: this.state.bsa_major,
                bsa_minor: this.state.bsa_minor,
                coombsSera_major: this.state.coombsSera_major,
                coombsSera_minor: this.state.coombsSera_minor,
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
                        donorID: "",
                        bloodBank: "",
                        donorName: "",
                        bloodGroup: "",
                        rhType: "",
                        usedDate: "",
                        name: "",
                        age: "",
                        sex: "",
                        patientBloodGroup: "",
                        patientRhType: "",
                        hospitalName: "",
                        component: "",
                        normalSaline_major: "",
                        normalSaline_minor: "",
                        bsa_major: "",
                        bsa_minor: "",
                        coombsSera_major: "",
                        coombsSera_minor: "",
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
                            <h3>Input Cross Matching</h3>
                            <TextField
                                className="inputs"
                                type="number"
                                label="Donor ID"
                                value={this.state.donorID}
                                onChange={this.handleChange("donorID")}
                                SelectProps={{
                                    native: true
                                }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                required
                                margin="normal"
                            >
                            </TextField>
                            <TextField
                                className="inputs"
                                label="donorName"
                                required
                                type="text"
                                value={this.state.donorName}
                                onChange={this.handleChange("donorName")}
                                margin="normal"
                                helperText="Enter Donor Name"
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
                                helperText="Enter Blood Bank."
                                onChange={this.handleChange("bloodBank")}
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
                                helperText="Enter Blood Group."
                                onChange={this.handleChange("bloodGroup")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="rhType"
                                required
                                type="text"
                                margin="normal"
                                value={this.state.rhType}
                                helperText="Enter vdrl."
                                onChange={this.handleChange("rhType")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="Used Date"
                                required
                                type="date"
                                margin="normal"
                                value={this.state.usedDate}
                                helperText="Enter Date."
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
                                helperText="Enter name."
                                onChange={this.handleChange("name")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="Age"
                                required
                                type="number"
                                value={this.state.age}
                                onChange={this.handleChange("age")}
                                margin="normal"
                                helperText="Age"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="Sex"
                                required
                                type="text"
                                value={this.state.sex}
                                onChange={this.handleChange("sex")}
                                margin="normal"
                                helperText="Enter Sex"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />

                            <TextField
                                className="inputs"
                                label="Patient Blood Group"
                                required
                                type="text"
                                value={this.state.patientBloodGroup}
                                onChange={this.handleChange("patientBloodGroup")}
                                margin="normal"
                                helperText="Enter Patient Blood Group"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="Patient RhType"
                                required
                                type="text"
                                value={this.state.patientRhType}
                                onChange={this.handleChange("patientRhType")}
                                margin="normal"
                                helperText="Enter Patient RhType"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="Hospital Name"
                                required
                                type="text"
                                value={this.state.hospitalName}
                                onChange={this.handleChange("hospitalName")}
                                margin="normal"
                                helperText="Enter Hospital Name"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                type="text"
                                label="Component"
                                required
                                value={this.state.component}
                                onChange={this.handleChange("component")}
                                margin="normal"
                                helperText="Status Label"
                                InputLabelProps={{
                                    shrink: true
                                }}>
                            </TextField>
                            <TextField
                                className="inputs"
                                label="Normal Saline Major"
                                required
                                type="text"
                                value={this.state.normalSaline_major}
                                onChange={this.handleChange("normalSaline_major")}
                                margin="normal"
                                helperText="Normal Saline Major"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="Normal Saline Minor"
                                required
                                type="text"
                                value={this.state.normalSaline_minor}
                                onChange={this.handleChange("normalSaline_minor")}
                                margin="normal"
                                helperText="Normal Saline Minor"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="BSA Major"
                                required
                                type="text"
                                value={this.state.bsa_major}
                                onChange={this.handleChange("bsa_major")}
                                margin="normal"
                                helperText="BSA Major"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="BSA Minor"
                                required
                                type="text"
                                value={this.state.bsa_minor}
                                onChange={this.handleChange("bsa_minor")}
                                margin="normal"
                                helperText="BSA Minor"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="Coombs Sera Major"
                                required
                                type="text"
                                value={this.state.coombsSera_major}
                                onChange={this.handleChange("oombsSera_major")}
                                margin="normal"
                                helperText="Coombs Sera Major"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="Coombs Sera Minor"
                                required
                                type="text"
                                value={this.state.coombsSera_minor}
                                onChange={this.handleChange("oombsSera_minor")}
                                margin="normal"
                                helperText="Coombs Sera Minor"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="Compatible"
                                required
                                type="text"
                                value={this.state.compatible}
                                onChange={this.handleChange("compatible")}
                                margin="normal"
                                helperText="Compatible"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="Staff Name"
                                required
                                type="text"
                                value={this.state.staffName}
                                onChange={this.handleChange("staffName")}
                                margin="normal"
                                helperText="Enter Staff Name"
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
