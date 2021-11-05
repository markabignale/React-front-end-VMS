import MaterialTable from "material-table";
import { Button } from "@mui/material";

export default function ViewItemList() {
  return (
    <div className="App">
      <MaterialTable
        title="Vehicles"
        columns={[{ title: "Vehicle Id", field: "id" }]}
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
        actions={[
          {
            icon: "save",
            tooltip: "Save User",
            onClick: (event, rowData) => alert("You saved " + rowData.name)
          }
        ]}
        options={{
          actionsColumnIndex: -1,
          search: false,
          toolbar: false
        }}
        localization={{
          header: {
            actions: ""
          }
        }}
        components={{
          Action: (props) => (
            <Button
              onClick={(event) => props.action.onClick(event, props.data)}
              color="primary"
              variant="contained"
              style={{ textTransform: "none" }}
              size="small"
            >
              VIEW TIMELINE
            </Button>
          )
        }}
      />
    </div>
  );
}
