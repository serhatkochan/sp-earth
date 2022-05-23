import React from 'react';
import Button from 'components/button';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import './index.scss';

const ExportXLSX = ({ csvData, csvHeaders, fileName, wscols, icon, text }) => {
  // ******** XLSX with object key as header *************
  // const fileType =
  //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  // const fileExtension = ".xlsx";

  // const exportToCSV = (csvData, fileName) => {
  //   const ws = XLSX.utils.json_to_sheet(csvData);
  //   const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  //   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  //   const data = new Blob([excelBuffer], { type: fileType });
  //   FileSaver.saveAs(data, fileName + fileExtension);
  // };

  // ******** XLSX with new header *************
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const heading = [
    {
      studentNo: 'Student No',
      firstName: 'First Name',
      lastName: 'Last Name',
      phoneNumber: 'Phone Number',
      provinceName: 'Province Name',
      districtName: 'District Name',
      email: 'email',
      role: 'role',
      isActive: 'isActive',
    },
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
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <div
      className={'button'}
      onClick={(e) => exportToCSV(csvData, csvHeaders, fileName, wscols)}
    >
      <span>
        {icon} {text}
      </span>
    </div>
  );
};

export default ExportXLSX;
