import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RequestPage = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/donations`);
        if (!res.ok) throw new Error('Failed to fetch donations');
        const data = await res.json();

        const transformed = data.map((donation) => ({
          _id: donation._id,
          itemName: donation.itemName,
          category: donation.category,
          location: donation.location,
          description: donation.description,
          donorEmail: donation?.donor?.email || 'Unknown',
          latitude: donation.latitude,
          longitude: donation.longitude,
          imageUrls: donation.images.map((img) => `${process.env.REACT_APP_BACKEND_URL}/uploads/${img}`),
        }));

        setItems(transformed);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    fetchDonations();
  }, []);

  const filteredItems = items.filter((item) =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-24 px-4 sm:px-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-6">Request an Item</h1>

      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by item name or location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded shadow-sm text-sm"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded-lg shadow">
              <img
                src={item.imageUrls?.[0] || 'https://via.placeholder.com/300x200?text=No+Image'}
                alt={item.itemName}
                className="w-full h-64 object-contain rounded bg-gray-100"
              />

              <h2 className="mt-3 text-xl font-semibold text-green-800">{item.itemName}</h2>
              <p className="text-sm text-gray-600">{item.category}</p>
              <p className="text-sm text-gray-500">{item.location}</p>
              <button
                onClick={() => navigate(`/request/${item._id}`, { state: { item } })}
                className="mt-3 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No items found.</p>
        )}
      </div>
    </div>
  );
};

export default RequestPage;
