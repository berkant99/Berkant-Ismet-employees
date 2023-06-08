import React, { useState } from 'react';
import Papa from 'papaparse';
import { parse } from 'date-fns';
import ProjectsTable from './ProjectsTable';
import LongestWorkedPairTable from './LongestWorkedPairTable';

function App() {
  const [data, setData] = useState("");

  const DATE_FORMATS = [
    'yyyy-MM-dd',       // e.g., 2023-06-07
    'dd/MM/yyyy',       // e.g., 07/06/2023
    'MM/dd/yyyy',       // e.g., 06/07/2023
    'dd-MMM-yyyy',      // e.g., 07-Jun-2023
    'MMM dd, yyyy',     // e.g., Jun 07, 2023
    'MMMM dd, yyyy',    // e.g., June 07, 2023
    'dd MMMM yyyy',     // e.g., 07 June 2023
    'yyyy/MM/dd',       // e.g., 2023/06/07
    'dd-MM-yyyy',       // e.g., 07-06-2023
    'MM-dd-yyyy',       // e.g., 06-07-2023
    'dd.MM.yyyy',       // e.g., 07.06.2023
    'MMM. dd, yyyy',    // e.g., Jun. 07, 2023
    'MMMM dd. yyyy',    // e.g., June 07. 2023
    'dd MMMM, yyyy',    // e.g., 07 June, 2023
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const csvData = reader.result;
      parseCSV(csvData);
    };
    reader.readAsText(file);
  };

  const parseCSV = (csvData) => {
    Papa.parse(csvData, {
      header: true,
      complete: (results) => {
        const parsedData = results.data
          .filter((row) => Object.values(row).some((value) => value.trim() !== '')) // Filter out empty rows
          .map((row) => ({
            EmpID: parseInt(row.EmpID),
            ProjectID: parseInt(row.ProjectID),
            DateFrom: parseDate(row.DateFrom),
            DateTo: row.DateTo ? parseDate(row.DateTo) : new Date(),
          }));
        setData(parsedData);
      },
    });
  };

  const parseDate = (dateString) => {
    for (const format of DATE_FORMATS) {
      const parsedDate = parse(dateString, format, new Date());
      if (!isNaN(parsedDate)) {
        return parsedDate;
      }
    }
    throw new Error(`Invalid date format: ${dateString}`);
  };

  return (
    <div className="container">
      <h1 className="alert alert-info text-center">Employee App</h1>
      <input type="file" className="my-3 form-control" accept=".csv" onChange={handleFileUpload} />
      {data.length === 0 && (
        <div className="alert alert-warning text-center">
          No file uploaded
        </div>
      )}
      {data.length > 0 && (
        <div>
          <ProjectsTable data={data} />
          <LongestWorkedPairTable data={data} />
        </div>
      )}
    </div>
  );
}

export default App;
