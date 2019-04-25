import * as React from "react";
import MaterialTable from "material-table";
import Divider from "@material-ui/core/Divider";
import Config from "../../../Config";
//import Data from "../../Data";
import axios from "axios";
//import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddBMR from "./AddBMR";
const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const session_url = base_url + Config.PATHS.outputBMR;

export default class BMR extends React.Component {
  state = {
    BMRData: [],
    BMRMatching: ""
  };

  async fetchData() {
    await axios
      .get(session_url + "?type=" + this.state.BMRMatching, {
        auth: {
          username,
          password
        }
      })
      .then((response: any) => {
        this.setState({
          BMRData: response.data.response.stocks
        });
      })
      .catch(function (error: any) {
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
            <AddBMR />
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
              title="Blood Master Record"
              columns={[
                { title: "Donor ID", field: "donorID", type: "numeric" },
                { title: "Donor Name", field: "donorName", type: "string" },
                { title: "Medical Officer", field: "medicalOfficer", type: "string" },
                { title: "Blood Bank", field: "bloodBank", type: "string" },
                { title: "Blood Group", field: "bloodGroup", type: "string" },
                { title: "RH Type", field: "rhType", type: "string" },
                {
                  title: "Collection Date",
                  field: "collectionDate",
                  render: rowData => {
                    return humanReadableDate(rowData.collectionDate);
                  }
                },
                {
                  title: "Preparation Date",
                  field: "preparationDate",
                  render: rowData => {
                    return humanReadableDate(rowData.preparationDate);
                  }
                },
                { title: "HIV 12", field: "results.hiv12", type: "string" },
                { title: "HSBAG", field: "results.hsbag", type: "string" },
                { title: "VDRL", field: "results.vdrl", type: "string" },
                { title: "Micro Filaria", field: "results.microFilaria", type: "string" },
                { title: "Irregular Antibody", field: "irregularAntibody", type: "string" },
                {
                  title: "PRC Quantity",
                  field: "components.prc.quantity",
                },
                {
                  title: "PRC Exp Date",
                  field: "components.prc.expiryDate",
                  render: rowData => {
                    return humanReadableDate(rowData.components.prc.expiryDate);
                  }
                },
                {
                  title: "PRC Patient Name",
                  field: "components.prc.patientName",
                },
                {
                  title: "PRC Hospital",
                  field: "components.prc.hospital",
                },
                { title: "PRC Status Label", field: "components.prc.status.label", type: "string" },
                {
                  title: "PRC Status Date",
                  field: "components.prc.status.date",
                  render: rowData => {
                    return humanReadableDate(rowData.components.prc.status.date)
                  }
                },
                {
                  title: "PLT Quantity",
                  field: "components.plt.quantity",
                },
                {
                  title: "PLT Exp Date",
                  field: "components.plt.expiryDate",
                  render: rowData => {
                    return humanReadableDate(rowData.components.plt.expiryDate);
                  }
                },
                {
                  title: "PLT Patient Name",
                  field: "components.plt.patientName",
                },
                {
                  title: "PLT Hospital",
                  field: "components.plt.hospital",
                },
                { title: "PLT Status Label", field: "components.plt.status.label", type: "string" },
                {
                  title: "PLT Status Date",
                  field: "components.plt.status.date",
                  render: rowData => {
                    return humanReadableDate(rowData.components.plt.status.date)
                  }
                },
                {
                  title: "FFP Quantity",
                  field: "components.ffp.quantity",
                },
                {
                  title: "FFP Exp Date",
                  field: "components.ffp.expiryDate",
                  render: rowData => {
                    return humanReadableDate(rowData.components.ffp.expiryDate);
                  }
                },
                {
                  title: "FFP Patient Name",
                  field: "components.ffp.patientName",
                },
                {
                  title: "FFp Hospital",
                  field: "components.ffp.hospital",
                },
                { title: "FFP Status Label", field: "components.ffp.status.label", type: "string" },
                {
                  title: "FFP Status Date",
                  field: "components.ffp.status.date",
                  render: rowData => {
                    return humanReadableDate(rowData.components.ffp.status.date)
                  }
                },
                {
                  title: "Cryo Quantity",
                  field: "components.cryo.quantity",
                  render: rowData => {
                    return humanReadableDate(rowData.components.cryo.quantity);
                  }
                },
                {
                  title: "Cryo Exp Date",
                  field: "components.cryo.expiryDate",
                  render: rowData => {
                    return humanReadableDate(rowData.components.cryo.expiryDate);
                  }
                },
                {
                  title: "Cryo Patient Name",
                  field: "components.cryo.patientName",
                },
                {
                  title: "Cryo Hospital",
                  field: "components.cryo.hospital",
                },
                { title: "Cryo Status Label", field: "components.cryo.status.label", type: "string" },
                {
                  title: "cryo Status Date",
                  field: "components.cryo.status.date",
                  render: rowData => {
                    return humanReadableDate(rowData.components.cryo.status.date)
                  }
                },
                {
                  title: "WB Quantity",
                  field: "components.wb.quantity",
                },
                {
                  title: "WB Exp Date",
                  field: "components.wb.expiryDate",
                  /*render: rowData => { 
                      return humanReadableDate(rowData.components.wb.expiryDate);
                  } */
                },
                {
                  title: "WB Patient Name",
                  field: "components.wb.patientName",
                },
                {
                  title: "WB Hospital",
                  field: "components.wb.hospital",
                },
                { title: "WB Status Label", field: "components.wb.status.label", type: "string" },
                {
                  title: "WB Status Date",
                  field: "components.wb.status.date",
                  /*render: rowData => { 
                      return humanReadableDate(rowData.components.wb.status.date) 
                  } */
                }
              ]}
              data={this.state.BMRData}
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
