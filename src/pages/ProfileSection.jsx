import React, { useState } from "react";
import { toast } from "../hooks/use-toast";

const initialProfile = {
  name: "Priya Sharma",
  id: "ALU2023123",
  phone: "+91 98765 43210",
  email: "priya.sharma@alumni.edu",
  address: "45, Green Park, New Delhi, India",
  bio: "Alumni mentor, passionate about tech, travel, and lifelong learning. Here to help students grow!",
  image: "https://randomuser.me/api/portraits/women/44.jpg", // working mock image
};

const iconClass = "w-5 h-5 text-orange-400 mr-2";

const ProfileSection = ({ profile = initialProfile, onSave }) => {
  const [form, setForm] = useState(profile);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEditMode(false);
      toast({ title: "Profile updated!", description: "Your profile has been successfully updated." });
      if (onSave) onSave(form);
    }, 1000);
  };

  const handleCancel = () => {
    setForm(profile);
    setEditMode(false);
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-orange-50 via-white to-pink-50 py-10 px-2 md:px-0 flex items-center justify-center">
      <section className="w-full max-w-5xl mx-auto rounded-3xl shadow-2xl bg-white/90 border border-orange-100 p-0 md:p-8 flex flex-col md:flex-row gap-8">
        {/* Left: Profile Card */}
        <div className="flex-1 flex flex-col items-center md:items-start bg-white rounded-2xl shadow p-8 md:p-10 border-l-8 border-orange-400 border-t border-b border-r border-orange-100">
          <div className="relative mb-6">
            <img
              src={form.image}
              alt={form.name}
              className="w-44 h-44 rounded-full object-cover border-8 border-orange-200 shadow-xl transition-all duration-300 hover:scale-105"
            />
            <span className="absolute bottom-3 right-3 bg-orange-500 text-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-pink-500 transition-all" title="Change photo">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 10-4-4l-8 8v3z" /><path d="M16 7l-1.5-1.5" /></svg>
            </span>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="flex items-center text-2xl font-bold text-gray-900">
              <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {form.name}
            </div>
            <div className="flex items-center text-gray-700">
              <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
              <span className="font-medium">ID:</span> <span className="ml-1">{form.id}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 2a2 2 0 012 2v16a2 2 0 01-2 2H8a2 2 0 01-2-2V4a2 2 0 012-2h8z" /></svg>
              <span className="font-medium">Email:</span> <span className="ml-1">{form.email}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" /><path d="M16 3v4a1 1 0 001 1h4" /></svg>
              <span className="font-medium">Phone:</span> <span className="ml-1">{form.phone}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0l-4.243 4.243" /><path d="M7 7h.01" /></svg>
              <span className="font-medium">Address:</span> <span className="ml-1">{form.address}</span>
            </div>
            <div className="flex items-start text-gray-700">
              <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M12 4v16m8-8H4" /></svg>
              <span className="font-medium">Bio:</span> <span className="ml-1">{form.bio}</span>
            </div>
          </div>
        </div>
        {/* Right: Edit Profile Form or Button */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start bg-gradient-to-br from-white via-orange-50 to-pink-50 rounded-2xl shadow p-8 md:p-10 border border-orange-100 min-h-[400px]">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-lg font-bold rounded-xl shadow-lg hover:from-orange-400 hover:to-pink-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              Edit Profile
            </button>
          ) : (
            <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
              <h3 className="text-xl font-semibold text-orange-600 mb-2">Edit Profile</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:ring-2 focus:ring-orange-400 bg-white text-gray-800 shadow-sm focus:shadow-lg transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student/Alumni ID</label>
                <input
                  type="text"
                  name="id"
                  value={form.id}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:ring-2 focus:ring-orange-400 bg-white text-gray-800 shadow-sm focus:shadow-lg transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:ring-2 focus:ring-orange-400 bg-white text-gray-800 shadow-sm focus:shadow-lg transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:ring-2 focus:ring-orange-400 bg-white text-gray-800 shadow-sm focus:shadow-lg transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:ring-2 focus:ring-orange-400 bg-white text-gray-800 shadow-sm focus:shadow-lg transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:ring-2 focus:ring-orange-400 bg-white text-gray-800 shadow-sm focus:shadow-lg transition-all duration-200 min-h-[80px]"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow hover:bg-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-lg shadow hover:from-orange-400 hover:to-pink-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  {loading ? "Saving..." : "Save Profile"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProfileSection; 