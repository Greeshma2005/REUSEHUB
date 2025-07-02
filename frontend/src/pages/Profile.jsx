/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('donations');
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${token}` };

      // Fetch donations
      const donationRes = await fetch('http://localhost:5000/api/donations/my-donations', {
        headers,
      });
      if (!donationRes.ok) throw new Error('Failed to fetch donations');
      const donations = await donationRes.json();

      // Fetch requests
      const requestRes = await fetch('http://localhost:5000/api/requests/my-requests', {
  headers,
});

      if (!requestRes.ok) throw new Error('Failed to fetch requests');
      const requests = await requestRes.json();

      // Get user from local storage
      const user = JSON.parse(localStorage.getItem('reusehubLoggedInUser')) || {};

      setUserData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        donations,
        requests,
      });

      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    } catch (err) {
      console.error('Error fetching profile data:', err);
      alert(`Error fetching profile data: ${err.message}`);
    }
  };

  fetchUserData();
}, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSave = async () => {
  if (!isValidEmail(formData.email)) {
    alert('Please enter a valid email address.');
    return;
  }

  const token = localStorage.getItem('token');

  try {
    const res = await fetch('http://localhost:5000/api/update-profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error('Failed to update profile');
    const data = await res.json();

    setUserData((prev) => ({
      ...prev,
      ...data.user,
    }));

    localStorage.setItem('reusehubLoggedInUser', JSON.stringify(data.user));
    setEditMode(false);
    alert('Profile updated successfully!');
  } catch (err) {
    alert('Error updating profile');
  }
};


  const handleLogoutConfirm = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('reusehubLoggedInUser');
    window.location.href = '/';
  };

  const handleViewItem = (item) => {
    setViewItem(item);
    setImageIndex(0);
  };

  const handleDeleteItem = async (donationId) => {
    if (!window.confirm('Are you sure you want to delete this donation?')) return;

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/donations/${donationId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to delete');
      setUserData((prev) => ({
        ...prev,
        donations: prev.donations.filter((d) => d._id !== donationId),
      }));

      alert('Donation deleted successfully!');
    } catch (err) {
      alert('Error deleting donation.');
    }
  };

  const renderItems = (items, showDelete = true) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
    {items.map((item) => (
      <div
        key={item._id}
        className="bg-white border border-green-100 rounded-xl shadow-sm p-4 flex flex-col gap-3 hover:shadow-md transition"
      >
        <img
          src={
            item.images && item.images.length > 0
              ? `http://localhost:5000/uploads/${item.images[0]}`
              : 'https://via.placeholder.com/60?text=Item'
          }
          alt={item.itemName}
          title={item.itemName}
          className="w-full aspect-video object-cover rounded"
        />
        <div>
          <p className="font-semibold text-green-900">{item.itemName}</p>
          <p className="text-sm text-gray-500">{item.category}</p>
          <p className="text-xs text-gray-400">Posted on: {new Date(item.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="flex justify-between mt-2">
          <button
            className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs hover:bg-green-200"
            onClick={() => handleViewItem(item)}
          >
            View
          </button>

          {/* ✅ Only show delete button if showDelete is true */}
          {showDelete && (
            <button
              className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs hover:bg-red-200"
              onClick={() => handleDeleteItem(item._id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    ))}
  </div>
);


  if (!userData) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-green-50 pt-28 pb-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left: Profile Info */}
        <div className="w-full lg:w-1/3 bg-green-100 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-24 h-24 rounded-full bg-green-300 flex items-center justify-center text-white text-2xl font-bold mx-auto">
              {userData.name[0]}
            </div>
            <div className="text-center">
              {['name', 'email', 'phone'].map((field) => (
                <div key={field} className="mb-3">
                  <label className="text-xs text-green-800 font-semibold block">
                    {field.toUpperCase()}
                  </label>
                  {editMode ? (
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full border border-green-300 rounded px-2 py-1 text-sm"
                    />
                  ) : (
                    <p className="text-gray-800">{userData[field]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center gap-4">
            {editMode ? (
              <button
                onClick={handleSave}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700 transition"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="w-full bg-white text-green-700 border border-green-500 py-2 px-4 rounded-full hover:bg-green-200 transition"
              >
                Edit Profile
              </button>
            )}
            <button
              onClick={() => setShowLogoutPopup(true)}
              className="w-full bg-red-100 text-red-600 border border-red-400 py-2 px-4 rounded-full hover:bg-red-200 transition"
            >
              Log out
            </button>
          </div>
        </div>

        {/* Right: Donations/Requests */}
        <div className="w-full lg:w-2/3 p-8">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">My Activity</h2>
          <div className="flex gap-4 mb-6 justify-center">
            {['donations', 'requests'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeTab === tab
                    ? 'bg-green-600 text-white'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {tab === 'donations' ? 'My Donations' : 'My Requests'}
              </button>
            ))}
          </div>

          <div>
            {activeTab === 'donations' && (
  userData.donations.length > 0
    ? renderItems(userData.donations, true) // 👈 allow delete
    : <p className="text-center text-gray-500">No donations yet.</p>
)}
{activeTab === 'requests' && (
  userData.requests.length > 0
    ? renderItems(userData.requests, false) // 👈 no delete
    : <p className="text-center text-gray-500">No requests yet.</p>
)}

          </div>
        </div>
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm text-center">
            <p className="text-lg font-semibold text-gray-800 mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Item Popup with Image Slider */}
      {viewItem && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
              onClick={() => setViewItem(null)}
            >
              ×
            </button>
            <h2 className="text-xl font-semibold text-green-800 mb-3">{viewItem.itemName}</h2>
            {viewItem.images?.length > 0 && (
              <div className="relative mb-4">
                <img
                  src={`http://localhost:5000/uploads/${viewItem.images[imageIndex]}`}
                  alt={`Image ${imageIndex + 1}`}
                  className="max-h-[75vh] w-auto max-w-full mx-auto object-contain rounded"
                />
                {viewItem.images.length > 1 && (
                  <>
                    <button
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 px-2 py-1 rounded-full"
                      onClick={() =>
                        setImageIndex((prev) =>
                          prev === 0 ? viewItem.images.length - 1 : prev - 1
                        )
                      }
                    >
                      ◀
                    </button>
                    <button
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 px-2 py-1 rounded-full"
                      onClick={() =>
                        setImageIndex((prev) =>
                          prev === viewItem.images.length - 1 ? 0 : prev + 1
                        )
                      }
                    >
                      ▶
                    </button>
                  </>
                )}
              </div>
            )}
            <p><strong>Category:</strong> {viewItem.category}</p>
            <p><strong>Location:</strong> {viewItem.location}</p>
            <p><strong>Address:</strong> {viewItem.address}</p>
            <p><strong>Description:</strong> {viewItem.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              Posted on: {new Date(viewItem.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;