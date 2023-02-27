import { ExportObjectModel } from "../types/export-object.model";
import { saveAs } from "file-saver";

const exportToExcel = (
  fileName: string,
  exportData: ExportObjectModel[]
): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    try {
      import("xlsx").then((xlsx) => {
        const worksheet = xlsx.utils.json_to_sheet(exportData);
        const workbook = {
          Sheets: { data: worksheet },
          SheetNames: ["data"],
        };
        const excelBuffer: any = xlsx.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });

        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data: Blob = new Blob([excelBuffer], {
          type: EXCEL_TYPE,
        });
        saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      });

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

export { exportToExcel };
