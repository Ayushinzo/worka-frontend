import React, { useEffect, useState } from 'react';
import {
  Box,
  Chip,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import EditTask from './EditTask';
import ConfirmDialog from './ConfirmDialog'

const priorityColor = {
  high: 'error',
  medium: 'warning',
  low: 'success',
};

const statusColor = {
  todo: 'default',
  progress: 'info',
  done: 'success',
};

function TasksContainer({ setTaskComment, id, members }) {
  const [tasks, setTasks] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [editTask, setEditTask] = useState(false)
  const [clickEditTask, setClickEditTask] = useState("")
  const [openConfirm, setOpenConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const filteredTasks = tasks
    .filter((task) => (priorityFilter ? task.priority === priorityFilter : true))
    .filter((task) => (statusFilter ? task.status === statusFilter : true))
    .sort((a, b) => {
      if (!sortBy) return 0;

      if (sortBy === 'date') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }

      if (sortBy === 'assignee') {
        return a.assignee?.name?.localeCompare(b.assignee?.name);
      }

      return (a[sortBy] || '').localeCompare(b[sortBy] || '');
    });

  async function fetchTasks() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/task/getTasks?id=${id}`);
      if (res.data.success) {
        setTasks(res.data.tasks);
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    try {
      let response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/task/deleteTask?id=${id}`)
      if (response.data.success) {
        setOpenConfirm(false)
      }
      else {
        setOpenConfirm(false)
      }
    } catch (error) {
      setOpenConfirm(false)
    }
  }

  function handleEdit(id) {
    setEditTask(true)
    setClickEditTask(id)
  }

  useEffect(() => {
    fetchTasks();
  }, [id]);

  return (
    <>
      {
        editTask && <EditTask members={members} clickEditTask={clickEditTask} setEditTask={setEditTask} />
      }
      <ConfirmDialog
        open={openConfirm}
        title="Delete Task"
        content="Are you sure you want to delete this task? This action cannot be undone."
        onClose={() => setOpenConfirm(false)}
        onConfirm={() => handleDelete(taskToDelete)}
      />
      <div className="p-0 lg:p-4 bg-gradient-to-b from-white to-blue-50">
        <Box>
          <Typography variant="h5" gutterBottom>
            🗂️ Task Overview
          </Typography>

          {/* Filters */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Filter by Priority</InputLabel>
              <Select
                value={priorityFilter}
                label="Filter by Priority"
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Filter by Status</InputLabel>
              <Select
                value={statusFilter}
                label="Filter by Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="todo">To Do</MenuItem>
                <MenuItem value="progress">In Progress</MenuItem>
                <MenuItem value="done">Done</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="priority">Priority</MenuItem>
                <MenuItem value="status">Status</MenuItem>
                <MenuItem value="assignee">Assignee</MenuItem>
                <MenuItem value="date">Date</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TableContainer
            component={Paper}
            elevation={4}
            sx={{
              borderRadius: 2,
              maxHeight: 400,
              overflowX: 'auto',
              width: '100%',
            }}
          >
            <Box sx={{ minWidth: 900 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ minWidth: 200 }}><strong>Title</strong></TableCell>
                    <TableCell sx={{ width: 90, textAlign: 'center' }}><strong>Priority</strong></TableCell>
                    <TableCell sx={{ width: 100, textAlign: 'center' }}><strong>Status</strong></TableCell>
                    <TableCell sx={{ minWidth: 120, maxWidth: 200 }}><strong>Assignee</strong></TableCell>
                    <TableCell sx={{ width: 120, textAlign: 'center' }}><strong>Date</strong></TableCell>
                    <TableCell sx={{ width: 110, textAlign: 'center', whiteSpace: 'nowrap' }}><strong>Action</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((task, index) => (
                      <TableRow
                        key={task._id || index}
                        hover
                        sx={{
                          '&:hover': { backgroundColor: '#f9f9f9' },
                          transition: 'background-color 0.2s ease',
                        }}
                      >
                        <TableCell>{task.title}</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={task.priority}
                            color={priorityColor[task.priority]}
                            variant="outlined"
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={task.status}
                            color={statusColor[task.status]}
                            variant="filled"
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {task.assignee?.name || 'Unassigned'}
                        </TableCell>
                        <TableCell align="center">
                          {new Date(task.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton onClick={() => handleEdit(task._id)}>
                            <EditIcon sx={{ color: 'blue', fontSize: 17 }} />
                          </IconButton>
                          <IconButton onClick={() => {
                            setTaskToDelete(task._id);
                            setOpenConfirm(true);
                          }}>
                            <DeleteIcon sx={{ color: 'red', fontSize: 17 }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 5, color: 'gray' }}>
                        No tasks match the current filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </TableContainer>
        </Box>
      </div>
    </>
  );
}

export default TasksContainer;
