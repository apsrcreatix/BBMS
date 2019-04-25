import * as React from "react";
import Config from "../../../../Config";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MySnackbar from "../../../MySnackbar";
import Snackbar from "@material-ui/core/Snackbar";
import Data from "../../../Data"
const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const session_url = base_url + Config.PATHS.outputBMR;

export default class AddBMR extends React.Component {
    state = {
        donorID: "",
        collectionDate: "",
        bloodBank: "",
        donorName: "",
        bloodGroup: "",
        rhType: "",
        preparationDate: "",
        quantity: "",

        hiv12: "",
        hbsag: "",
        vdrl: "",
        microFilaria: "",

        irregularAntibody: "",

        prcQuantity: "",
        prcExpDate: "",
        prcPatientName: "",
        prcHospital: "",
        prcStatusLabel: "",
        prcStatusDate: "",

        pltQuantity: "",
        pltExpDate: "",
        pltPatientName: "",
        pltHospital: "",
        pltStatusLabel: "",
        pltStatusDate: "",

        ffpQuantity: "",
        ffpExpDate: "",
        ffpPatientName: "",
        ffpHospital: "",
        ffpStatusLabel: "",
        ffpStatusDate: "",

        cryoQuantity: "",
        cryoExpDate: "",
        cryoPatientName: "",
        cryoHospital: "",
        cryoStatusLabel: "",
        cryoStatusDate: "",

        wbQuantity: "",
        wbExpDate: "",
        wbPatientName: "",
        wbHospital: "",
        wbStatusLabel: "",
        wbStatusDate: "",

        medicalOfficer: "",

        success: false,
        errorText: "",
        variant: ""
    };
    async sendingData() {
        const data = {
            data: {
                donorID: parseInt(this.state.donorID, 10),
                collectionDate: this.state.collectionDate,
                bloodBank: this.state.bloodBank,
                donorName: this.state.donorName,
                bloodGroup: this.state.bloodGroup,
                rhType: this.state.rhType,
                preparationDate: this.state.preparationDate,
                quantity: this.state.quantity,

                hiv12: this.state.hiv12,
                hbsag: this.state.hbsag,
                vdrl: this.state.vdrl,
                microFilaria: this.state.microFilaria,

                irregularAntibody: this.state.irregularAntibody,

                prcQuantity: this.state.prcQuantity,
                prcExpDate: this.state.prcExpDate,
                prcPatientName: this.state.prcPatientName,
                prcHospital: this.state.prcHospital,
                prcStatusLabel: this.state.prcStatusLabel,
                prcStatusDate: this.state.prcStatusDate,

                pltQuantity: this.state.pltQuantity,
                pltExpDate: this.state.pltExpDate,
                pltPatientName: this.state.pltPatientName,
                pltHospital: this.state.pltHospital,
                pltStatusLabel: this.state.pltStatusLabel,
                pltStatusDate: this.state.pltStatusDate,

                ffpQuantity: this.state.ffpQuantity,
                ffpExpDate: this.state.ffpExpDate,
                ffpPatientName: this.state.ffpPatientName,
                ffpHospital: this.state.ffpHospital,
                ffpStatusLabel: this.state.ffpStatusLabel,
                ffpStatusDate: this.state.ffpStatusDate,

                cryoQuantity: this.state.cryoQuantity,
                cryoExpDate: this.state.cryoExpDate,
                cryoPatientName: this.state.cryoPatientName,
                cryoHospital: this.state.cryoHospital,
                cryoStatusLabel: this.state.cryoStatusLabel,
                cryoStatusDate: this.state.cryoStatusDate,

                wbQuantity: this.state.wbQuantity,
                wbExpDate: this.state.wbExpDate,
                wbPatientName: this.state.cryoPatientName,
                wbHospital: this.state.cryoHospital,
                wbStatusLabel: this.state.wbStatusLabel,
                wbStatusDate: this.state.wbStatusDate,

                medicalOfficer: this.state.medicalOfficer,
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
                        bloodBank: "",
                        donorName: "",
                        bloodGroup: "",
                        rhType: "",
                        preparationDate: "",
                        quantity: "",

                        hiv12: "",
                        hbsag: "",
                        vdrl: "",
                        microFilaria: "",

                        irregularAntibody: "",

                        prcQuantity: "",
                        prcExpDate: "",
                        prcPatientName: "",
                        prcHospital: "",
                        prcStatusLabel: "",
                        prcStatusDate: "",

                        pltQuantity: "",
                        pltExpDate: "",
                        pltPatientName: "",
                        pltHospital: "",
                        pltStatusLabel: "",
                        pltStatusDate: "",

                        ffpQuantity: "",
                        ffpExpDate: "",
                        ffpPatientName: "",
                        ffpHospital: "",
                        ffpStatusLabel: "",
                        ffpStatusDate: "",

                        cryoQuantity: "",
                        cryoExpDate: "",
                        cryoPatientName: "",
                        cryoHospital: "",
                        cryoStatusLabel: "",
                        cryoStatusDate: "",

                        wbQuantity: "",
                        wbExpDate: "",
                        wbPatientName: "",
                        wbHospital: "",
                        wbStatusLabel: "",
                        wbStatusDate: "",

                        medicalOfficer: "",

                        success: false,
                        errorText: "Successfully Added",
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
                            <h3>Input Blood Master Record</h3>
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
                                label="Quantity"
                                required
                                type="text"
                                margin="normal"
                                value={this.state.quantity}
                                helperText="Enter Quantity"
                                onChange={this.handleChange("quantity")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="HIV12"
                                required
                                type="text"
                                margin="normal"
                                value={this.state.hiv12}
                                helperText="HIV12"
                                onChange={this.handleChange("hiv12")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="HBSAG"
                                required
                                type="text"
                                margin="normal"
                                value={this.state.hbsag}
                                helperText="HBSAG"
                                onChange={this.handleChange("hbsag")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="VDRL"
                                required
                                type="text"
                                margin="normal"
                                value={this.state.vdrl}
                                helperText="VDRL"
                                onChange={this.handleChange("vdrl")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="Micro Filaria"
                                required
                                type="text"
                                margin="normal"
                                value={this.state.microFilaria}
                                helperText="Micro Filaria"
                                onChange={this.handleChange("microFilaria")}
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
                                label="Preparation Date"
                                required
                                type="date"
                                value={this.state.preparationDate}
                                onChange={this.handleChange("preparationDate")}
                                margin="normal"
                                helperText="Preparation Date"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="prc Quantity"
                                required
                                type="text"
                                value={this.state.prcQuantity}
                                onChange={this.handleChange("prcQuantity")}
                                margin="normal"
                                helperText="prc Quantity"
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
                                label="prc Patient Name"
                                required
                                type="text"
                                value={this.state.prcPatientName}
                                onChange={this.handleChange("prcPatientName")}
                                margin="normal"
                                helperText="prc Patient Name"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="prc Hospital"
                                required
                                type="text"
                                value={this.state.prcHospital}
                                onChange={this.handleChange("prcHospital")}
                                margin="normal"
                                helperText="prc Hospital"
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
                                label="plt Quantity"
                                required
                                type="text"
                                value={this.state.pltQuantity}
                                onChange={this.handleChange("pltQuantity")}
                                margin="normal"
                                helperText="plt Quantity"
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
                                label="plt Patient Name"
                                required
                                type="text"
                                value={this.state.pltPatientName}
                                onChange={this.handleChange("pltPatientName")}
                                margin="normal"
                                helperText="plt Patient Name"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="plt Hospital"
                                required
                                type="text"
                                value={this.state.pltHospital}
                                onChange={this.handleChange("pltHospital")}
                                margin="normal"
                                helperText="plt Hospital"
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
                                label="ffp Quantity"
                                required
                                type="text"
                                value={this.state.ffpQuantity}
                                onChange={this.handleChange("ffpQuantity")}
                                margin="normal"
                                helperText="ffp Quantity"
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
                                label="ffp Patient Name"
                                required
                                type="text"
                                value={this.state.ffpPatientName}
                                onChange={this.handleChange("ffpPatientName")}
                                margin="normal"
                                helperText="ffp Patient Name"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="ffp Hospital"
                                required
                                type="text"
                                value={this.state.ffpHospital}
                                onChange={this.handleChange("ffpHospital")}
                                margin="normal"
                                helperText="ffp Hospital"
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
                                label="cryo Quantity"
                                required
                                type="text"
                                value={this.state.cryoQuantity}
                                onChange={this.handleChange("cryoQuantity")}
                                margin="normal"
                                helperText="cryo Quantity"
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
                                label="cryo Patient Name"
                                required
                                type="text"
                                value={this.state.cryoPatientName}
                                onChange={this.handleChange("cryoPatientName")}
                                margin="normal"
                                helperText="cryo Patient Name"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="cryo Hospital"
                                required
                                type="text"
                                value={this.state.cryoHospital}
                                onChange={this.handleChange("cryoHospital")}
                                margin="normal"
                                helperText="cryo Hospital"
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
                                label="wb Quantity"
                                required
                                type="text"
                                value={this.state.wbQuantity}
                                onChange={this.handleChange("wbQuantity")}
                                margin="normal"
                                helperText="wb Quantity"
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
                                label="wb Patient Name"
                                required
                                type="text"
                                value={this.state.wbPatientName}
                                onChange={this.handleChange("wbPatientName")}
                                margin="normal"
                                helperText="wb Patient Name"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                className="inputs"
                                label="wb Hospital"
                                required
                                type="text"
                                value={this.state.wbHospital}
                                onChange={this.handleChange("wbHospital")}
                                margin="normal"
                                helperText="wb Hospital"
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
                                label="Medical Officer"
                                required
                                type="text"
                                margin="normal"
                                value={this.state.medicalOfficer}
                                helperText="Enter Medical Officer."
                                onChange={this.handleChange("medicalOffices")}
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
