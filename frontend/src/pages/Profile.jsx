import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('donations');
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = {
        name: 'Greeshma Sri',
        email: 'greeshma@example.com',
        phone: '+91 98765 43210',
        donations: [],
        requests: [],
      };

      setUserData(user);
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSave = () => {
    if (!isValidEmail(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setUserData((prev) => ({
      ...prev,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    }));

    setEditMode(false);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem('authToken');
    setUserData(null);
    window.location.href = '/';
  };

  const renderItems = (items) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="bg-white border border-green-100 rounded-xl shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition"
        >
          <img
            src={item.image || 'https://via.placeholder.com/60?text=Item'}
            alt={item.item}
            className="w-14 h-14 rounded object-cover"
          />
          <div>
            <p className="font-medium text-green-900">{item.item}</p>
            <p className="text-sm text-gray-500">{item.date}</p>
          </div>
        </div>
      ))}
    </div>
  );

  if (!userData) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-green-50 pt-28 pb-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl overflow-hidden flex flex-col lg:flex-row">
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
        <div className="w-full lg:w-2/3 p-8">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
            My Activity
          </h2>

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
                ? renderItems(userData.donations)
                : <p className="text-center text-gray-500">No donations yet.</p>
            )}
            {activeTab === 'requests' && (
              userData.requests.length > 0
                ? renderItems(userData.requests)
                : <p className="text-center text-gray-500">No requests yet.</p>
            )}
          </div>
        </div>
      </div>
      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm text-center">
            <p className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to log out?
            </p>
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
    </div>
  );
};

export default Profile;
