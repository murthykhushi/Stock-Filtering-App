import React, { useState, useEffect } from "react";

const FilteringData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minRevenue, setMinRevenue] = useState("");
  const [maxRevenue, setMaxRevenue] = useState("");
  const [minNetIncome, setMinNetIncome] = useState("");
  const [maxNetIncome, setMaxNetIncome] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=T3t94ZnGX71mNbrM1VnW4YUoKtiHg9d7"
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterData = (data) => {
    return data.filter((item) => {
      const year = new Date(item.date).getFullYear();
      const startYear = startDate ? parseInt(startDate) : null;
      const endYear = endDate ? parseInt(endDate) : null;

      const dateInRange =
        (!startYear || year >= startYear) && (!endYear || year <= endYear);

      const revenueInRange =
        (!minRevenue || parseFloat(item.revenue) >= parseFloat(minRevenue)) &&
        (!maxRevenue || parseFloat(item.revenue) <= parseFloat(maxRevenue));

      const netIncomeInRange =
        (!minNetIncome || parseFloat(item.netIncome) >= parseFloat(minNetIncome)) &&
        (!maxNetIncome || parseFloat(item.netIncome) <= parseFloat(maxNetIncome));

      return dateInRange && revenueInRange && netIncomeInRange;
    });
  };

  const sortData = (data) => {
    if (!sortBy) return data;

    return [...data].sort((a, b) => {
      let aValue, bValue;

      if (sortBy === "date") {
        aValue = new Date(a.date);
        bValue = new Date(b.date);
      } else {
        aValue = parseFloat(a[sortBy]);
        bValue = parseFloat(b[sortBy]);
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  };

  const handleSort = (column, order) => {
    setSortBy(column);
    setSortOrder(order);
  };

  const formatNumber = (num) => new Intl.NumberFormat().format(num);

  const sortedData = sortData(filterData(data));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!loading && data.length === 0) return <p>No data available.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Financial Data App</h1>

      <div className="mb-6">
        <h3 className="font-bold text-lg mb-2">Filters</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <label className="flex flex-col">
            Start Year:
            <input
              type="number"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border px-2 py-1"
            />
          </label>
          <label className="flex flex-col">
            End Year:
            <input
              type="number"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border px-2 py-1"
            />
          </label>
          <label className="flex flex-col">
            Min Revenue:
            <input
              type="number"
              value={minRevenue}
              onChange={(e) => setMinRevenue(e.target.value)}
              className="border px-2 py-1"
            />
          </label>
          <label className="flex flex-col">
            Max Revenue:
            <input
              type="number"
              value={maxRevenue}
              onChange={(e) => setMaxRevenue(e.target.value)}
              className="border px-2 py-1"
            />
          </label>
          <label className="flex flex-col">
            Min Net Income:
            <input
              type="number"
              value={minNetIncome}
              onChange={(e) => setMinNetIncome(e.target.value)}
              className="border px-2 py-1"
            />
          </label>
          <label className="flex flex-col">
            Max Net Income:
            <input
              type="number"
              value={maxNetIncome}
              onChange={(e) => setMaxNetIncome(e.target.value)}
              className="border px-2 py-1"
            />
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-lg mb-2">Sorting Options</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleSort("date", "asc")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Date (Ascending)
          </button>
          <button
            onClick={() => handleSort("date", "desc")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Date (Descending)
          </button>
          <button
            onClick={() => handleSort("revenue", "asc")}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Revenue (Ascending)
          </button>
          <button
            onClick={() => handleSort("revenue", "desc")}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Revenue (Descending)
          </button>
          <button
            onClick={() => handleSort("netIncome", "asc")}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Net Income (Ascending)
          </button>
          <button
            onClick={() => handleSort("netIncome", "desc")}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Net Income (Descending)
          </button>
        </div>
      </div>

      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Revenue</th>
            <th className="px-4 py-2 text-left">Net Income</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } hover:bg-gray-50`}
            >
              <td className="px-4 py-2 border-t border-gray-300">{item.date}</td>
              <td className="px-4 py-2 border-t border-gray-300">
                {formatNumber(item.revenue)}
              </td>
              <td className="px-4 py-2 border-t border-gray-300">
                {formatNumber(item.netIncome)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilteringData;
