import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';

const AdminAddTask = () => {
  const navigate = useNavigate();
  const { taskId } = useParams(); // to detect update mode
  const { user, token } = useSelector(state => state.auth);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    assignedTo: ''
  });

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data.users);
      setError('');
    } catch (error) {
      console.error('Failed to load users', error);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  // Fetch task data if in update mode
  const fetchTaskDetails = async () => {
    try {
      const res = await axios.get(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const task = res.data.task;
      setForm({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate.split('T')[0], // for input type="date"
        priority: task.priority,
        assignedTo: task.assignedTo
      });
    } catch (error) {
      console.error('Failed to load task data', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    if (taskId) {
      fetchTaskDetails();
    }
  }, [taskId]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      if (taskId) {
        // UPDATE
        await axios.put(`/tasks/${taskId}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('✅ Task updated successfully!');
      } else {
        // CREATE
        await axios.post('/tasks', form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('✅ Task created successfully!');
      }

      setForm({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
        assignedTo: ''
      });
      navigate('/admin/tasks');

    } catch (error) {
      console.error('❌ Task operation failed:', error.response?.data || error);
      alert('Task operation failed');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
        <Navbar/>
      <h2 className="text-2xl font-bold mb-6">
        {taskId ? 'Update Task' : 'Create New Task'}
      </h2>
      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select
          name="assignedTo"
          value={form.assignedTo}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Assign to User</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {taskId ? 'Update Task' : 'Create Task'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/tasks')}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Go to Task List
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddTask;
