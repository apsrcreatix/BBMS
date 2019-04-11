import * as React from "react";
import MaterialTable from "material-table";
import Divider from "@material-ui/core/Divider";
import Config from "../../../Config";
import axios from "axios";
import Button from "@material-ui/core/Button";
import AddReject from './AddRejects';

const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const session_url = base_url + Config.PATHS.inputReject;

export default class Rejects extends React.Component {
  constructor(props: any){
    super(props);
    axios
    .get(session_url, {
      auth: {
        username,
        password
      }
    })
    .then((response: any) => {
      this.setState({
        rejectData: response.data.response.stocks
      });
      console.log(this.state.rejectData+""+response.data.response.success);
    })
    .catch(function(error: any) {
      console.log(`error in authentication : ${error}`);
    });
  }
  state = {
    rejectData: []
    };

  async fetchData() {
    await axios
      .get(session_url, {
        auth: {
          username,
          password
        }
      })
      .then((response: any) => {
        this.setState({
          rejectData: response.data.respons.stocks
        });
        console.log(this.state.rejectData+""+response.data.response.success);
      })
      .catch(function(error: any) {
        console.log(`error in authentication : ${error}`);
      });
  }
  handleChange = (name: any) => (event: any) => {
    this.setState({ [name]: event.target.value });
  };
  render() {
    function humanReadableDate(value: any) {
        let event = new Date(value);
        let options = {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          timezone: "Asia/Kolkata"
        };
        return event.toLocaleDateString("en-IN", options);
    }
    return (
      <div>
        <div>
          <div>
            <AddReject />
          </div>
          <Divider />
          <div className="input-container">
            <div className="input-inputs">
  <p>Please press refresh button to view latest uploaded data.</p>
            </div>
            <div className="input-buttons">
              <Button
                className="inputs"
                variant="contained"
                color="default"
                onClick={() => this.fetchData()}
              >
                Refresh
              </Button>
            </div>
          </div>
          <div className="something-table">
            <MaterialTable
              title="Infectious Data"
              columns={[
                { title: "Place", field: "place", type: "string"},
                { title: "Name", field: "name", type: "string"},
                {
                    title: "Date of Birth",
                    field: "dob",
                    render: rowData => {
                      return humanReadableDate(rowData.dob);
                    }
                },
                {
                    title: "Date",
                    field: "date",
                    render: rowData => {
                      return humanReadableDate(rowData.date);
                    }
                },
                { title: "Address", field: "address", type: "string"},
                { title: "Phone", field: "phone", type: "numeric"},
                { title: "Defer Duration", field: "defer.duration", type: "string"},
                { title: "Defer Reason", field: "defer.reason", type: "string"},          
                { title: "Blood Bank", field: "bloodBank", type: "string" },
              ]}
              data={this.state.rejectData}
              options={{
                loadingType: "linear",
                pageSize: 5,
                toolbar: true,
                columnsButton: true
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
