import pdfMake from "pdfmake/build/pdfmake.min.js";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

export const pdfExport = (
  columns,
  tableData,
  title,
  fileName,
  additionalLeft,
  additionalRight,
  orientation,
  resolve,
  reject
) => {
  try {
    var body = [];
    let additionalTextLeft = [];
    let additionalTextRight = [];
    let data = tableData ? tableData : [];
    let w = getWidthForPdfTable(columns, orientation);
    const cols = columns
      .filter((d) => {
        return d.export === undefined || d.export === true;
      })
      .map((d) => {
        return {
          text: d.pdfTitle || d.title,
          field: d.field,
          style: "tableHeader",
          date: d.date,
        };
      });
    if (additionalLeft) {
      const keys = Object.keys(additionalLeft);
      keys.forEach((k) => {
        additionalTextLeft.push({
          text: `${k}: ${additionalLeft[k]}\n`,
        });
      });
    }
    if (additionalRight) {
      const keys = Object.keys(additionalRight);
      keys.forEach((k) => {
        additionalTextRight.push({
          text: `${k}: ${additionalRight[k]}\n`,
        });
      });
    }
    body.push(cols);
    data.forEach((row) => {
      var rowData = [];
      cols.forEach((col) => {
        let key = col.field;
        let value = row[key];
        try {
          if (value.toString() === "true") value = "Yes";
          if (value.toString() === "false") value = "No";
          if (key === "tableData.id") {
            value = rowData.tableData.id + 1;
          }
        } catch (err) {
          // console.log(err);
        }

        //if value ss length  > 1 means it is a object
        let ss = col.field?.toString().split(".");
        if (ss?.length > 1) {
          var obj;
          for (let i = 0; i < ss.length; i++) {
            if (i === 0) obj = row[ss[i]];
            else obj = obj[ss[i]];
          }
          value = obj;
        }

        if (value) {
          try {
            value = value.toString();
          } catch (err) {
            console.log(err);
          }
        }
        rowData.push({
          text: value,
          style: "smallText",
        });
      });
      body.push(rowData);
    });

    var docDefination = {
      info: {
        title: "Document",
      },
      pageSize: "A4",
      pageOrientation: orientation,
      pageMargins: [15, 15, 15, 15],

      content: [
        {
          columns: [
            {
              text: `${title}\n`,
              width: "*",
              alignment: "center",
              style: "title",
            },
          ],
          columnGap: 1,
        },
        { text: "\n" },
        {
          columns: [
            {
              text: additionalTextLeft,
              width: "*",
              style: "additionalText",
            },
            {
              text: additionalTextRight,
              width: "*",
              alignment: "right",
              style: "additionalText",
            },
          ],
          columnGap: 1,
        },

        { text: "\n" },
        {
          table: {
            widths: w,
            headerRows: 1,
            body: body,
            style: "table",
          },
          layout: {
            hLineWidth: function (i, node) {
              return i === 0 || i === node.table.body.length ? 2 : 1;
            },
            vLineWidth: function (i, node) {
              return i === 0 || i === node.table.widths.length ? 2 : 1;
            },
            hLineColor: function (i, node) {
              return i === 0 || i === node.table.body.length ? "black" : "gray";
            },
            vLineColor: function (i, node) {
              return i === 0 || i === node.table.widths.length
                ? "black"
                : "gray";
            },
          },
        },
      ],
      styles: {
        tableHeader: {
          bold: true,
          fillColor: "#98d8f1",
          color: "#00000",
          fontSize: 7,
        },
        additionalText: {
          color: "#34b8eb",
          fontSize: 10,
          bold: true,
        },
        title: {
          bold: true,
          color: "#34b8eb",
          fontSize: 12,
        },
        smallText: {
          fontSize: 6,
        },
      },
    };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(docDefination).download(fileName, () => {
      console.log("file download");
      resolve();
    });
  } catch (error) {
    console.log(error);
    reject();
  }
};

//Total width is 500
const totalPageWidthPortrait = 500;
const totalPageWidthlandscape = 750;
const getWidthForPdfTable = (columns, orientation) => {
  const totalPageWidth =
    orientation === "portrait"
      ? totalPageWidthPortrait
      : totalPageWidthlandscape;
  let visibleColumns = columns.filter((value) => {
    return value.export === undefined || value.export === true;
  });
  const total = visibleColumns.reduce((prev, current) => {
    let width = current.pdfWidth ? current.pdfWidth : current.width;
    return prev + parseInt(width);
  }, 0);
  let widths = visibleColumns.map((c, i) => {
    let commonWidth = c.pdfWidth ? c.pdfWidth : c.width;
    let w = parseInt(commonWidth);
    let remPercentage = (w / total) * 100;
    let width = (remPercentage / 100) * totalPageWidth;
    if (i + 1 === visibleColumns.length) return "*";
    if (c.autoSizeForPdf) return "auto";
    if (totalPageWidth === 500) return width - 5;
    else return width;
  });
  // console.log(widths);
  return widths;
};
