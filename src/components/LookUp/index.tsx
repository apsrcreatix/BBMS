// @TODO
// 1.Optimization for > 6000 collections.
// 2.Organizing Structure.

import MaterialTable from "material-table";
import * as React from "react";
import axios from "axios";
import Config from "../../Config";
let username = Config.AUTH.username;
let password = Config.AUTH.token;
let base_url = Config.SERVER_URL;
let session_url = base_url + Config.PATHS.getDonors;
interface state {
  data: object;
}
export default class TableWithContent extends React.Component<{}, state> {
  constructor(props: any) {
    super(props);
    this.state = {
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
      .catch(function(error: any) {
        console.log(`error in authentication : ${error}`);
      });
  }
  render() {
    const { data } = this.state;
    return (
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
    );
  }
}
