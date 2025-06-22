import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import ProjectStats from '../components/ProjectStats'
import DeleteIcon from '@mui/icons-material/Delete';
import TasksContainer from '../components/TasksContainer';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import { MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CreateTask from '../components/CreateTask'
import EditProject from '../components/EditProject';
import axios from 'axios'
import { useAuth } from '../Context/ContextProvider'
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import ConfirmDialog from '../components/ConfirmDialog';
import { useNavigate } from 'react-router-dom';

function Project() {
  let { id } = useParams()
  let navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState(false)
  const [editProject, setEditProject] = useState(false)
  const [details, setDetails] = useState({})
  const { joinedEmail } = useAuth()
  const [stats, setStats] = useState({})
  const [projectStats, setProjectStats] = React.useState([]);
  const [projectConfirm, setProjectConfirm] = useState(false)

  window.addEventListener('click', (e) => {
    if (e.target.closest('.MuiIconButton-root') === null) {
      setOpen(false);
    }
  })

  async function fetchData() {
    try {
      let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/project/projectDatails?id=${id}`)
      if (response.data.success) {
        setDetails(response.data.details)
      }
    } catch (error) {

    }
  }

  async function getProjectStats() {
    try {
      let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/project/projectStats?id=${id}`)
      if (response.data.success) {
        setProjectStats([
          {
            name: 'Total tasks',
            value: response.data.stats.totalTasks,
            icon: DescriptionIcon,
            color: 'blue'
          },
          {
            name: 'Completed tasks',
            value: response.data.stats.completed,
            icon: DoneAllRoundedIcon,
            color: 'green'
          },
          {
            name: 'Remaining tasks',
            value: response.data.stats.remaining,
            icon: AccessTimeIcon,
            color: 'red'
          }
        ])
      }
    } catch (error) {

    }
  }

  async function deleteProject() {
    try {
      let response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/project/deleteProject?id=${id}`)
      if (response.data.success) {
        setProjectConfirm(false)
        navigate("/user/project/create-project")
      } else {
        setProjectConfirm(false)
      }
    } catch (error) {
      console.log(error)
      setProjectConfirm(false)
    }
  }

  useEffect(() => {
    fetchData()
    getProjectStats()
  }, [id])
  return (
    <>
      {
        newTask && <CreateTask id={id} members={details.members} setNewTask={setNewTask} />
      }
      {
        editProject && <EditProject details={details} setEditProject={setEditProject} fetchData={fetchData} />
      }
      <ConfirmDialog
        open={projectConfirm}
        title={"Delete project"}
        content={"Are you sure you want to delete this project? It will also delete all the tasks associated with this project."}
        onClose={() => setProjectConfirm(false)}
        onConfirm={() => deleteProject()}
      />
      <div className='m-2 md:m-5 p-1 lg:p-4 shadow-md bg-gradient-to-b from-white to-blue-50'>
        <div className='flex items-center justify-between gap-5'>
          <h2 className='font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-400 drop-shadow-lg hover:scale-105 transition-transform duration-300 cursor-default'>{details.title}</h2>
          <div className="relative inline-block text-left">
            {
              joinedEmail == '' && (
                <IconButton
                  onClick={() => setOpen(!open)}
                >
                  <MoreVertIcon />
                </IconButton>
              )
            }
            {open && (
              <div className="absolute right-0 z-10 mt-2 w-40 rounded-md bg-white shadow-lg">
                <MenuItem onClick={() => setNewTask(true)}>
                  <AddIcon fontSize="small" className="mr-2" />
                  New Task
                </MenuItem>
                <MenuItem onClick={() => setEditProject(true)}>
                  <EditIcon fontSize="small" className="mr-2" />
                  Edit
                </MenuItem>
                <MenuItem onClick={() => {
                  setProjectConfirm(true)
                }}>
                  <DeleteIcon fontSize="small" color="error" className="mr-2" />
                  <span style={{ color: '#f44336' }}>Delete</span>
                </MenuItem>
              </div>
            )}
          </div>
        </div>
        <p
          className="text-blue-700 font-medium italic my-4"
          style={{
            background: 'linear-gradient(90deg, #e0e7ff 0%, #f0f7ff 100%)',
            borderRadius: '8px',
            padding: '12px 18px',
            boxShadow: '0 2px 8px rgba(30, 64, 175, 0.08)',
            fontSize: '1.1rem',
            borderLeft: '4px solid #2563eb'
          }}
        >
          {details.description}
        </p>
        <ProjectStats projectStats={projectStats} stats={stats} />
        <TasksContainer id={id} members={details.members} />
      </div>
    </>
  )
}

export default Project
