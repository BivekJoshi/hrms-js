import MaterialTable, { MTableAction, MTableToolbar } from "material-table";
import React, { useContext } from "react";
import ThemeModeContext from "../../../theme/ThemeModeContext";
import tableIcons from "../../../theme/overrides/TableIcon";
import { exportExcel } from "../../utils/ExportExcel";
import { pdfExport } from "../../utils/tablepdfExport";

const CustomTable = (props) => {
  const { palette } = useContext(ThemeModeContext); // Accessing mode from context

  const renderAdditionInformationLeft = () => {
    if (props?.additionalLeft) {
      const keys = Object.keys(props?.additionalLeft);
      const elems = keys.map((d) => {
        return (
          <div
            key={d}
            style={{
              width: "fit-content",
              fontSize: "14px",
              margin: "0px 15px",
            }}
          >
            <div>
              <span>{`${d} :  `}</span>
              <span style={{ fontWeight: "bold" }}>
                {props.additionalLeft[d]}
              </span>
            </div>
          </div>
        );
      });
      return elems;
    }
  };

  const renderAdditionInformationRight = () => {
    if (props?.additionalRight) {
      const keys = Object.keys(props?.additionalRight);
      const elems = keys.map((d) => {
        return (
          <div
            key={d}
            style={{
              width: "fit-content",
              fontSize: "14px",
              margin: "0px 15px",
            }}
          >
            <div>
              <span>{`${d} :  `}</span>
              <span style={{ fontWeight: "bold" }}>
                {props.additionalRight[d]}
              </span>
            </div>
          </div>
        );
      });
      return elems;
    }
  };

  return (
    <div style={{ height: "100%" }}>
      <MaterialTable
        icons={tableIcons}
        columns={props?.columns}
        data={props?.data}
        title={props?.title}
        isLoading={props?.isLoading}
        localization={{
          toolbar: {
            exportCSVName: props.exportExcel ? "Export Excel" : "Export CSV",
            exportPDFName: props.pdfNone ? "" : "Export PDF ",
          },
          header: {
            actions: props.singleAction ? "Action" : "Actions",
          },
        }}
        options={{
          search: props?.search || true,
          tableLayout: props?.tableLayout,
          padding: "dense",
          cellStyle: {
            textAlign: "center",
          },
          actionsCellStyle: props?.actionsCellStyle
            ? props?.actionsCellStyle
            : "",
          // padding:" 0px 20px",
          pageSize: props?.pageSize || 10,
          emptyRowsWhenPaging: props?.emptyRowsWhenPaging || false,
          exportButton: props?.exportButton || false,
          exportPdf: (columns, data) =>
            new Promise((resolve, reject) => {
              pdfExport(
                columns,
                data,
                props.title,
                props.fileName,
                props.additionalLeft,
                props.additionalRight,
                "landscape",
                resolve,
                reject
              );
            }),
          exportCsv: (columns, data) =>
            props.exportExcel &&
            exportExcel(
              columns,
              data,
              props.fileName,
              props.additionalLeft,
              props.additionalRight
            ),
          headerStyle: {
            backgroundColor: palette?.secondary?.main,
            color: palette?.text?.tableHead,
            fontSize: ".8rem",
            fontWeight: "bold",
            textAlign: "center",
            border: `1px solid ${palette?.divider}`,
            textTransform: "capitalize",
          },
          actionsColumnIndex: -1,
          rowStyle: props?.rowStyle || {
            fontSize: ".8rem",
            alignItems: "center",
          },
          maxBodyHeight: props?.height || "",
          scroll: props?.scroll || "",
        }}
        actions={props?.actions}
        components={{
          Toolbar: (p) => (
            <div>
              <MTableToolbar {...p} style={{ margin: 0, padding: 0 }} />

              <div
                className="d-flex flex-row justify-content-between ml-4 mr-4 mb-1"
                style={{
                  fontSize: "11px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span>{renderAdditionInformationLeft()}</span>
                </div>
                <div>{renderAdditionInformationRight()}</div>
              </div>
            </div>
          ),
          // Action: (props) => <MTableAction {...props} style={{display:"flex", justifyContent: 'center' }} />, // Add this line to center align the actions
        }}
      />
    </div>
  );
};

export default CustomTable;
