import React from 'react'
import { useState } from "react";

const { default: Stats } = require("./Stats");

const Info = ({ userData, auth, setUserData }) => {
  const [newImageFile, setNewImageFile] = useState(null);

  const handleImageChange = (e) => {
    setNewImageFile(e.target.files[0]);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleUpdateUserImage = async () => {
    if (newImageFile) {
      // Simulate image upload
      const imageUrl = URL.createObjectURL(newImageFile);
      setUserData((prev) => ({
        ...prev,
        imageUrl, // Update user image
      }));
      setNewImageFile(null); // Clear file input
    }
  };
  return (
    <>
      <section className="flex items-center justify-between mb-6">
        <div className="relative">
          <img
            src={userData.imageUrl}
            alt="User"
            className="w-24 h-24 rounded-full object-cover"
          />
          {auth && (
            <input
              type="file"
              onChange={handleImageChange}
              className="absolute top-0 right-0 opacity-0 cursor-pointer"
              accept="image/*"
              onClick={(e) => (e.target.value = null)} // Reset file input
            />
          )}
          {auth && (
            <button
              onClick={handleUpdateUserImage}
              className="absolute top-0 right-0 bg-green-600 text-white rounded-full px-2"
            >
              Swap
            </button>
          )}
        </div>
        <div>
          <h1 className="text-4xl font-bold">{userData.name}</h1>
          <p className="text-gray-400">{userData.email}</p>
        </div>
      </section>

      {/* Editable User Info */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between">
            <label>Name</label>
            {auth ? (
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="bg-gray-800 text-white rounded px-3 py-2"
              />
            ) : (
              <span>{userData.name}</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <label>Email</label>
            {auth ? (
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="bg-gray-800 text-white rounded px-3 py-2"
              />
            ) : (
              <span>{userData.email}</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <label>Phone</label>
            {auth ? (
              <input
                type="tel"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                className="bg-gray-800 text-white rounded px-3 py-2"
              />
            ) : (
              <span>{userData.phone}</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <label>GitHub</label>
            {auth ? (
              <input
                type="text"
                name="github"
                value={userData.github}
                onChange={handleInputChange}
                className="bg-gray-800 text-white rounded px-3 py-2"
              />
            ) : (
              <span>{userData.github}</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <label>LinkedIn</label>
            {auth ? (
              <input
                type="text"
                name="linkedin"
                value={userData.linkedin}
                onChange={handleInputChange}
                className="bg-gray-800 text-white rounded px-3 py-2"
              />
            ) : (
              <span>{userData.linkedin}</span>
            )}
          </div>
        </div>
        {/* User Stats */}
        <Stats userData={userData} />
      </section>
    </>
  );
}


export default Info;