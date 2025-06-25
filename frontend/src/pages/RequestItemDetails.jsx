/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { useLocation, useNavigate } from 'react-router-dom';

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN'; 

const RequestItemDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const item = state?.item;
  const mapContainer = useRef(null);

  const [message, setMessage] = useState('');
  const [showFullImage, setShowFullImage] = useState({ visible: false, url: '' });

  useEffect(() => {
    if (item && mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [item.longitude, item.latitude],
        zoom: 12,
      });

      new mapboxgl.Marker().setLngLat([item.longitude, item.latitude]).addTo(map);

      return () => map.remove();
    }
  }, [item]);

  const handleSendMessage = () => {
    if (!message.trim()) {
      alert('Please enter a message.');
      return;
    }

    alert(`Message sent to ${item.donorEmail}\n\nItem: ${item.itemName}\nMessage: ${message}`);
    setMessage('');
  };

  if (!item) {
    return <div className="pt-24 text-center text-red-500">No item found.</div>;
  }

  return (
    <div className="pt-24 px-4 sm:px-8 bg-gray-50 min-h-screen relative">
      <button
        onClick={() => navigate('/request')}
        className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        ← Back to All Items
      </button>

      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-green-700 mb-4">{item.itemName}</h1>
        <div className="flex gap-4 overflow-x-auto mb-4">
          {item.imageUrls.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`Image ${idx + 1}`}
              className="w-60 h-40 object-cover rounded cursor-pointer"
              onClick={() => setShowFullImage({ visible: true, url })}
            />
          ))}
        </div>

        <p className="text-sm mb-2"><strong>Category:</strong> {item.category}</p>
        <p className="text-sm mb-2"><strong>Location:</strong> {item.location}</p>
        <p className="text-sm mb-4"><strong>Description:</strong> {item.description}</p>
        <div ref={mapContainer} className="h-64 w-full rounded border mb-4"></div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a message to the donor..."
          rows={4}
          className="w-full border rounded px-4 py-2 text-sm mb-3"
        ></textarea>
        <button
          onClick={handleSendMessage}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Send Message
        </button>
      </div>
      {showFullImage.visible && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="relative max-w-3xl w-full px-4">
            <button
              onClick={() => setShowFullImage({ visible: false, url: '' })}
              className="absolute top-2 right-2 text-white text-3xl font-bold hover:text-red-400"
            >
              ×
            </button>
            <img
              src={showFullImage.url}
              alt="Full View"
              className="w-full max-h-[90vh] object-contain rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestItemDetails;
