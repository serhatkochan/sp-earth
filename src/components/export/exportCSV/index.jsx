import React from 'react';
import { CSVLink } from 'react-csv';
import './index.scss';

const ExportCSV = ({ csvHeaders, csvData, fileName, icon, text }) => (
  <CSVLink
    headers={csvHeaders}
    data={csvData}
    filename={fileName}
    className={'csv-link'}
  >
    <span>
      {icon} {text}
    </span>
  </CSVLink>
);

export default ExportCSV;
