import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../contexts/AuthContext';

const UserDashboardPage = () => {
  const [userItems, setUserItems] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const profileResponse = await axios.get('/users/profile');
        setUserProfile(profileResponse.data);

        if (profileResponse.data.role === 'seller') {
          const itemsResponse = await axios.get('/api/items/my-items');
          setUserItems(itemsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const renderSellerDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">My Listed Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userItems.map(item => (
            <div key={item._id} className="border rounded-lg p-4">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-green-600 font-semibold">${item.price}/day</p>
              <button
                onClick={() => navigate(`/items/${item._id}/edit`)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit Item
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate('/items/new')}
          className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          List New Item
        </button>
      </div>
    </div>
  );

  const renderBuyerDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">My Rentals</h2>
        <p className="text-gray-600">View and manage your rental history</p>
        <button
          onClick={() => navigate('/browse')}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Browse Items
        </button>
      </div>
    </div>
  );

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-3xl font-bold mb-4">Welcome, {userProfile.username}!</h1>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <p className="text-gray-600">Role: {userProfile.role}</p>
            <p className="text-gray-600">Email: {userProfile.email}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => navigate('/profile/edit')}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
              Edit Profile
            </button>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {userProfile.role === 'seller' ? renderSellerDashboard() : renderBuyerDashboard()}
    </div>
  );
};

export default UserDashboardPage;