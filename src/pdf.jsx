// import React from 'react';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// class PDFGenerator1 extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       blockchainData: [], // Data retrieved from the blockchain
//     };
//   }

//   generatePDF = () => {
//     const { blockchainData } = this.state;

//     // Initialize jsPDF
//     const doc = new jsPDF();

//     // Add header to the PDF
//     doc.text('Blockchain Data', 10, 10);

//     // Convert blockchain data to table format
//     const tableData = blockchainData.map(data => [data.field1, data.field2, data.field3]); // Replace field1, field2, etc., with actual fields

//     // Add table using jspdf-autotable plugin
//     doc.autoTable({
//       head: [['Field 1', 'Field 2', 'Field 3']], // Replace with actual column headers
//       body: tableData,
//       startY: 20,
//     });

//     // Save the PDF
//     doc.save('blockchain_data.pdf');
//   };

//   render() {
//     return (
//       <div>
//         <button onClick={this.generatePDF}>Generate PDF</button>
//       </div>
//     );
//   }
// }

// export default PDFGenerator1;


// import React, { useState } from 'react';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const PDFGenerator2 = () => {
//   const [blockchainData, setBlockchainData] = useState([]);

//   const generatePDF = () => {
//     // Create a new PDF document
//     const doc = new jsPDF();

//     // Add content to the PDF
//     doc.text('Blockchain Data', 10, 10);
//     doc.autoTable({
//       startY: 20,
//       head: [['Index', 'Data']], // Table header
//       body: blockchainData.map((data, index) => [index + 1, data]), // Table rows
//     });

//     // Save the PDF
//     doc.save('blockchain_data.pdf');
//   };

//   return (
//     <div>
//       <button onClick={generatePDF}>Generate PDF</button>
//     </div>
//   );
// };

// export default PDFGenerator2;




// import React from 'react';
// import jsPDF from 'jspdf';

// class PDFGenerator extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       blockchainData: [], // Data retrieved from the blockchain
//     };
//   }

//   generatePDF = () => {
//     const { blockchainData } = this.state;

//     // Create new PDF document
//     const doc = new jsPDF();

//     // Add content to the PDF
//     doc.text('Blockchain Data', 10, 10);
//     let y = 20;
//     blockchainData.forEach((data, index) => {
//       doc.text(`${index + 1}. ${data}`, 10, y);
//       y += 10;
//     });

//     // Save the PDF
//     doc.save('blockchain_data.pdf');
//   };

//   render() {
//     return (
//       <div>
//         <button onClick={this.generatePDF}>Generate PDF</button>
//       </div>
//     );
//   }
// }

// export default PDFGenerator;


