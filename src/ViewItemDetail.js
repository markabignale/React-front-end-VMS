import "./styles.css";
import MaterialTable from "material-table";
import * as React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

export default function ViewItemDetail() {
  const [fromDate, setFromDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [toDate, setToDate] = React.useState(new Date("2014-08-18T21:11:54"));

  const updateFromDate = (newValue) => {
    setFromDate(newValue);
  };
  const updateToDate = (newValue) => {
    setToDate(newValue);
  };
  return (
    <div className="App">
      <MaterialTable
        title="Remote Data Preview"
        columns={[
          { title: "Latitude", field: "first_name" },
          { title: "Longitude", field: "last_name" },
          { title: "Recorded date", field: "id" }
        ]}
        data={(query) =>
          new Promise((resolve, reject) => {
            let url = "https://reqres.in/api/users?";
            url += "per_page=" + query.pageSize;
            url += "&page=" + (query.page + 1);
            fetch(url)
              .then((response) => response.json())
              .then((result) => {
                resolve({
                  data: result.data,
                  page: result.page - 1,
                  totalCount: result.total
                });
              });
          })
        }
        options={{
          search: false,
          showTitle: false
        }}
        components={{
          Toolbar: (props) => (
            <div>
              <div style={{ padding: "5px 10px" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="From Date"
                    inputFormat="MM/dd/yyyy"
                    value={fromDate}
                    onChange={updateToDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <DesktopDatePicker
                    label="To Date"
                    inputFormat="MM/dd/yyyy"
                    value={toDate}
                    onChange={updateFromDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
            </div>
          )
        }}
      />
    </div>
  );
}
