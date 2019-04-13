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
const session_url = base_url + Config.PATHS.outputBlood;

export default class AddBlood extends React.Component {
  state = {
    type: "",
    quantity: "",
    donorID: "",
    preparationDate: "",
    collectionDate: "",
    hiv12: "",
    hbsag: "",
    vdrl: "",
    microFilaria: "",
    irregularAntibody: "",
    prcQuantity: "",
    prcExpiryDate: "",
    prcPatientName: "",
    prcHospital: "",
    prcLabel: "",
    prcDate: "",
    pltQuantity: "",
    pltExpiryDate: "",
    pltPatientName: "",
    pltHospital: "",
    pltLabel: "",
    pltDate: "",
    ffpQuantity: "",
    ffpExpiryDate: "",
    ffpPatientName: "",
    ffpHospital: "",
    ffpLabel: "",
    ffpDate: "",
    wbQuantity: "",
    wbExpiryDate: "",
    wbPatientName: "",
    wbHospital: "",
    wbLabel: "",
    wbDate: "",
    cryoQuantity: "",
    cryoExpiryDate: "",
    cryoPatientName: "",
    cryoHospital: "",
    cryoLabel: "",
    cryoDate: "",
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
        preparationDate: this.state.preparationDate,
        collectionDate: this.state.collectionDate,
        hiv12: this.state.hiv12,
        hbsag: this.state.hbsag,
        vdrl: this.state.vdrl,
        microFilaria: this.state.microFilaria,
        irregularAntibody: this.state.irregularAntibody,
        prcQuantity: this.state.prcQuantity,
        prcExpiryDate: this.state.prcExpiryDate,
        prcPatientName: this.state.prcPatientName,
        prcHospital: this.state.prcHospital,
        prcLabel: this.state.prcLabel,
        prcDate: this.state.prcDate,
        pltQuantity: this.state.pltQuantity,
        pltExpiryDate: this.state.pltExpiryDate,
        pltPatientName: this.state.pltPatientName,
        pltHospital: this.state.pltHospital,
        pltLabel: this.state.pltLabel,
        pltDate: this.state.pltDate,
        ffpQuantity: this.state.ffpQuantity,
        ffpExpiryDate: this.state.ffpExpiryDate,
        ffpPatientName: this.state.ffpPatientName,
        ffpHospital: this.state.ffpHospital,
        ffpLabel: this.state.ffpLabel,
        ffpDate: this.state.ffpDate,
        wbQuantity: this.state.wbQuantity,
        wbExpiryDate: this.state.wbExpiryDate,
        wbPatientName: this.state.wbPatientName,
        wbHospital: this.state.wbHospital,
        wbLabel: this.state.wbLabel,
        wbDate: this.state.wbDate,
        cryoQuantity: this.state.cryoQuantity,
        cryoExpiryDate: this.state.cryoExpiryDate,
        cryoPatientName: this.state.cryoPatientName,
        cryoHospital: this.state.cryoHospital,
        cryoLabel: this.state.cryoLabel,
        cryoDate: this.state.cryoDate
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
            preparationDate: "",
            collectionDate: "",
            hiv12: "",
            hbsag: "",
            vdrl: "",
            microFilaria: "",
            irregularAntibody: "",
            prcQuantity: "",
            prcExpiryDate: "",
            prcPatientName: "",
            prcHospital: "",
            prcLabel: "",
            prcDate: "",
            pltQuantity: "",
            pltExpiryDate: "",
            pltPatientName: "",
            pltHospital: "",
            pltLabel: "",
            pltDate: "",
            ffpQuantity: "",
            ffpExpiryDate: "",
            ffpPatientName: "",
            ffpHospital: "",
            ffpLabel: "",
            ffpDate: "",
            wbQuantity: "",
            wbExpiryDate: "",
            wbPatientName: "",
            wbHospital: "",
            wbLabel: "",
            wbDate: "",
            cryoQuantity: "",
            cryoExpiryDate: "",
            cryoPatientName: "",
            cryoHospital: "",
            cryoLabel: "",
            cryoDate: "",
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
                label="Hiv12"
                required
                type="text"
                margin="normal"
                value={this.state.hiv12}
                helperText="Enter hiv12."
                onChange={this.handleChange("hiv12")}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="hbsag"
                required
                type="text"
                margin="normal"
                value={this.state.hbsag}
                helperText="Enter hbsag."
                onChange={this.handleChange("hbsag")}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="vdrl"
                required
                type="text"
                margin="normal"
                value={this.state.vdrl}
                helperText="Enter vdrl."
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
                helperText="Enter Micro Filaria data."
                onChange={this.handleChange("microFilaria")}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="Irregular Antibody"
                required
                type="text"
                margin="normal"
                value={this.state.irregularAntibody}
                helperText="Enter Irregular Antibody data."
                onChange={this.handleChange("irregularAntibody")}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="Issued Date"
                required
                type="date"
                value={this.state.preparationDate}
                onChange={this.handleChange("preparationDate")}
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
                label="prc Quantity"
                required
                type="number"
                value={this.state.prcQuantity}
                onChange={this.handleChange("prcQuantity")}
                margin="normal"
                helperText="Enter Quantity"
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
                helperText="Enter Patient Name"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="prc Hospital"
                required
                type="date"
                value={this.state.prcHospital}
                onChange={this.handleChange("prcHospital")}
                margin="normal"
                helperText="Enter Hospital"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                select
                label="prc Label"
                required
                value={this.state.prcLabel}
                onChange={this.handleChange("prcLabel")}
                margin="normal"
                helperText="Status Label"
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
                label="prc Date"
                required
                type="date"
                value={this.state.prcDate}
                onChange={this.handleChange("prcDate")}
                margin="normal"
                helperText="Date DDMMYYY"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="prc Expiry date"
                required
                type="date"
                value={this.state.prcExpiryDate}
                onChange={this.handleChange("prcExpiryDate")}
                margin="normal"
                helperText="Expiry date on product"
                InputLabelProps={{
                  shrink: true
                }}
              />

              <TextField
                className="inputs"
                label="plt Quantity"
                required
                type="number"
                value={this.state.pltQuantity}
                onChange={this.handleChange("pltQuantity")}
                margin="normal"
                helperText="Enter Quantity"
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
                helperText="Enter Patient Name"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="plt Hospital"
                required
                type="date"
                value={this.state.pltHospital}
                onChange={this.handleChange("pltHospital")}
                margin="normal"
                helperText="Enter Hospital"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                select
                label="plt Label"
                required
                value={this.state.pltLabel}
                onChange={this.handleChange("pltLabel")}
                margin="normal"
                helperText="Status Label"
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
                label="plt Date"
                required
                type="date"
                value={this.state.pltDate}
                onChange={this.handleChange("pltDate")}
                margin="normal"
                helperText="Date DDMMYYY"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="plt Expiry date"
                required
                type="date"
                value={this.state.pltExpiryDate}
                onChange={this.handleChange("pltExpiryDate")}
                margin="normal"
                helperText="Expiry date on product"
                InputLabelProps={{
                  shrink: true
                }}
              />

              <TextField
                className="inputs"
                label="ffp Quantity"
                required
                type="number"
                value={this.state.ffpQuantity}
                onChange={this.handleChange("ffpQuantity")}
                margin="normal"
                helperText="Enter Quantity"
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
                helperText="Enter Patient Name"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="ffp Hospital"
                required
                type="date"
                value={this.state.ffpHospital}
                onChange={this.handleChange("ffpHospital")}
                margin="normal"
                helperText="Enter Hospital"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                select
                label="ffp Label"
                required
                value={this.state.ffpLabel}
                onChange={this.handleChange("ffpLabel")}
                margin="normal"
                helperText="Status Label"
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
                label="ffp Date"
                required
                type="date"
                value={this.state.ffpDate}
                onChange={this.handleChange("ffpDate")}
                margin="normal"
                helperText="Date DDMMYYY"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="ffp Expiry date"
                required
                type="date"
                value={this.state.ffpExpiryDate}
                onChange={this.handleChange("ffpExpiryDate")}
                margin="normal"
                helperText="Expiry date on product"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="wb Quantity"
                required
                type="number"
                value={this.state.wbQuantity}
                onChange={this.handleChange("wbQuantity")}
                margin="normal"
                helperText="Enter Quantity"
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
                helperText="Enter Patient Name"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="wb Hospital"
                required
                type="date"
                value={this.state.wbHospital}
                onChange={this.handleChange("wbHospital")}
                margin="normal"
                helperText="Enter Hospital"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                select
                label="wb Label"
                required
                value={this.state.wbLabel}
                onChange={this.handleChange("wbLabel")}
                margin="normal"
                helperText="Status Label"
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
                label="wb Date"
                required
                type="date"
                value={this.state.wbDate}
                onChange={this.handleChange("wbDate")}
                margin="normal"
                helperText="Date DDMMYYY"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="wb Expiry date"
                required
                type="date"
                value={this.state.wbExpiryDate}
                onChange={this.handleChange("wbExpiryDate")}
                margin="normal"
                helperText="Expiry date on product"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="cryo Quantity"
                required
                type="number"
                value={this.state.cryoQuantity}
                onChange={this.handleChange("cryoQuantity")}
                margin="normal"
                helperText="Enter Quantity"
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
                helperText="Enter Patient Name"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="cryo Hospital"
                required
                type="date"
                value={this.state.cryoHospital}
                onChange={this.handleChange("cryoHospital")}
                margin="normal"
                helperText="Enter Hospital"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                select
                label="cryo Label"
                required
                value={this.state.cryoLabel}
                onChange={this.handleChange("cryoLabel")}
                margin="normal"
                helperText="Status Label"
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
                label="cryo Date"
                required
                type="date"
                value={this.state.cryoDate}
                onChange={this.handleChange("cryoDate")}
                margin="normal"
                helperText="Date DDMMYYY"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className="inputs"
                label="cryo Expiry date"
                required
                type="date"
                value={this.state.cryoExpiryDate}
                onChange={this.handleChange("cryoExpiryDate")}
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
