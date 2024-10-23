import React, { useState, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 10;

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true); 
      const response = await fetch('https://dummyjson.com/users');
      const data = await response.json();
      setReports(data.users);
      setLoading(false); 
    };
    fetchReports();
  }, []);

  // Filtering reports based on the search input
  const filteredReports = reports.filter((report) =>
    report.firstName.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);

  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        {/* Header */}
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Reports Dashboard</h1>
          <input
            type="text"
            placeholder="Search by user..."
            className="border rounded-md p-2 w-full sm:w-1/3"
            onChange={(e) => setSearch(e.target.value)}
          />
        </header>

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <BeatLoader color={'#4A90E2'} loading={loading} size={15} />
          </div>
        ) : (
          <>
            {/* Reports Table */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="w-full bg-gray-800 text-white text-left">
                    <th className="py-3 px-4 uppercase font-semibold text-sm">Name</th>
                    <th className="py-3 px-4 uppercase font-semibold text-sm">Email</th>
                    <th className="py-3 px-4 uppercase font-semibold text-sm">Age</th>
                    <th className="py-3 px-4 uppercase font-semibold text-sm">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {currentReports.length > 0 ? (
                    currentReports.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-100 transition-colors duration-200">
                        <td className="py-3 px-4">{report.firstName} {report.lastName}</td>
                        <td className="py-3 px-4">{report.email}</td>
                        <td className="py-3 px-4">{report.age}</td>
                        <td className="py-3 px-4">{report.role}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-6 text-gray-500">No reports found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
              <button
                className={`px-4 py-2 mr-2 text-white bg-gray-600 rounded-md ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="px-4 py-2 text-gray-800">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className={`px-4 py-2 ml-2 text-white bg-gray-600 rounded-md ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Reports;
