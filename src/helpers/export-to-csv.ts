import { ExportObjectModel } from "../types/export-object.model";
import { saveAs } from "file-saver";

const exportToCSV = (
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
          bookType: "csv",
          type: "array",
        });

        let CSV_TYPE = "data:text/csv;charset=utf-8";
        let CSV_EXTENSION = ".csv";
        const data: Blob = new Blob([excelBuffer], {
          type: CSV_TYPE,
        });
        saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + CSV_EXTENSION
        );
      });

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

export { exportToCSV };
