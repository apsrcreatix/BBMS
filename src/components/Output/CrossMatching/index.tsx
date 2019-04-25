import * as React from "react";
import MaterialTable from "material-table";
import Divider from "@material-ui/core/Divider";
import Config from "../../../Config";
//import Data from "../../Data";
import axios from "axios";
//import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddCM from "./AddCM";
const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const session_url = base_url + Config.PATHS.outputCM;

export default class CrossMatching extends React.Component {
    state = {
        matchingData: [],
        selectedMatching: ""
    };

    async fetchData() {
        await axios
            .get(session_url + "?type=" + this.state.selectedMatching, {
                auth: {
                    username,
                    password
                }
            })
            .then((response: any) => {
                this.setState({
                    matchingData: response.data.response.stocks
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
                        <AddCM />
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
                            title="Cross Matching Data"
                            columns={[
                                { title: "Donor ID", field: "donorID", type: "numeric" },
                                { title: "Donor Name", field: "donorName" },
                                {
                                    title: "Hospital Name",
                                    field: "hospitalName",
                                    type: "string"
                                },
                                { title: "Blood Bank", field: "bloodBank", type: "string" },
                                {
                                    title: "Used Date",
                                    field: "usedDate",
                                    render: rowData => {
                                        return humanReadableDate(rowData.usedDate);
                                    }
                                },
                                { title: "Blood Group", field: "bloodGroup", type: "string" },
                                { title: "RH Type", field: "rhType", type: "string" },
                                { title: "Name", field: "name", type: "string" },
                                { title: "Sex", field: "sex", type: "string" },
                                { title: "Age", field: "age", type: "string" },
                                { title: "Patient Blood Group", field: "patientBloodGroup", type: "string" },
                                { title: "Patient Rh Type", field: "patientRhType", type: "string" },
                                { title: "Component", field: "component", type: "string" },
                                { title: "Normal Saline Major", field: "normalSaline.major", type: "string" },
                                { title: "Normal Saline Minor", field: "normalSaline.minor", type: "string" },
                                { title: "BSA Major", field: "bsa.major", type: "string" },
                                { title: "BSA Minor", field: "bsa.minor", type: "string" },
                                { title: "CoombsSera Major", field: "coombsSera.major", type: "string" },
                                { title: "CoombsSera Minor", field: "coombsSera.minor", type: "string" },
                                { title: "Compatible", field: "compatible", type: "string" },
                                { title: "Staff Name", field: "staffName", type: "string" },
                            ]}
                            data={this.state.matchingData}
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
