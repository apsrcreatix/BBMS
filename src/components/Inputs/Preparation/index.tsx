import * as React from "react";
import MaterialTable from "material-table";
import Divider from "@material-ui/core/Divider";
import Config from "../../../Config";
import axios from "axios";
import Button from "@material-ui/core/Button";
import AddPreparation from './AddPreparation';

const username = Config.AUTH.username;
const password = Config.AUTH.token;
const base_url = Config.SERVER_URL;
const session_url = base_url + Config.PATHS.inputPreparation;

export default class Infectious extends React.Component {
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
                    preparationData: response.data.response.stocks
                });
                console.log(this.state.preparationData + "" + response.data.response.success);
            })
            .catch(function (error: any) {
                console.log(`error in authentication : ${error}`);
            });
    }
    state = {
        preparationData: []
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
                    preparationData: response.data.respons.stocks
                });
                console.log(this.state.preparationData + "" + response.data.response.success);
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
                        <AddPreparation />
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
                            title="Preparation Data"
                            columns={[
                                { title: "Donor ID", field: "donorID", type: "numeric" },
                                { 
                                    title: "PRC Prep Date", 
                                    field: "components.prc.preparationDate", 
                                    render: rowData => { 
                                        return humanReadableDate(rowData.components.prc.preparationDate);
                                    } 
                                },
                                { 
                                    title: "PRC Exp Date", 
                                    field: "components.prc.expiryDate", 
                                    render: rowData => { 
                                        return humanReadableDate(rowData.components.prc.expiryDate);
                                    } 
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
                                    title: "PLT Prep Date", 
                                    field: "components.plt.preparationDate", 
                                    render: rowData => { 
                                        return humanReadableDate(rowData.components.plt.preparationDate);
                                    } 
                                },
                                { 
                                    title: "PLT Exp Date", 
                                    field: "components.plt.expiryDate", 
                                    render: rowData => { 
                                        return humanReadableDate(rowData.components.plt.expiryDate);
                                    } 
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
                                    title: "FFP Prep Date", 
                                    field: "components.ffp.preparationDate", 
                                    render: rowData => { 
                                        return humanReadableDate(rowData.components.ffp.preparationDate);
                                    } 
                                },
                                { 
                                    title: "FFP Exp Date", 
                                    field: "components.ffp.expiryDate", 
                                    render: rowData => { 
                                        return humanReadableDate(rowData.components.ffp.expiryDate);
                                    } 
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
                                    title: "Cryo Prep Date", 
                                    field: "components.cryo.preparationDate", 
                                    render: rowData => { 
                                        return humanReadableDate(rowData.components.cryo.preparationDate);
                                    } 
                                },
                                { 
                                    title: "Cryo Exp Date", 
                                    field: "components.cryo.expiryDate", 
                                    render: rowData => { 
                                        return humanReadableDate(rowData.components.cryo.expiryDate);
                                    } 
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
                                    title: "WB Prep Date", 
                                    field: "components.wb.preparationDate", 
                                    /*render: rowData => { 
                                        return humanReadableDate(rowData.components.wb.preparationDate);
                                    } */
                                },
                                { 
                                    title: "WB Exp Date", 
                                    field: "components.wb.expiryDate", 
                                    /*render: rowData => { 
                                        return humanReadableDate(rowData.components.wb.expiryDate);
                                    } */
                                },
                                { title: "WB Status Label", field: "components.wb.status.label", type: "string" },
                                { 
                                    title: "WB Status Date", 
                                    field: "components.wb.status.date", 
                                    /*render: rowData => { 
                                        return humanReadableDate(rowData.components.wb.status.date) 
                                    } */
                                },
                                {
                                    title: "Collection Date",
                                    field: "collectionDate",
                                    render: rowData => {
                                        return humanReadableDate(rowData.collectionDate);
                                    }
                                },
                                { title: "Staff Name", field: "staffName", type: "string" },
                                { title: "Blood Bank", field: "bloodBank", type: "string" },
                                { title: "Donor Name", field: "donorName", type: "string" },
                                { title: "Blood Group", field: "bloodGroup", type: "string" },
                                { title: "RH Type", field: "rhType", type: "string" }
                            ]}
                            data={this.state.preparationData}
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
