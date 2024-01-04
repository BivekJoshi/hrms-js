import * as XLSX from "exceljs";
import _ from "lodash";

export const exportExcel = (
  columns,
  data,
  fileName,
  additionalLeft,
  additionalRight
) => {
  const workbook = new XLSX.Workbook();
  console.log(additionalLeft);

  const worksheet = workbook.addWorksheet(fileName?.replace("pdf", ""), {
    properties: {
      tabColor: { argb: "FF00FF00" },
      outlineLevelCol: 2,
      outlineLevelRow: 2,
    },
  });
  workbook.created = new Date();

  const exportColumns = columns.filter((d) => {
    if (d.csvOnly === true) return true;
    if (d.export === true) {
      return true;
    } else if (d.export === false) {
      return false;
    } else if (d.hidden) {
      return false;
    } else return true;
  });

  const colLength = exportColumns.length;
  const additionalDataStart = 3;

  const orgInfoStartCell = "A1";

  const orgInfoEndCell = String.fromCharCode(64 + colLength); // e.g., "E5" if there are 5 columns

  worksheet.getCell(orgInfoStartCell).value = {
    richText: [
      {
        text: fileName?.replace(".pdf", ""),
        font: { bold: true, color: { argb: "0000FF" } },
      },
    ],
  };
  worksheet.mergeCells(`${orgInfoStartCell}:${orgInfoEndCell}1`);
  worksheet.getCell(orgInfoStartCell).alignment = {
    vertical: "middle",
    horizontal: "center",
  };

  const forLeftCell = "A";
  let forRightCell = String.fromCharCode(65 + colLength); // Start from the column after the last data column

  if (additionalLeft && Object.values(additionalLeft).length > 0) {
    let start = additionalDataStart;
    for (let key in additionalLeft) {
      console.log(key, additionalLeft[key]);
      worksheet.getCell(`${forLeftCell + start}`).value = {
        richText: [
          { text: key, font: { bold: true, color: { argb: "0000FF" } } },
          { text: `: ${additionalLeft[key]}` },
        ],
      };
      start++;
    }
  }

  if (additionalRight && Object.values(additionalRight).length > 0) {
    let start = additionalDataStart;
    for (let key in additionalRight) {
      worksheet.getCell(`${forRightCell + start}`).value = {
        richText: [
          { text: key, font: { bold: true, color: { argb: "0000FF" } } },
          { text: `: ${additionalRight[key]}` },
        ],
      };
      start++;
    }
  }

  const leftLength = additionalLeft ? Object.values(additionalLeft).length : 0;
  const rightLength = additionalRight
    ? Object.values(additionalRight).length
    : 0;
  const maxAdditionalDataLength = Math.max(leftLength, rightLength);

  const tableStartRow = additionalDataStart + maxAdditionalDataLength;

  // Merging cells for additionalLeft data
  if (leftLength > 0) {
    let cellNumber = additionalDataStart;
    for (let i = 0; i < leftLength; i++) {
      worksheet.mergeCells(`A${cellNumber}:${orgInfoEndCell}${cellNumber}`);
      cellNumber++;
    }
  }

  // Merging cells for additionalRight data
  if (rightLength > 0) {
    let cellNumber = additionalDataStart;
    for (let i = 0; i < rightLength; i++) {
      const startColumn = String.fromCharCode(orgInfoEndCell.charCodeAt(0) + 1);
      const endColumn = String.fromCharCode(orgInfoEndCell.charCodeAt(0) + 6);
      worksheet.mergeCells(
        `${startColumn}${cellNumber}:${endColumn}${cellNumber}`
      );
      cellNumber++;
    }
  }
  worksheet.addRow([]);
  let arraOfArray = [];
  for (let index in data) {
    let d = exportColumns.map((f) => {
      let value = data[index][f.field];
      if (f.type === "number") value = Number(value);
      const fieldName = f.field;
      let isObject = false;
      if (fieldName?.includes(".")) {
        isObject = true;
      }
      if (isObject) {
        value = _.get(data[index], fieldName);
        if (fieldName === "tableData.id") {
          value++;
        }
      }
      return value;
    });
    arraOfArray.push(d);
  }
  worksheet.addTable({
    name: "MyTable",
    ref: "A" + tableStartRow, // Start of the table data
    headerRow: true, // Display column headers
    columns: exportColumns.map((column, index) => {
      return {
        name: column.title,
        filterButton: true,
        key: index + 1,
        width: Number(column.width) * 3,
      };
    }),
    rows: arraOfArray,
    style: {
      theme: "TableStyleLight13",
      showRowStripes: true,
    },
  });
  //     // Generate a Blob object containing the Excel data
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a download link and trigger a click event to download the file
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName?.replace(".pdf", "") + " " + new Date() + ".xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
  });
};
