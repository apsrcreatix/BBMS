import * as React from "react";
import MaterialTable from "material-table";
import Divider from "@material-ui/core/Divider";
import Config from "../../../Config";
import axios from "axios";
import Button from "@material-ui/core/Button";
import AddScreening from "./AddScreening";

const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const session_url = base_url + Config.PATHS.inputScreening;

export default class InputsScreening extends React.Component {
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
        screeningData: response.data.response.stocks
      });
      console.log(this.state.screeningData+""+response.data.response.success);
    })
    .catch(function(error: any) {
      console.log(`error in authentication : ${error}`);
    });
  }
  state = {
    screeningData: []
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
          screeningData: response.data.response.tests
        });
        console.log(this.state.screeningData+""+response.data.response.success);
      })
      .catch(function(error: any) {
        console.log(`error in authentication : ${error}`);
      });
  }
  handleChange = (name: any) => (event: any) => {
    this.setState({ [name]: event.target.value });
  };
  render() {
    return (
      <div>
        <div>
          <div>
            <AddScreening />
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
              title="Screening Data"
              columns={[
                {title: "Donor ID", field: "donorID", type: "numeric"},
                {
                  title: "Staff Name",
                  field: "staffName",
                  type: "string"
                },
                { title: "HIV 12", field: "hiv12", type: "string" },
                { title: "HSBAG", field: "hsbag", type: "string" },
                { title: "HCV", field: "hcv", type: "string" },
                { title: "VDRL", field: "vdrl", type: "string" },
                { title: "Malarial Parasite", field: "malarialParasite", type: "string" },
                { title: "Micro Filaria", field: "microFilaria", type: "string" },
                { title: "Staff Name", field: "staffName", type: "string" },
                { title: "Blood Bank", field: "bloodBank", type: "string" },
                { title: "Donor Name", field: "donorName", type: "string" },
                { title: "Blood Group", field: "bloodGroup", type: "string" },
                { title: "RH Type", field: "rhType", type: "string" }
              ]}
              data={this.state.screeningData}
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
