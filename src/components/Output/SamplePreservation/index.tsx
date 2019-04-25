import * as React from "react";
import MaterialTable from "material-table";
import Divider from "@material-ui/core/Divider";
import Config from "../../../Config";
import axios from "axios";
import Button from "@material-ui/core/Button";
import AddGrouping from './AddSP';

const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const session_url = base_url + Config.PATHS.outputPreservation;

export default class SamplePreservation extends React.Component {
    constructor(props: any) {
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
                    preservationData: response.data.response.tests
                });
                console.log(this.state.preservationData + "" + response.data.response.success);
            })
            .catch(function (error: any) {
                console.log(`error in authentication : ${error}`);
            });
    }
    state = {
        preservationData: []
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
                    preservationData: response.data.response.stocks
                });
                console.log(this.state.preservationData + "" + response.data.response.success);
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
                        <AddGrouping />
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
                            title="Preservation Data"
                            columns={[
                                { title: "Donor ID", field: "donorID" },
                                { title: "Donor Name", field: "donorName", type: "string" },
                                { title: "Blood Bank", field: "bloodBank", type: "string" },
                                { title: "Blood Group", field: "bloodGroup", type: "string" },
                                { title: "RH Type", field: "rhType", type: "string" },
                                { title: "Name", field: "name", type: "string" },
                                { title: "Hospital", field: "hospital", type: "string" },

                                {
                                    title: "Sample Date", field: "dates.sample", 
                                    render: rowData => {
                                        return humanReadableDate(rowData.dates.sample);
                                    }
                                },
                                {
                                    title: "Second Date", field: "dates.second", 
                                    render: rowData => {
                                        return humanReadableDate(rowData.dates.second);
                                    }
                                },
                                {
                                    title: "Third Date", field: "dates.third", 
                                    render: rowData => {
                                        return humanReadableDate(rowData.dates.sample);
                                    }
                                },
                                {
                                    title: "Fourth Date", field: "dates.fourth", 
                                    render: rowData => {
                                        return humanReadableDate(rowData.dates.sample);
                                    }
                                },
                                {
                                    title: "Fifth Date", field: "dates.fifth", 
                                    render: rowData => {
                                        return humanReadableDate(rowData.dates.sample);
                                    }
                                },
                                {
                                    title: "Sixth Date", field: "dates.sixth", 
                                    render: rowData => {
                                        return humanReadableDate(rowData.dates.sample);
                                    }
                                },
                                {
                                    title: "Seventh Date", field: "dates.seventh", 
                                    render: rowData => {
                                        return humanReadableDate(rowData.dates.seventh);
                                    }
                                },
                                {
                                    title: "Discard", field: "discard", type: "string"
                                },

                            ]}
                            data={this.state.preservationData}
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
