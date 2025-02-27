import React from "react";
import { useAuthStore } from "../store/authStore";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-600 text-white p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Stratos Dashboard</h1>
          <button
            onClick={logout}
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
          <h2 className="text-lg font-bold text-blue-800 mb-2">
            Welcome, {user?.name}!
          </h2>
          <p className="text-blue-600">
            You are now logged in to Stratos. More features will be available
            soon!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-bold mb-2">Your Profile</h3>
            <div className="space-y-2">
              <div>
                <span className="font-semibold">Name:</span> {user?.name}
              </div>
              <div>
                <span className="font-semibold">Email:</span> {user?.email}
              </div>
              <div>
                <span className="font-semibold">Account Type:</span>{" "}
                {user?.isPremium ? "Premium" : "Free"}
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Tab Management</li>
              <li>Image Tools</li>
              <li>Focus Mode</li>
              <li>Screenshot Tool</li>
              <li>And much more!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
