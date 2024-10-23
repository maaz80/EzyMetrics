import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users?limit=15');
        const data = await response.json();
        setLeads(data.users);
        console.log(data.users);
      } catch (err) {
        setError('Failed to fetch leads data.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const handleDelete = (id) => {
    // Delete lead logic
    setLeads(leads.filter(lead => lead.id !== id));
  };

  // Loader 
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <BeatLoader color="#4A90E2" size={15} />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container p-1 md:p-0 bg-gray-100 h-[100vh] overflow-y-scroll">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-400 p-3">Leads Dashboard</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {leads.map((lead) => (
          <div key={lead.id} className="bg-white flex  flex-col justify-between rounded-lg shadow-md p-2 md:p-4 w-72 transition-shadow duration-300 hover:shadow-lg flex-wrap overflow-hidden">
            <img 
              src={lead.image || 'https://via.placeholder.com/150'} 
              alt={`${lead.firstName} ${lead.lastName}`} 
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-center">{lead.firstName} {lead.lastName}</h2>
            <p className="text-gray-700"><strong>Company: </strong>{lead.company?.name}</p>
            <p className="text-gray-700"><strong>Phone:</strong> {lead.phone}</p>
            <p className="text-gray-700"><strong>Age:</strong> {lead.age}</p>
            <div className="flex justify-between mt-4">
              <Link 
                to={{ pathname: `/leaddetails/${lead.id}`, state: { lead } }} 
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                View Details
              </Link>
              <button 
                onClick={() => handleDelete(lead.id)} 
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leads;
