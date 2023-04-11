import React from "react";
//import { render } from "react-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { makeData, Logo, Tips } from "./Utils";
import ReactTable from "react-table";
import "react-table/react-table.css";

const Result = (props) => {
  const { state } = useStateMachine(updateAction);

  //const { data } = makeData();
  //const { data } = state.data;

  console.log(state.data);

  return (
    <div>
      {/*<pre>{JSON.stringify(state, null, 2)}</pre>*/}
      <ReactTable
        data={[state.data]}
        columns={[
          {
            Header: "Request Info",
            columns: [
              {
                Header: "Requester",
                accessor: "requester"
              },
              {
                Header: "Total Cost",
                //id: "reason",
                accessor: "totalcost"
              }
            ]
          },
          {
            Header: "Progress",
            columns: [
              {
                Header: "Delivery Progress",
                accessor: "tracking",

                Cell: (row) => (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#dadada",
                      borderRadius: "2px"
                    }}
                  >
                    <div
                      style={{
                        width: `${row.value}%`,
                        height: "100%",
                        backgroundColor:
                          row.value > 66
                            ? "#85cc00"
                            : row.value > 33
                            ? "#ffbf00"
                            : "#ff2e00",
                        borderRadius: "2px",
                        transition: "all .2s ease-out"
                      }}
                    />
                  </div>
                )
              },
              {
                Header: "Status",
                accessor: "approver"
                /* Cell: (row) => (
                  <span>
                    <span
                      style={{
                        color:
                          row.value === "relationship"
                            ? "#ff2e00"
                            : row.value === "complicated"
                            ? "#ffbf00"
                            : "#57d500",
                        transition: "all .3s ease"
                      }}
                    >
                      &#x25cf;
                    </span>{" "}
                    {row.value === "relationship"
                      ? "In a relationship"
                      : row.value === "complicated"
                      ? `It's complicated`
                      : "Single"}
                  </span>
                ) */
              }
            ]
          }
        ]}
        defaultPageSize={10}
        className="-striped -highlight"
      />
      <br />
      <Tips />
      <Logo />
    </div>
  );
};

export default Result;
