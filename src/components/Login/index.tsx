import React, { Component } from "react";
import { Card, CardContent, TextField, Button, Select, MenuItem, FormControl, InputLabel} from "@material-ui/core";
import axios from "axios";

import './login.css';
import Config from "../../Config";

export default class Login extends Component<any> {
    state = {
        bloodBanks: [],
        username: '',
        password: ''
    };

    constructor(props: any) {
        super(props);

        axios.get(`${Config.SERVER_URL}${Config.PATHS.getBloodBanks}`)
        .then((res: any) => {
            this.setState(() => ({
                bloodBanks: res.data.response
            }));
        })
        .catch((err: any) => {
            console.error(err);
        });
    }

    onInput = (name: string, e: any) => {
        const val = e.target.value;
        this.setState(() => ({
            [name]: val
        }));
    }

    render() {
        return (
            <div className="Login full-cover">
                <div className="card-container">
                    <Card className="card">
                        <CardContent>
                            <div className="card-bg"> </div>
                            <div className="card-lg"> </div>

                            <div className="card-content">
                                
                                <form autoComplete="off">
                                    <FormControl className="select">
                                        <InputLabel>Blood Bank</InputLabel>
                                        <Select
                                            className="input"
                                            onChange={(e) => {this.onInput('username', e)} }
                                            value={this.state.username}
                                        >
                                            {
                                                (this.state.bloodBanks.length == 0 && (
                                                    <MenuItem value="">Loading Data...</MenuItem>
                                                ))
                                            }
                                            {
                                                this.state.bloodBanks.map((bb) => (
                                                    <MenuItem key={bb} value={bb}>{bb}</MenuItem>
                                                ))
                                            }

                                        </Select>
                                    </FormControl>
                                    <TextField
                                        type="password"
                                        className="input"
                                        value={this.state.password}
                                        onInput={(e) => {this.onInput('password', e)} }
                                        label="Password"
                                        variant="outlined"
                                    />

                                    <Button
                                        className="btn"
                                        variant="contained"
                                        color="primary"
                                    >
                                        LOGIN
                                    </Button>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }
}