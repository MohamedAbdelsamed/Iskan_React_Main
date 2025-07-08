jsPDF = window.jspdf.jsPDF;
export const registerDubaiFont = (doc) => {
  doc.addFileToVFS("Dubai-Regular.ttf", "<base64_string>");
  doc.addFont("Dubai-Regular.ttf", "Dubai", "normal");
};