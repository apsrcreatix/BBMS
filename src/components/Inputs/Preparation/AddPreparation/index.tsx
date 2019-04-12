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

export default class AddPreparation extends React.Component {
    state = {
        donorID: "",
        collectionDate: "",

        prcPrepDate: "",
        prcExpDate: "",
        prcStatusLabel: "",
        prcStatusDate: "",

        pltPrepDate: "",
        pltExpDate: "",
        pltStatusLabel: "",
        pltStatusDate: "",

        ffpPrepDate: "",
        ffpExpDate: "",
        ffpStatusLabel: "",
        ffpStatusDate: "",

        cryoPrepDate: "",
        cryoExpDate: "",
        cryoStatusLabel: "",
        cryoStatusDate: "",

        wbPrepDate: "",
        wbExpDate: "",
        wbStatusLabel: "",
        wbStatusDate: "",

        staffName: "",

        success: false,
        errorText: "",
        variant: ""
    };
    async sendingData() {
        const data = {
            data: {
                donorID: parseInt(this.state.donorID, 10),
                collectionDate: this.state.collectionDate,
                prcPrepDate: this.state.prcPrepDate,
                prcExpDate: this.state.prcExpDate,
                prcStatusLabel: this.state.prcStatusLabel,
                prcStatusDate: this.state.prcStatusDate,
                pltPrepDate: this.state.pltPrepDate,
                pltExpDate: this.state.pltExpDate,
                pltStatusLabel: this.state.pltStatusLabel,
                pltStatusDate: this.state.pltStatusDate,
                ffpPrepDate: this.state.ffpPrepDate,
                ffpExpDate: this.state.ffpExpDate,
                ffpStatusLabel: this.state.ffpStatusLabel,
                ffpStatusDate: this.state.ffpStatusDate,
                cryoPrepDate: this.state.cryoPrepDate,
                cryoExpDate: this.state.cryoExpDate,
                cryoStatusLabel: this.state.cryoStatusLabel,
                cryoStatusDate: this.state.cryoStatusDate,
                wbPrepDate: this.state.wbPrepDate,
                wbExpDate: this.state.wbExpDate,
                wbStatusLabel: this.state.wbStatusLabel,
                wbStatusDate: this.state.wbStatusDate,
                staffName: this.state.staffName,
                success: false,
                errorText: "",
                variant: ""
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
                        collectionDate: "",
                        prcPrepDate: "",
                        prcExpDate: "",
                        prcStatusLabel: "",
                        prcStatusDate: "",
                        pltPrepDate: "",
                        pltExpDate: "",
                        pltStatusLabel: "",
                        pltStatusDate: "",
                        ffpPrepDate: "",
                        ffpExpDate: "",
                        ffpStatusLabel: "",
                        ffpStatusDate: "",
                        cryoPrepDate: "",
                        cryoExpDate: "",
                        cryoStatusLabel: "",
                        cryoStatusDate: "",
                        wbPrepDate: "",
                        wbExpDate: "",
                        wbStatusLabel: "",
                        wbStatusDate: "",
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
                            <h3>Input Preparation Record</h3>
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
                                label="Collection Date"
                                required
                                type="date"
                                value={this.state.collectionDate}
                                onChange={this.handleChange("collectionDate")}
                                margin="normal"
                                helperText="Collection Date"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="prc Preparation Date"
                                required
                                type="date"
                                value={this.state.prcPrepDate}
                                onChange={this.handleChange("prcPrepDate")}
                                margin="normal"
                                helperText="prc Preparation Date"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="prc Expiry Date"
                                required
                                type="date"
                                value={this.state.prcExpDate}
                                onChange={this.handleChange("prcExpDate")}
                                margin="normal"
                                helperText="prc Expiry Date"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                select
                                label="prc Status Label"
                                required
                                type="string"
                                value={this.state.prcStatusLabel}
                                onChange={this.handleChange("prcStatusLabel")}
                                margin="normal"
                                helperText="prc Status Label"
                                InputLabelProps={{
                                    shrink: true
                                }}>
                                <option value="">Select a status</option>
                                {Data.STATUS.map((option: any) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </TextField>
                            <TextField
                                className="inputs"
                                label="prc Status Date"
                                required
                                type="date"
                                value={this.state.prcStatusDate}
                                onChange={this.handleChange("prcStatusDate")}
                                margin="normal"
                                helperText="prc Status Date"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="plt Preparation Date"
                                required
                                type="date"
                                value={this.state.pltPrepDate}
                                onChange={this.handleChange("pltPrepDate")}
                                margin="normal"
                                helperText="plt Preparation Date"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="plt Expiry Date"
                                required
                                type="date"
                                value={this.state.pltExpDate}
                                onChange={this.handleChange("pltExpDate")}
                                margin="normal"
                                helperText=" plt Expiry Date"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                select
                                label="plt Status Label"
                                required
                                value={this.state.pltStatusLabel}
                                onChange={this.handleChange("pltStatusLabel")}
                                margin="normal"
                                helperText="plt Status Label"
                                InputLabelProps={{
                                    shrink: true
                                }}>
                                <option value="">Select a status</option>
                                {Data.STATUS.map((option: any) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </TextField>
                            <TextField
                                className="inputs"
                                label="plt Status Date"
                                required
                                type="date"
                                value={this.state.pltStatusDate}
                                onChange={this.handleChange("pltStatusDate")}
                                margin="normal"
                                helperText="plt Status Date"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="ffp Preparation Date"
                                required
                                type="date"
                                value={this.state.ffpPrepDate}
                                onChange={this.handleChange("ffpPrepDate")}
                                margin="normal"
                                helperText="ffp Preparation Date"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="ffp Expiry Date"
                                required
                                type="date"
                                value={this.state.ffpExpDate}
                                onChange={this.handleChange("ffpExpDate")}
                                margin="normal"
                                helperText=" ffp Expiry Date"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                select
                                label="ffp Status Label"
                                required
                                value={this.state.ffpStatusLabel}
                                onChange={this.handleChange("ffpStatusLabel")}
                                margin="normal"
                                helperText="ffp Status Label"
                                InputLabelProps={{
                                    shrink: true
                                }}>
                                <option value="">Select a status</option>
                                {Data.STATUS.map((option: any) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </TextField>
                            <TextField
                                className="inputs"
                                label="ffp Status Date"
                                required
                                type="date"
                                value={this.state.ffpStatusDate}
                                onChange={this.handleChange("ffpStatusDate")}
                                margin="normal"
                                helperText="ffp Status Date"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="cryo Preparation Date"
                                required
                                type="date"
                                value={this.state.cryoPrepDate}
                                onChange={this.handleChange("cryoPrepDate")}
                                margin="normal"
                                helperText="cryo Preparation Date"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="cryo Expiry Date"
                                required
                                type="date"
                                value={this.state.cryoExpDate}
                                onChange={this.handleChange("cryoExpDate")}
                                margin="normal"
                                helperText=" cryo Expiry Date"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                select
                                label="cryo Status Label"
                                required
                                value={this.state.cryoStatusLabel}
                                onChange={this.handleChange("cryoStatusLabel")}
                                margin="normal"
                                helperText="cryo Status Label"
                                InputLabelProps={{
                                    shrink: true
                                }}>
                                <option value="">Select a status</option>
                                {Data.REPORT.map((option: any) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </TextField>
                            <TextField
                                className="inputs"
                                label="cryo Status Date"
                                required
                                type="date"
                                value={this.state.cryoStatusDate}
                                onChange={this.handleChange("cryoStatusDate")}
                                margin="normal"
                                helperText="cryo Status Date"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="wb Preparation Date"
                                required
                                type="date"
                                value={this.state.wbPrepDate}
                                onChange={this.handleChange("wbPrepDate")}
                                margin="normal"
                                helperText="wb Preparation Date"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="wb Expiry Date"
                                required
                                type="date"
                                value={this.state.wbExpDate}
                                onChange={this.handleChange("wbExpDate")}
                                margin="normal"
                                helperText=" wb Expiry Date"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                select
                                label="wb Status Label"
                                required
                                value={this.state.wbStatusLabel}
                                onChange={this.handleChange("wbStatusLabel")}
                                margin="normal"
                                helperText="wb Status Label"
                                InputLabelProps={{
                                    shrink: true
                                }}>
                                <option value="">Select a status</option>
                                {Data.STATUS.map((option: any) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </TextField>
                            <TextField
                                className="inputs"
                                label="wb Status Date"
                                required
                                type="date"
                                value={this.state.wbStatusDate}
                                onChange={this.handleChange("wbStatusDate")}
                                margin="normal"
                                helperText="wb Status Date"
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
