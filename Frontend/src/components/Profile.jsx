import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingHistory from './BookingHistory'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/api/auth'; 

//And yha see logout not working y

const Profile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("profile");
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto mb-4">
        <div className="flex gap-6 border-b pb-2 text-gray-500 font-medium">
          
          <p
            onClick={() => setActiveTab("profile")}
            className={`cursor-pointer pb-1 ${
              activeTab === "profile"
                ? "text-pink-500 border-b-2 border-pink-500"
                : "hover:text-gray-700"
            }`}>
            Profile
          </p>
          <p
            onClick={() => setActiveTab("orders")}
            className={`cursor-pointer pb-1 ${
              activeTab === "orders"
                ? "text-pink-500 border-b-2 border-pink-500"
                : "hover:text-gray-700"
            }`}>
            Your Orders
          </p>
        </div>
      </div>
      {activeTab === "profile" && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-4xl mx-auto">
          
          <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-gray-800 to-pink-500 text-white">
            <div className="w-12 h-12 rounded-full bg-white text-gray-800 flex items-center justify-center text-xl font-bold">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            <div className='flex flex-row justify-between'>
            <h2 className="text-2xl font-bold">Hi, {user?.name}</h2>
            <button onClick={()=>{useDispatch(logout())}}>
              <p className='text-sm text-white ml-150 hover:underline hover:text-blue-600 cursor-pointer'>➜] Logout</p>
              </button>
            </div>
          </div>
          <div className="p-6 border-b">
            <h3 className="font-semibold text-gray-700 mb-4">Account Details</h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-gray-500">Email Address</div>
              <div className="flex items-center justify-between">
                <span>{user?.email}</span>
                <span className="text-green-500 text-xs font-medium">Verified</span>
              </div>

              <div className="text-gray-500">Mobile Number</div>
              <div className="flex items-center justify-between">
                <span>+91 - {user?.phone}</span>
                <span className="text-green-500 text-xs font-medium">Verified</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="font-semibold text-gray-700 mb-4">Personal Details</h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <label className="text-gray-500">First Name</label>
                <input
                  type="text"
                  value={user?.name.split(" ")[0]}
                  className="w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div>
                <label className="text-gray-500">Last Name</label>
                <input
                  type="text"
                  value={user?.name.split(" ")[1]}
                  className="w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div>
                <label className="text-gray-500">Birthday (Optional)</label>
                <input
                  type="text"
                  value="15-04-2002"
                  className="w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div>
                <label className="text-gray-500">Identity (Optional)</label>
                <div className="flex gap-2 mt-2">
                  <button className="px-4 py-1 border rounded-md text-gray-600 hover:bg-gray-100">Woman</button>
                  <button className="px-4 py-1 bg-pink-500 text-white rounded-md">Man</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
      {activeTab === "orders" && <BookingHistory />}
    </div>
  )
}

export default Profile