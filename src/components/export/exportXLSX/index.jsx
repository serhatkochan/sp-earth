import React from 'react';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import './index.scss';

const ExportXLSX = ({ csvData, csvHeaders, fileName, icon, text }) => {
  // ******** XLSX with object key as header *************
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (csvData, csvHeaders, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wsCols = [
      { wch: 5 },
      { wch: 12 },
      { hidden: true },
      { wch: 24 },
      { wch: 12 },
      { wch: 11 },
      { wch: 12 },
      { hidden: true },
      { wch: 15 },
      { wch: 2 },
      { wch: 14 },
      { wch: 6 },
      { wch: 6 },
    ];
    ws['!cols'] = wsCols;
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  /*
  const heading = [
    'Student No',
    'First Name',
    'Last Name',
    'Phone Number',
    'Province Name',
    'District Name',
    'Email',
    'Role',
    'Is Active',
  ];
    const exportToCSV = (csvData, csvHeaders, fileName, wscols) => {
    const labels = [
      csvHeaders.map((res) => {
        return res.key;
      }),
    ];
    const ws = XLSX.utils.json_to_sheet(heading, {
      header: labels[0],
      skipHeader: true,
      origin: 0, //ok
    });
    ws['!cols'] = wscols;
    XLSX.utils.sheet_add_json(ws, csvData, {
      header: labels[0],
      skipHeader: true,
      origin: -1, //ok
    });
  };
   */

  return (
    <div
      className={'button'}
      onClick={(e) => exportToCSV(csvData, csvHeaders, fileName)}
    >
      <span>
        {icon} {text}
      </span>
    </div>
  );
};

export default ExportXLSX;
