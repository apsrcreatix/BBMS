import * as React from "react";
import MaterialTable from "material-table";
import Divider from "@material-ui/core/Divider";
import Config from "../../../Config";
import axios from "axios";
import Button from "@material-ui/core/Button";
import AddInfectious from './AddInfectious';

const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const session_url = base_url + Config.PATHS.inputInfectious;

export default class Infectious extends React.Component {
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
        infectiousData: response.data.response.stocks
      });
      console.log(this.state.infectiousData+""+response.data.response.success);
    })
    .catch(function(error: any) {
      console.log(`error in authentication : ${error}`);
    });
  }
  state = {
    infectiousData: []
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
          infectiousData: response.data.respons.stocks
        });
        console.log(this.state.infectiousData+""+response.data.response.success);
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
            <AddInfectious />
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
                { title: "Donor ID", field: "donorID", type: "numeric"},
                {
                    title: "Date",
                    field: "date",
                    render: rowData => {
                      return humanReadableDate(rowData.date);
                    }
                },
                { title: "Spot HIV 12", field: "spotResult.HIV12", type: "string"},
                { title: "Spot HBsAG", field: "spotResult.HBsAg", type: "string" },
                { title: "Spot HCV", field: "spotResult.HCV", type: "string" },
                { title: "Elias HIV 12", field: "elisaResult.HIV12", type: "string" },
                { title: "Elias HBSAG", field: "elisaResult.HBsAg", type: "string" },
                { title: "Elias HCV", field: "elisaResult.HCV", type: "string" },
                { title: "VDRL", field: "VDRL", type: "string" },
                { title: "Malarial Parasite", field: "malarialParasite", type: "string" },
                { title: "Micro Filaria", field: "microFilaria", type: "string" },
                { title: "Staff Name", field: "staffName", type: "string" },
                { title: "Blood Bank", field: "bloodBank", type: "string" },
                { title: "Donor Name", field: "donorName", type: "string" },
                { title: "Blood Group", field: "bloodGroup", type: "string" },
                { title: "RH Type", field: "rhType", type: "string" }
              ]}
              data={this.state.infectiousData}
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
