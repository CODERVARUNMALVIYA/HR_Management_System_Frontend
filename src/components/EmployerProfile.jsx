import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployerProfile } from '../store/Slice/employerSlice'; // Import the thunk to fetch profile
import axios from '../utils/axios'; // Adjust the import based on your project structure

const EmployerProfile = () => {
  const dispatch = useDispatch();
  const { employerProfile, loading, error } = useSelector((state) => state.employee);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    salary: '',
  });
  const [isEditing, setIsEditing] = useState(false); // State to manage editing mode

  useEffect(() => {
    dispatch(fetchEmployerProfile());
  }, [dispatch]);

  useEffect(() => {
    // Populate form data when employerProfile is fetched
    if (employerProfile) {
      setFormData({
        name: employerProfile.employee?.name || '',
        email: employerProfile.employee?.email || '',
        position: employerProfile.employee?.jobDetails?.position || '',
        salary: employerProfile.employee?.jobDetails?.salary || '',
      });
    }
  }, [employerProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/employee/profile', {
        name: formData.name,
        email: formData.email,
        jobDetails: {
          position: formData.position,
          salary: formData.salary,
        },
      });

      console.log('Profile updated successfully:', response.data);
      // Optionally, you can re-fetch the profile to get the updated data
      dispatch(fetchEmployerProfile());
      setIsEditing(false); // Exit editing mode after submission
    } catch (err) {
      console.error('Error updating profile:', err.response.data);
      // Handle error (e.g., show an error message)
    }
  };

  console.log('Employer Profile:', employerProfile); // Check what you receive

  if (loading) {
    return <div className="text-center text-blue-500">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error: {typeof error === 'object' ? error.message || 'An error occurred' : error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg shadow-lg mt-6">
      <h2 className="text-4xl font-bold mb-6 text-center text-white">Employer Profile</h2>

      {employerProfile ? (
        <div className="p-6 bg-white shadow-xl rounded-lg">
          {/* Display profile data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
            <div className="p-4 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-md">
              <p className="text-sm font-medium">Name</p>
              <p className="text-lg font-bold">{employerProfile.employee?.name}</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-yellow-400 to-red-500 text-white rounded-lg shadow-md">
              <p className="text-sm font-medium">Email</p>
              <p className="text-lg font-bold">{employerProfile.employee?.email}</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-indigo-400 to-purple-500 text-white rounded-lg shadow-md">
              <p className="text-sm font-medium">Position</p>
              <p className="text-lg font-bold">{employerProfile.employee?.jobDetails?.position}</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-pink-400 to-red-500 text-white rounded-lg shadow-md">
              <p className="text-sm font-medium">Salary</p>
              <p className="text-lg font-bold">{employerProfile.employee?.jobDetails?.salary}</p>
            </div>
          </div>

          {/* Show Edit button and Update Profile Form */}
          {isEditing ? (
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-gray-700">Update Profile</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position</label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary</label>
                  <input
                    type="number"
                    id="salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-lg hover:bg-blue-600 transition ease-in-out duration-300">
                  Save Changes
                </button>
              </form>
            </div>
          ) : (
            <button onClick={() => setIsEditing(true)} className="mt-4 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-600 transition ease-in-out duration-300">
              Edit Profile
            </button>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-200">No profile data available.</div>
      )}
    </div>
  );
};

export default EmployerProfile;
