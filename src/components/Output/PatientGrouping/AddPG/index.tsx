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
const session_url = base_url + Config.PATHS.outputPG;

export default class AddPG extends React.Component {
    state = {
        patient: "",
        age: "",
        sex: "",
        bloodGroup: "",
        rhType: "",
        hospital: "",
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
                patient: this.state.patient,
                age: this.state.age,
                sex: this.state.sex,
                bloodGroup: this.state.bloodGroup,
                rhType: this.state.rhType,
                hospital: this.state.hospital,
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
                        patient: "",
                        age: "",
                        sex: "",
                        bloodGroup: "",
                        rhType: "",
                        hospital: "",
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
                            <h3>Input Grouping Record</h3>
                            <TextField
                                className="inputs"
                                label="Patient"
                                required
                                type="text"
                                value={this.state.patient}
                                onChange={this.handleChange("patient")}
                                margin="normal"
                                helperText="Patient"
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
