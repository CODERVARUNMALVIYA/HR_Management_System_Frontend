import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const priorityColors = {
  low: 'bg-green-100 text-green-900',
  medium: 'bg-yellow-100 text-yellow-900',
  high: 'bg-red-100 text-red-900',
};

const priorityOrder = {
  high: 1,
  medium: 2,
  low: 3,
};

const AdminTaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { token } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const fetchTasks = async (page = 1) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/tasks?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data.tasks || []);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('❌ Error fetching tasks:', err);
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchTasks(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks(currentPage);
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Sort tasks by priority (High > Medium > Low)
  const sortedTasks = [...tasks].sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="p-6 mt-20">
      <Navbar />
      <h2 className="text-2xl font-bold mb-4">All Tasks (Sorted by Priority)</h2>

      <table className="w-full border shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 border">Title</th>
            <th className="p-3 border">Assigned To</th>
            <th className="p-3 border">Priority</th>
            <th className="p-3 border">Due Date</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.length > 0 ? (
            sortedTasks.map(task => (
              <tr key={task._id} className={`${priorityColors[task.priority]} border`}>
                <td className="p-3 border">{task.title}</td>
                <td className="p-3 border">{task.assignedTo?.username || 'N/A'}</td>
                <td className="p-3 border capitalize">{task.priority}</td>
                <td className="p-3 border">
                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
                </td>
                <td className="p-3 border capitalize">{task.status || 'Pending'}</td>
                <td className="p-3 border space-x-2">
                  <button
                    onClick={() => navigate(`/admin/tasks/update/${task._id}`)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4">No tasks found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          ⬅ Prev
        </button>

        <span className="font-bold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default AdminTaskList;
