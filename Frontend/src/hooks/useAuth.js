// src/hooks/useAuth.js
// MOCK AUTH HOOK - REPLACE WITH REAL AuthContext LATER
import { useState } from 'react';

const useAuth = () => {
  // Simulate a logged-in user.
  // In a real app, this would come from AuthContext.
  // You can change 'role' to 'owner', 'renter', or 'admin' to test different dashboards.
  const [mockUser, setMockUser] = useState({
    isLoggedIn: true,
    name: "Demo User",
    email: "demo@example.com",
    role: "renter", // Change to 'owner' or 'renter' to test different dashboards
  });

  // Function to simulate role change for testing
  const setMockRole = (newRole) => {
    setMockUser(prev => ({ ...prev, role: newRole }));
  };

  return {
    user: mockUser,
    isLoggedIn: mockUser.isLoggedIn,
    isLoading: false, // Simulate auth loading as false for now
    logout: () => {
      setMockUser({ isLoggedIn: false, name: "", email: "", role: null });
      console.log("Mock logout");
    },
    // For testing purposes only:
    setMockRole,
  };
};

export default useAuth;