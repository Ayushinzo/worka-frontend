import React, { useEffect, useState } from 'react'
import { IconButton, TextField, FormControl, InputLabel, Select, MenuItem, Autocomplete, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios'
import DialogBox from './DialogBox';

function EditTask({ setEditTask, clickEditTask, members }) {
  const [options, setOptions] = useState(["Ayush", "Sanket", "Piyush", "kunal"])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("")
  const [assignee, setAssignee] = useState("")
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")

  const onClose = () => setOpen(false)

  async function fetchTask() {
    try {
      let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/task/singleTask?id=${clickEditTask}`)
      if (response.data.success) {
        const { _id, assignee, title, description, priority, status } = response.data.task;
        setMessage(response.data.message)
        setTitle(title)
        setDescription(description)
        setAssignee(assignee)
        setPriority(priority)
        setStatus(status)
      } else {
        console.log(response.data)
      }
    } catch (error) {
      setMessage("Could not save changes")
    }
  }

  async function saveTaskChanges(e) {
    e.preventDefault()
    try {
      setLoading(true)
      let response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/task/saveChanges`, {
        id: clickEditTask,
        title,
        description,
        priority,
        status,
        assignee
      })

      if (response.data.success) {
        setMessage(response.data.message)
        setLoading(false)
        setOpen(true)
      }
      else {
        setMessage(response.data.message)
        setLoading(false)
        setOpen(true)
      }
    } catch (error) {
      setMessage("Could not save changes")
      setLoading(false)
      setOpen(true)
    }
  }
  useEffect(() => {
    fetchTask()
  }, [])
  return (
    <>
      <DialogBox
        open={open}
        title={"Task Updation"}
        message={message}
        handleClose={onClose}
      />
      <div className='fixed bottom-0 right-0 left-0 top-0 z-40 flex items-center justify-center bg-gray-400/40 p-3'>
        <div className='w-[450px] p-4 shadow-2xl rounded-md bg-white'>
          <div className='flex items-center justify-between'>
            <h2 className='font-bold text-[25px] bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-400 drop-shadow-lg cursor-default'>Edit Task</h2>
            <IconButton className='hover:bg-gray-200' onClick={() => setEditTask(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <form action="" onSubmit={saveTaskChanges}>
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
                <InputLabel>Assignee</InputLabel>
                <Select label="Priority" value={assignee} onChange={(e) => setAssignee(e.target.value)}>
                  {
                    members.map((member) => (
                      <MenuItem value={member._id}>{member.email}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
              {/* <Autocomplete
                options={options}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Assignee"
                    required
                    inputProps={{
                      ...params.inputProps,
                      readOnly: true,
                    }}
                  />
                )}
              /> */}
              <Button
                variant="contained"
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
                fullWidth
                startIcon={<SaveIcon />}
                loading={loading}
                disabled={loading}
              >
                Save changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditTask
