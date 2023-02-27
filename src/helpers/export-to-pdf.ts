import { saveAs } from "file-saver"; 
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts"; 
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const exportToPDF = async (
  docDefinition: any,
  fileName: string = "document",
  printMode: "print" | "open" | "download" = "print",
  isLandscape: boolean = false,
  info: any = {}
) => {
  // deep copy
  const defination = JSON.parse(JSON.stringify(docDefinition));

  // define pdf oriantation
  defination.pageOrientation = isLandscape ? "landscape" : "portrait";

  // info to pdf
  defination.info = info;

  // perform appropriate action based on user choice
  if (printMode == "print") {
    pdfMake.createPdf(defination).print();
  } else if (printMode == "download") {
    pdfMake.createPdf(defination).download(fileName);
  } else {
    pdfMake.createPdf(defination).open();
  }
};

export { exportToPDF };
