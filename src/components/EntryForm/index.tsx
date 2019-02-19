import * as React from "react";
import TextField from "@material-ui/core/TextField";
// import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from "@material-ui/core/FormControl";
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';
// import Input from '@material-ui/core/Input';
import "./EntryForm.css";
const currencies = [
  {
    value: "USD",
    label: "United State Dollar"
  },
  {
    value: "EUR",
    label: "Europian Dollar"
  },
  {
    value: "BTC",
    label: "Bitcoin"
  },
  {
    value: "JPY",
    label: "Jabalpur Yoga"
  }
];
export default class EntryForm extends React.Component {
  state = {
    name: "Aditya",
    age: "23",
    multiline: "Controlled",
    currency: "EUR"
  };
  constructor(props: any) {
    super(props);
  }
  handleChange = (name: any) => (event: any) => {
    this.setState({ [name]: event.target.value });
  };
  render() {
    return (
      <form className="form" noValidate autoComplete="off">
        <h1>Registration Details</h1>
        <TextField
          className="inputs"
          id="reg-date"
          label="Registraion Date"
          required
          type="date"
          helperText="Format is DD/MM/YYY"
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />

        <TextField
          className="inputs"
          select
          label="Registration Centre"
          value={this.state.currency}
          onChange={this.handleChange("currency")}
          SelectProps={{
            native: true
          }}
          required
          helperText="Please select centre"
          margin="normal"
        >
          {currencies.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>

        <FormControl>
          <TextField
            className="inputs"
            select
            label="Native select"
            value={this.state.currency}
            onChange={this.handleChange("currency")}
            SelectProps={{
              native: true
            }}
            helperText="Please select your currency"
            margin="normal"
          >
            {currencies.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <TextField
            className="inputs"
            label="Registration Centre"
            required
            type="text"
            margin="normal"
            helperText="Fill Motivated by"
          />
        </FormControl>

        <TextField
          select
          label="Native select"
          value={this.state.currency}
          onChange={this.handleChange("currency")}
          SelectProps={{
            native: true
          }}
          helperText="Please select your currency"
          margin="normal"
        >
          {currencies.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </form>
    );
  }
}
