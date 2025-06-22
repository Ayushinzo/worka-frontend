import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { useAuth } from '../Context/ContextProvider';
import DialogBox from './DialogBox';
import axios from 'axios';

function CreateTask({ setNewTask, id, members }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [assignee, setAssignee] = useState("")
  const [loader, setLoader] = useState(false)
  const [message, setMessage] = useState("")
  const [open, setOpen] = useState(false)

  async function CreateTask(e) {
    e.preventDefault()
    try {
      setLoader(true)
      let response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/task/create`, {
        id,
        title,
        description,
        priority,
        assignee
      })
      if (response.data.success) {
        setLoader(false)
        setMessage(response.data.message)
        setOpen(true)
        setTitle("")
        setDescription("")
        setPriority("") 
        setAssignee("")
      }
      else {
        setLoader(false)
        setMessage(response.data.message)
        setOpen(true)
      }
    } catch (error) {
      setLoader(false)
      setMessage("Could not create task")
      setOpen(true)
    }
  }

  const onClose = () => setOpen(false)

  return (
    <>
      <DialogBox
        open={open}
        title={"Task creation"}
        message={message}
        handleClose={onClose}
      />
      <div className='fixed bottom-0 right-0 left-0 top-0 z-40 flex items-center justify-center bg-gray-400/40 p-3'>
        <div className='w-[450px] p-4 shadow-2xl rounded-md bg-white'>
          <div className='flex items-center justify-between'>
            <h2 className='font-bold text-[25px] bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-400 drop-shadow-lg cursor-default'>Create task</h2>
            <IconButton onClick={() => setNewTask(false)} className='hover:bg-gray-200'>
              <CloseIcon />
            </IconButton>
          </div>
          <form action="" onSubmit={CreateTask}>
            <div className='flex flex-col gap-4 mt-4'>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <FormControl fullWidth required>
                <InputLabel>Priority</InputLabel>
                <Select label="Priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth required>
                <InputLabel id="assignee-label">Assignee</InputLabel>
                <Select
                  labelId="assignee-label"
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  label="Assignee"
                >
                  {members.map((mem) => (
                    <MenuItem key={mem._id} value={mem._id}>
                      {mem.email}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
                fullWidth
                startIcon={<CreateIcon />}
                loading={loader}
                disabled={loader}
              >
                Create Task
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateTask
