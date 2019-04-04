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

const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const add_serum_url = base_url + Config.PATHS.addSerums;

interface AddSerumProps {
  open: boolean;
  type: any;
  onClose: any;
}

export default class AddSerum extends React.Component<AddSerumProps> {
  state = {
    open: this.props.open,
    type: this.props.type,
    quantity: "",
    purchasedDate: "",
    manufacturingDate: "",
    manufacturerName: "",
    batchNumber: "",
    expiryDate: ""
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
        type: this.props.type,
        quantity: "",
        purchasedDate: "",
        manufacturingDate: "",
        manufacturerName: "",
        batchNumber: "",
        expiryDate: ""
    });
  };

  async sendingData() {
    const data ={
        "data": {
            "type": this.state.type,
            "quantity": parseInt(this.state.quantity,10),
            "purchasedDate": this.state.purchasedDate,
            "manufacturingDate": this.state.manufacturingDate,
            "manufacturerName": this.state.manufacturerName,
            "batchNumber": parseInt(this.state.batchNumber,10),
            "expiryDate":this.state.expiryDate
          }
    }
    console.log(`${data}${JSON.stringify(data)}`);
    await axios
      .post(add_serum_url, data, {
        auth: {
          username,
          password
        }
      })
      .then((response: any) => {
        console.log(response.data.response);
      })
      .catch(function(error: any) {
        console.log(`error in authentication : ${error}`);
      });
  }
  handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(JSON.stringify(this.state));
    this.sendingData();
    this.setState({
        open: this.props.open,
        type: this.props.type,
        quantity: "",
        purchasedDate: "",
        manufacturingDate: "",
        manufacturerName: "",
        batchNumber: "",
        expiryDate: ""
    });
    this.props.onClose(this.props.open);
  };

  handleChange = (name: any) => (event: any) => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { ...other } = this.props;
    return (
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
                Please fill these for {JSON.stringify(this.props.type)}{" "}
                before pressing submit.
              </p>
            </div>
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
              label="Manufacturer Name"
              required
              type="text"
              value={this.state.manufacturerName}
              onChange={this.handleChange("manufacturerName")}
              placeholder="Name here"
              margin="normal"
              helperText="Fill manufracturer name"
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              className="inputs"
              label="Batch Number"
              required
              type="number"
              value={this.state.batchNumber}
              onChange={this.handleChange("batchNumber")}
              margin="normal"
              helperText="Batches number for the stock."
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              className="inputs"
              label="Purchase date"
              required
              type="date"
              value={this.state.purchasedDate}
              onChange={this.handleChange("purchasedDate")}
              margin="normal"
              helperText="Date you have purchased."
              InputLabelProps={{
                shrink: true
              }}
            />
              <TextField
              className="inputs"
              label="Manufracturing date"
              required
              type="date"
              value={this.state.manufacturingDate}
              onChange={this.handleChange("manufacturingDate")}
              margin="normal"
              helperText="Manufracturing date on product"
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              className="inputs"
              label="Expiry date"
              required
              type="date"
              value={this.state.expiryDate}
              onChange={this.handleChange("expiryDate")}
              margin="normal"
              helperText="Expiry date on product"
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
              type="Submit"
              color="primary"
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}
