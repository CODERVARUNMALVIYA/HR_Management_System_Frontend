import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';

const UpdateTask = () => {
  const { id } = useParams();
  const { token } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState(null); // Initially null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const task = res.data.task || res.data; // handles both response formats

        const { title, description, priority, status, dueDate } = task;

        setTaskData({
          title,
          description,
          priority,
          status,
          dueDate: dueDate ? dueDate.split('T')[0] : '',
        });
      } catch (err) {
        console.error('❌ Error fetching task:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/tasks/${id}`, taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/admin/tasks');
    } catch (err) {
      console.error('❌ Error updating task:', err);
    }
  };

  if (loading || !taskData) return <div className="p-6 mt-20 text-center">Loading...</div>;

  return (
    <div className="p-6">
      <Navbar />
      <div className="max-w-xl mx-auto mt-20 bg-white shadow p-6 rounded">
        <h2 className="text-2xl font-bold mb-4">Update Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
          />
          <select
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <select
            name="status"
            value={taskData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <input
            type="date"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
