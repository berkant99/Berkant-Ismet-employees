import React from 'react';
import { differenceInDays, isBefore, isAfter, isToday } from 'date-fns';

const findLongestWorkedPair = (data) => {
    if (data && data.length > 0) {
        let longestWorkedPair = ['', '', '', 0];

        for (let i = 0; i < data.length - 1; i++) {
            const { EmpID, ProjectID, DateFrom, DateTo } = data[i];
            for (let j = i + 1; j < data.length; j++) {
                const { EmpID: otherEmpID, ProjectID: otherProjectID, DateFrom: otherDateFrom, DateTo: otherDateTo } = data[j];
                if (EmpID !== otherEmpID && ProjectID === otherProjectID) {
                    const startDate = isToday(DateFrom) ? new Date() : DateFrom;
                    const endDate = isToday(DateTo) ? new Date() : DateTo;
                    const otherStartDate = isToday(otherDateFrom) ? new Date() : otherDateFrom;
                    const otherEndDate = isToday(otherDateTo) ? new Date() : otherDateTo;

                    if (isBefore(startDate, otherEndDate) && isAfter(endDate, otherStartDate)) {
                        const overlappingStartDate = startDate > otherStartDate ? startDate : otherStartDate;
                        const overlappingEndDate = endDate < otherEndDate ? endDate : otherEndDate;
                        const daysWorked = differenceInDays(overlappingEndDate, overlappingStartDate) + 1;

                        if (daysWorked > longestWorkedPair[3]) {
                            longestWorkedPair = [EmpID, otherEmpID, ProjectID, daysWorked];
                        }
                    }
                }
            }
        }

        return longestWorkedPair;
    }
};

const LongestWorkedPairTable = ({ data }) => {
    const longestWorkedPair = findLongestWorkedPair(data);
    return (
        <div>
            <h2>Longest Worked Pair</h2>
            {data.length > 1 && (
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Employee ID #1</th>
                                <th>Employee ID #2</th>
                                <th>Project ID</th>
                                <th>Days worked</th>
                            </tr>
                        </thead>
                        <tbody>
                            {longestWorkedPair.length > 0 && (
                                <tr>
                                    <td>{longestWorkedPair[0]}</td>
                                    <td>{longestWorkedPair[1]}</td>
                                    <td>{longestWorkedPair[2]}</td>
                                    <td>{longestWorkedPair[3]}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default LongestWorkedPairTable;
