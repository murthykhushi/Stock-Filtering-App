import React from 'react';

const FinancialTable = ({ data }) => {
  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2 text-left font-semibold">Date</th>
          <th className="px-4 py-2 text-left font-semibold">Revenue</th>
          <th className="px-4 py-2 text-left font-semibold">Net Income</th>
          <th className="px-4 py-2 text-left font-semibold">Gross Profit</th>
          <th className="px-4 py-2 text-left font-semibold">EPS</th>
          <th className="px-4 py-2 text-left font-semibold">Operating Income</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
            <td className="px-4 py-2 border-t border-gray-300">{item.date}</td>
            <td className="px-4 py-2 border-t border-gray-300">{item.revenue}</td>
            <td className="px-4 py-2 border-t border-gray-300">{item.netIncome}</td>
            <td className="px-4 py-2 border-t border-gray-300">{item.grossProfit}</td>
            <td className="px-4 py-2 border-t border-gray-300">{item.eps}</td>
            <td className="px-4 py-2 border-t border-gray-300">{item.operatingIncome}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FinancialTable;
