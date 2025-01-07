import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios (if you're using it)
import FinancialTable from './FinancialTable.jsx';  // Correct the path if necessary

const App = () => {
  // State to store the API data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);  // State to track loading status
  const [error, setError] = useState(null);  // State to track error

  // Fetch data from the API on component mount
  useEffect(() => {
    // Replace with your actual API endpoint
    const fetchData = async () => {
      try {
        // Using axios to fetch the data
        const response = await axios.get('https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=T3t94ZnGX71mNbrM1VnW4YUoKtiHg9d7'); // API URL goes here
        setData(response.data);  // Store the API data in state
        setLoading(false);  // Stop loading
      } catch (err) {
        setError('Error fetching data');  // Set error state if something goes wrong
        setLoading(false);  // Stop loading
      }
    };

    fetchData();  // Call the fetch function
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  if (loading) {
    return <div>Loading...</div>;  // Show loading indicator while data is being fetched
  }

  if (error) {
    return <div>{error}</div>;  // Show error message if fetching fails
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Financial Table</h1>
      <FinancialTable data={data} />  {/* Pass the fetched data to FinancialTable */}
    </div>
  );
};

export default App;