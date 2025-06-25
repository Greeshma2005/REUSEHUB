import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const dummyItems = [
  {
    _id: '1',
    itemName: 'Winter Jacket',
    category: 'Clothes',
    location: 'Delhi',
    latitude: 28.6139,
    longitude: 77.209,
    description: 'Warm and barely used jacket, suitable for cold weather.',
    donorEmail: 'donor1@example.com',
    imageUrls: [
      'https://via.placeholder.com/300x200?text=Winter+Jacket+1',
      'https://via.placeholder.com/300x200?text=Winter+Jacket+2',
    ],
  },
  {
    _id: '2',
    itemName: 'Story Books',
    category: 'Books',
    location: 'Mumbai',
    latitude: 19.076,
    longitude: 72.8777,
    description: 'Set of children’s story books.',
    donorEmail: 'donor2@example.com',
    imageUrls: [
      'https://via.placeholder.com/300x200?text=Books+1',
      'https://via.placeholder.com/300x200?text=Books+2',
    ],
  },
];

const RequestPage = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setItems(dummyItems); 
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
                src={item.imageUrls?.[0]}
                alt={item.itemName}
                className="w-full h-40 object-cover rounded"
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
