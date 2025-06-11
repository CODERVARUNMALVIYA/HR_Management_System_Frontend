import axios from '../utils/axios';
import { useEffect, useState } from 'react';
import NavbarUser from './NavbarUser';

const UserTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch tasks for the user
  const fetchTasks = async (page = 1) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`http://localhost:8000/api/tasks?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data.tasks);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to load tasks.");
    }
  };

  useEffect(() => {
    fetchTasks(currentPage);
  }, [currentPage]);

  // Handle pagination button clicks
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchTasks(page);
    }
  };

  // Update task status (PATCH)
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.patch(`http://localhost:8000/api/tasks/${taskId}/status`, {
        status: newStatus,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      fetchTasks(currentPage); // Refresh after status change
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Failed to update task status.");
    }
  };

  // Apply background color based on priority
  const getRowStyle = (priority) => {
    switch (priority) {
      case 'high': return { backgroundColor: '#ffe5e5' };      // red
      case 'medium': return { backgroundColor: '#fff5e6' };    // orange
      case 'low': return { backgroundColor: '#e6ffe6' };       // green
      default: return {};
    }
  };

  return (
    <>
      <NavbarUser />
      <div className='mt-[100px] px-4'>
        <h2 className="text-xl font-semibold mb-4">Your Assigned Tasks</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {tasks.length > 0 ? (
          <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', marginTop: '20px' }}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} style={getRowStyle(task.priority)}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td>
                    <select
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="in progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td>{task.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !error && <p>No tasks assigned.</p>
        )}

        {/* Pagination Controls */}
        <div style={{
          marginTop: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{ padding: '6px 12px' }}
          >
            ⬅ Prev
          </button>

          <span style={{ fontWeight: 'bold' }}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{ padding: '6px 12px' }}
          >
            Next ➡
          </button>
        </div>
      </div>
    </>
  );
};

export default UserTasks;
