import MaterialTable from "@material-table/core";
import React from "react";
import { Button, Stack } from "@mui/material";



const columns = [
    {
        title: "SN",
        render: (rowData) => rowData.tableData.index + 1,
        width: 120,
        sortable: false,
    },
];


const DeactivatedEmployee = () => {
    // const { data: employeeData } = useGetEmployee();

    if (isLoading) return <>Loading</>;

    return (
        <>
            <MaterialTable
                columns={columns}
                // data={deactivatedEmployee}
                title="In Active Employee"
                isLoading={isLoading}
                options={{
                    padding: "dense",
                    margin: 50,
                    pageSize: 12,
                    emptyRowsWhenPaging: false,
                    headerStyle: {
                        backgroundColor: "#1c7ed6",
                        color: "#FFF",
                        fontSize: 20,
                        padding: "dense",
                        height: 50,
                    },
                    rowStyle: {
                        fontSize: 18,
                    },
                }}
            />
        </>
    );
};

export default DeactivatedEmployee;
