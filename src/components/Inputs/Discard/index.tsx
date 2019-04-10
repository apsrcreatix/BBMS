import * as React from "react";
import MaterialTable from "material-table";
import Divider from "@material-ui/core/Divider";
import Config from "../../../Config";
import axios from "axios";
import Button from "@material-ui/core/Button";
import AddDiscard from "./AddDiscard";

const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const session_url = base_url + Config.PATHS.inputDiscard;

export default class InputsDiscard extends React.Component {
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
        discardData: response.data.response.tests
      });
      console.log(this.state.discardData+""+response.data.response.success);
    })
    .catch(function(error: any) {
      console.log(`error in authentication : ${error}`);
    });
  }
  state = {
    discardData: []
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
          discardData: response.data.response.stocks
        });
        console.log(this.state.discardData+""+response.data.response.success);
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
            <AddDiscard />
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
              title="Discard Data"
              columns={[
                {title: "Donor ID", field: "donorID", type: "numeric"},
                {
                  title: "Staff Name",
                  field: "staffName",
                  type: "string"
                },
                {
                    title: "Discard Date",
                    field: "discardDate",
                    render: rowData => {
                      return humanReadableDate(rowData.discardDate);
                    }
                  },
                  {
                    title: "Collection Date",
                    field: "collectionDate",
                    render: rowData => {
                      return humanReadableDate(rowData.collectionDate);
                    }
                  },
                  {
                    title: "Motivator Name",
                    field: "moName",
                    type: "string"
                  },
                  {
                    title: "Reason",
                    field: "reason",
                    type: "string"
                  },
                  {
                    title: "Bag Number",
                    field: "bagNo",
                    type: "numeric"
                  },
                  { title: "Donor Name", field: "donorName", type: "string" },
                  { title: "Blood Group", field: "bloodGroup", type: "string" },
                  { title: "RH Type", field: "rhType", type: "string" }
              ]}
              data={this.state.discardData}
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
