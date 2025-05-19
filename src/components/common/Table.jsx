import React from "react";

const Table = ({ columns, data }) => {
  return (
    <div className="overflow-auto">
      <table className="w-full table-auto border border-white/30 text-sm">
        <thead className="bg-white/10">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="p-2 text-left">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, i) => (
                <td key={i} className="p-2">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
