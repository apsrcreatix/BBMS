import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Config from "../../../../Config";
import MySnackbar from "../../../MySnackbar";
import Snackbar from '@material-ui/core/Snackbar';

const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const use_serum_url = base_url + Config.PATHS.useSerums;

interface UseSerumProps {
  open: boolean;
  passed: any;
  onClose: any;
}

export default class UseSerum extends React.Component<UseSerumProps> {
  state = {
    open: this.props.open,
    passedData: this.props.passed,
    _id: this.props.passed._id,
    type: this.props.passed.type,
    usedDate: "",
    status: "",
    use: "",
    donorID: "",
    patientName: "",
    testCount: "",
    missedRepeatedCount: "",
    technicianName: "",
    snackOpen: false,
    snackVariant: "",
    snackMessage: ""
  };
  // TODO
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.open !== this.props.open) {
      this.setState({ open: nextProps.open });
    }
  }

  handleEntering = () => {
    console.log("focusing...");
  };

  handleCancel = () => {
    this.props.onClose(this.props.open);
    this.setState({
      open: this.props.open,
      passedData: this.props.passed,
      _id: this.props.passed._id,
      type: this.props.passed.type,
      usedDate: "",
      status: "",
      use: "",
      donorID: "",
      patientName: "",
      testCount: "",
      missedRepeatedCount: "",
      technicianName: ""
    });
  };
  handleSnackbar=(event:any,reason:any)=>{
    if(reason === 'clickaway') return;
    this.setState({
      snackOpen: false
    });
  }
  filterState() {
    var data = {
      data: {}
    };
    var filter = {
      _id: this.props.passed._id,
      type: this.props.passed.type
    };
    if (this.state.status == "REJECTED") {
      filter = Object.assign(filter, {
        status: "REJECTED",
        testCount: parseInt(this.state.testCount,10),
        usedDate: this.state.usedDate,
        technicianName: this.state.technicianName
            });
    } else if (this.state.status == "USED") {
      filter = Object.assign(filter, {
        usedDate: this.state.usedDate,
        status: this.state.status,
        use: this.state.use,
        testCount: parseInt(this.state.testCount,10),
        missedRepeatedCount: parseInt(this.state.missedRepeatedCount,10),
        technicianName: this.state.technicianName
      });
      if (this.state.patientName != "") {
        filter = Object.assign(filter, {
          patientName: this.state.patientName
        });
      }
      if (this.state.donorID != "") {
        filter = Object.assign(filter, {
          donorID: parseInt(this.state.donorID,10)
        });
      }
    }
    Object.assign(data, {
      data: filter
    });
    return data;
  }
  async sendingData() {
    const data = this.filterState();
    await axios
      .post(use_serum_url, data, {
        auth: {
          username,
          password
        }
      })
      .then((response: any) => {
        if(response.data.success){
          this.setState({
            snackOpen: true,
            snackVariant: "success",
            snackMessage: "Success! Please click apply again."
          });
          this.setState({
            open: this.props.open,
            passedData: this.props.passed,
            _id: this.props.passed._id,
            type: this.props.passed.type,
            usedDate: "",
            status: "",
            use: "",
            donorID: "",
            patientName: "",
            testCount: "",
            missedRepeatedCount: "",
            technicianName: ""
          });
          this.props.onClose(this.props.open);
        }else{
          this.setState({
            snackOpen: true,
            snackVariant: "error",
            snackMessage: response.data.response
          });
        }
      })
      .catch(function(error: any) {
        console.log(`error in authentication : ${error}`);
      });
      return true;
  }
 handleSubmit = (event: any) => {
    event.preventDefault();
    const result =  this.sendingData();
    console.log(result);
  };

  handleChange = (name: any) => (event: any) => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { ...other } = this.props;
    return (
      <div>
         
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        onEntering={this.handleEntering}
        aria-labelledby="confirmation-dialog-title"
        {...other}
      >
        <form onSubmit={this.handleSubmit}>
          <DialogTitle id="confirmation-dialog-title">Use Serums</DialogTitle>
          <DialogContent>
            <div>
              <p>
                Please fill these for {JSON.stringify(this.props.passed.type)}{" "}
                before pressing submit.
              </p>
            </div>

            <TextField
              className="inputs"
              select
              label="Status"
              value={this.state.status}
              onChange={this.handleChange("status")}
              SelectProps={{
                native: true
              }}
              InputLabelProps={{
                shrink: true
              }}
              required
              helperText="Select Used if using, Expired if expired."
              margin="normal"
            >
              <option value="">None</option>
              <option value="USED">Used</option>
              <option value="REJECTED">Expired</option>
              ))}
            </TextField>
            <TextField
              className="inputs"
              select
              label="Used For"
              value={this.state.use}
              disabled={this.state.status == "USED" ? false : true}
              onChange={this.handleChange("use")}
              SelectProps={{
                native: true
              }}
              InputLabelProps={{
                shrink: true
              }}
              required
              helperText="For whom you have used"
              margin="normal"
            >
              <option value="">Select</option>
              <option value="DONOR">Donor</option>
              <option value="PATIENT">Patient</option>
              ))}
            </TextField>
            <TextField
              className="inputs"
              label="Donor ID"
              required
              disabled={
                this.state.status == "USED" && this.state.use == "DONOR"
                  ? false
                  : true
              }
              type="text"
              value={this.state.donorID}
              onChange={this.handleChange("donorID")}
              placeholder="Donor ID"
              margin="normal"
              helperText="Fill donors id here"
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              className="inputs"
              label="Patient Name"
              required
              disabled={
                this.state.status == "USED" && this.state.use == "PATIENT"
                  ? false
                  : true
              }
              type="text"
              value={this.state.patientName}
              onChange={this.handleChange("patientName")}
              placeholder="name here"
              margin="normal"
              helperText="Fill patient name"
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              className="inputs"
              label="Test Count"
              required
              type="number"
              value={this.state.testCount}
              onChange={this.handleChange("testCount")}
              margin="normal"
              helperText="Quantity you have used."
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              className="inputs"
              label="Missed Repeated Count"
              required
              disabled={this.state.status == "USED" ? false : true}
              type="number"
              value={this.state.missedRepeatedCount}
              onChange={this.handleChange("missedRepeatedCount")}
              margin="normal"
              helperText="Quantity required."
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              className="inputs"
              label="Used date"
              required
              type="date"
              value={this.state.usedDate}
              onChange={this.handleChange("usedDate")}
              margin="normal"
              helperText="Date you have used."
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              className="inputs"
              label="Technician Name"
              required
              type="text"
              value={this.state.technicianName}
              onChange={this.handleChange("technicianName")}
              placeholder="name here"
              margin="normal"
              helperText="Fill technician name"
              InputLabelProps={{
                shrink: true
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color="default">
              <Link to="/serums">Cancel</Link>
            </Button>
            <Button
              disabled={this.state.status != "" ? false : true}
              type="submit"
              color="primary"
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.snackOpen}
          autoHideDuration={6000}
          onClose={this.handleSnackbar}
        >
          <MySnackbar
            onClose={this.handleSnackbar}
            variant={this.state.snackVariant}
            message={this.state.snackMessage}
          />
        </Snackbar>
      </div>
    );
  }
}
