import React from 'react';

const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
};

const ProjectsTable = ({ data }) => {
    return (
        <div>
            <h2>Projects</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Project ID</th>
                        <th>Date from</th>
                        <th>Date to</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{row.EmpID}</td>
                            <td>{row.ProjectID}</td>
                            <td>{formatDate(row.DateFrom)}</td>
                            <td>{formatDate(row.DateTo)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectsTable;
