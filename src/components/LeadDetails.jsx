import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

const LeadDetails = () => {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/users/${id}`);
        if (!response.ok) throw new Error('Failed to fetch lead details.');
        const data = await response.json();
        setLead(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch lead details.');
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <BeatLoader color="#3498db" size={15} />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto p-1 md:p-6 bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">Lead Details</h1>
      {lead ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8">
          <div className="bg-white rounded-lg shadow-md p-1 md:p-6 shadow-black md:shadow-lg">
            <div className="flex flex-col items-center">
              <img 
                src={lead.image || 'https://via.placeholder.com/150'} 
                alt={`${lead.firstName} ${lead.lastName}`} 
                className="w-32 h-32 rounded-full mb-4"
              />
              <h2 className="text-2xl font-semibold text-gray-800">{lead.firstName} {lead.lastName}</h2>
              <p className="text-sm text-gray-500">{lead.role}</p>
            </div>
            <div className="mt-4">
              <p className="text-gray-700"><strong>Email:</strong> {lead.email}</p>
              <p className="text-gray-700"><strong>Phone:</strong> {lead.phone}</p>
              <p className="text-gray-700"><strong>Age:</strong> {lead.age}</p>
              <p className="text-gray-700"><strong>Gender:</strong> {lead.gender}</p>
              <p className="text-gray-700"><strong>Blood Group:</strong> {lead.bloodGroup}</p>
              <p className="text-gray-700"><strong>Birth Date:</strong> {new Date(lead.birthDate).toLocaleDateString()}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">Physical Attributes</h3>
              <p className="text-gray-700"><strong>Height:</strong> {lead.height} cm</p>
              <p className="text-gray-700"><strong>Weight:</strong> {lead.weight} kg</p>
              <p className="text-gray-700"><strong>Eye Color:</strong> {lead.eyeColor}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-1 md:p-6 shadow-black md:shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Address</h3>
            <p className="text-gray-700"><strong>Street:</strong> {lead.address?.address}</p>
            <p className="text-gray-700"><strong>City:</strong> {lead.address?.city}</p>
            <p className="text-gray-700"><strong>State:</strong> {lead.address?.state} ({lead.address?.stateCode})</p>
            <p className="text-gray-700"><strong>Postal Code:</strong> {lead.address?.postalCode}</p>
            <p className="text-gray-700"><strong>Country:</strong> {lead.address?.country}</p>
            <p className="text-gray-700"><strong>Coordinates:</strong> Lat: {lead.address?.coordinates.lat}, Lng: {lead.address?.coordinates.lng}</p>
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Company Details</h3>
              <p className="text-gray-700"><strong>Company Name:</strong> {lead.company?.name}</p>
              <p className="text-gray-700"><strong>Department:</strong> {lead.company?.department}</p>
              <p className="text-gray-700"><strong>Job Title:</strong> {lead.company?.title}</p>
              <p className="text-gray-700"><strong>Company Address:</strong> {lead.company?.address?.address}, {lead.company?.address?.city}, {lead.company?.address?.state} ({lead.company?.address?.stateCode}), {lead.company?.address?.postalCode}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-red-500">No lead data available.</p>
      )}
    </div>
  );
};

export default LeadDetails;
