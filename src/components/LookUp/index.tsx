// @TODO
// 1.Optimization for > 6000 collections.
// 2.Organizing Structure.

import MaterialTable from "material-table";
import TextField from "@material-ui/core/TextField";
//import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import * as React from "react";
//import axios from "axios";
//import Config from "../../Config";
import './LookUp.css';
import Data from '../Data'

const INITIAL_STATE = {
    "eligibility": "",
    "motivatedBy": "",
    "name": "",
    "dob": "",
    "gender": "",
    "bloodGroup": "",
    "rhType": "",
    "r_address": "",
    "r_pincode": "",
    "r_door": "",
    "r_buildingName": "",
    "r_city": "",
    "r_postOffice": "",
    "r_area": "",
    "r_taluk": "",
    "r_district": "",
    "r_mobile": "",
    "r_email": "",
    "r_phone": "",
    "o_address": "",
    "o_pincode": "",
    "o_door": "",
    "o_buildingName": "",
    "o_city": "",
    "o_postOffice": "",
    "o_area": "Kuniyamuthur",
    "o_taluk": "",
    "o_district": "",
    "o_phone": "",
    "o_email": "",
    "o_mobile": "",
    data: []
};

//let username = Config.AUTH.username;
//let password = Config.AUTH.token;
//let base_url = Config.SERVER_URL;
//let session_url = base_url + Config.PATHS.getDonors;
//interface state  {
//data: object;
//}
export default class LookUp extends React.Component {
    state = INITIAL_STATE;
    constructor(props: any) {
        super(props);
        /*this.state = {
            data: []
        };
        axios
            .post(
                session_url,
                {},
                {
                    auth: {
                        username,
                        password
                    }
                }
            )
            .then((response: any) => {
                // console.table(response.data.response);
                this.setState(() => ({
                    data: response.data.response
                }));
            })
            .catch(function (error: any) {
                console.log(`error in authentication : ${error}`);
            });*/

    }
    handleChange = (name: any) => (event: any) => {
        this.setState({ [name]: event.target.value });
    };
    render() {
        const { data } = this.state;
        return (
            <div>
                <form className="form" noValidate autoComplete="off"></form>
                <TextField
                    className="inputs"
                    select
                    label="Eligibilty"
                    value={this.state.gender}
                    onChange={this.handleChange("gender")}
                    SelectProps={{
                        native: true
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                    required
                    helperText="Please select Eligibilty"
                    margin="normal"
                >

                {Data.GENDER.map(((option: any) =>
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
                </TextField>
                <TextField
                    className="inputs"
                    select
                    label="Blood Group"
                    value={this.state.gender}
                    onChange={this.handleChange("blooGroup")}
                    SelectProps={{
                        native: true
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                    required
                    helperText="Please select Blood Group"
                    margin="normal"
                >

                {Data.BLOOD_GROUP.map(((option: any) =>
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
                </TextField>
                <TextField
                    className="inputs"
                    select
                    label="RH Type"
                    value={this.state.gender}
                    onChange={this.handleChange("rhType")}
                    SelectProps={{
                        native: true
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                    required
                    helperText="Please select RH Type"
                    margin="normal"
                >

                {Data.RH_TYPE.map(((option: any) =>
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
                </TextField>
                <TextField
                    className="inputs"
                    select
                    label="Age Group"
                    value={this.state.gender}
                    onChange={this.handleChange("dob")}
                    SelectProps={{
                        native: true
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                    required
                    helperText="Please select Gender"
                    margin="normal"
                >

                {Data.AGE_GROUP.map(((option: any) =>
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
                </TextField>
                <TextField
                    className="inputs"
                    select
                    label="Gender"
                    value={this.state.gender}
                    onChange={this.handleChange("gender")}
                    SelectProps={{
                        native: true
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                    required
                    helperText="Please select Gender"
                    margin="normal"
                >

                {Data.GENDER.map(((option: any) =>
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
                </TextField>
                <TextField
                    className="inputs"
                    select
                    label="Donor Type"
                    value={this.state.gender}
                    onChange={this.handleChange("gender")}
                    SelectProps={{
                        native: true
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                    required
                    helperText="Please select Gender"
                    margin="normal"
                >

                {Data.GENDER.map(((option: any) =>
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
                </TextField>
                <TextField
                    className="inputs"
                    select
                    label="Gender"
                    value={this.state.gender}
                    onChange={this.handleChange("gender")}
                    SelectProps={{
                        native: true
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                    required
                    helperText="Please select Gender"
                    margin="normal"
                >

                {Data.GENDER.map(((option: any) =>
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
                </TextField>
                
                <Divider></Divider>
                
                <TextField
                    className="inputs"
                    select
                    label="Area"
                    value={this.state.gender}
                    onChange={this.handleChange("area")}
                    SelectProps={{
                        native: true
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                    required
                    helperText="Please select Area"
                    margin="normal"
                >

                {Data.AREAS.map(((option: any) =>
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
                </TextField>

                <TextField
                    className="inputs"
                    select
                    label="Post Office"
                    value={this.state.gender}
                    onChange={this.handleChange("r_postOffice")}
                    SelectProps={{
                        native: true
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                    required
                    helperText="Please select Post Office"
                    margin="normal"
                >

                {Data.POSTOFFICES.map(((option: any) =>
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
                </TextField>

                <TextField
                    label="Address Keyword"
                    className="inputs"
                    value={this.state.name}
                    placeholder=""
                    onChange={this.handleChange('r_address')}
                    margin="normal"
                    InputLabelProps={{
                    shrink: true,
                    }}
                    required
                />

                <TextField
                    className="inputs"
                    select
                    label="Motivated By"
                    value={this.state.gender}
                    onChange={this.handleChange("motivatedBy")}
                    SelectProps={{
                        native: true
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                    required
                    helperText="Please select Motivated By"
                    margin="normal"
                >

                {Data.TEMP_MOTIVATORS.map(((option: any) =>
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
                </TextField>
                
                <Divider></Divider>

                <MaterialTable
                    
                    columns={[
                        { title: "Name", field: "name" },
                        {
                            title: "Date Of Birth",
                            render: rowData => {
                                var dateFromAPI = rowData.dob;

                                var now = new Date();
                                var datefromAPITimeStamp = new Date(dateFromAPI).getTime();
                                var nowTimeStamp = now.getTime();

                                var microSecondsDiff = Math.abs(
                                    datefromAPITimeStamp - nowTimeStamp
                                );
                                // Number of milliseconds per day =
                                //   24 hrs/day * 60 minutes/hour * 60 seconds/minute * 1000 msecs/second
                                var daysDiff = Math.floor(microSecondsDiff / 31556952000);

                                return daysDiff;
                            }
                        },
                        { title: "Blood Group", field: "bloodGroup" },
                        { title: "Gender", field: "gender" },
                        { title: "Donor Type", field: "lastDonated.type" },
                        { title: "Eligibility", field: "lastDonated.type" },
                        { title: "Contact", field: "residentialAddress.mobile" }
                    ]}
                    data={data}
                    title="Donor Look Up"
                    options={{
                        filtering: true,
                        searchable: true,
                        loadingType: "linear",
                        pageSize: 10,
                        toolbar: true
                    }}
                />
            </div>


        );
    }
}
