import React, { useEffect, useState } from 'react'
import { Autocomplete, TextField, Checkbox, Button } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import EmojiPicker from 'emoji-picker-react';
import { useAuth } from '../Context/ContextProvider';
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import DialogBox from '../components/DialogBox'

function CreateProject() {
  let { membersList } = useAuth()
  const [inputValue, setInputValue] = React.useState('');
  const [selectedMembers, setSelectedMembers] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
  const [emoji, setEmoji] = useState("🙂")
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false)
  const [dialogBoxMessage, setDialogBoxMessage] = useState("");
  const { user } = useAuth0()

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    setOptions((membersList || []).map(user => ({ email: user.email, id: user._id })))
  }, [membersList])

  window.addEventListener('click', (e) => {
    if (e.target.id !== "emoji" && e.target.className !== "p-3 rounded-full bg-blue-200 text-4xl") {
      setOpenEmojiPicker(false);
    }
  })

  async function projectSubmit(e) {
    e.preventDefault()
    try {
      setLoading(true)
      let response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/project/create`, {
        ownerEmail: user.email,
        emoji,
        title,
        description,
        members: selectedMembers
      })
      if (response.data.success) {
        setLoading(false)
        setDialogBoxMessage(response.data.message)
        setOpen(true)
        setTitle("")
        setDescription("")
        setSelectedMembers([])
        setEmoji("🙂")
      }
      else {
        setLoading(false)
        setDialogBoxMessage(response.data.message)
        setOpen(true)
      }
    } catch (error) {
      setLoading(false)
      setDialogBoxMessage("Something went wrong")
      setOpen(true)
    }
  }
  return (
    <>
      <DialogBox
        open={open}
        handleClose={handleClose}
        title={"Project Creation"}
        message={dialogBoxMessage}
      />
      <div className='m-2 md:m-5 p-1 lg:p-4 shadow-md bg-gradient-to-b from-white to-blue-50 flex flex-col items-center gap-3 justify-center'>
        <form className='w-full sm:w-[400px] p-3 sm:p-5 bg-white rounded-md shadow-md flex flex-col gap-5 relative' onSubmit={projectSubmit}>
          <div className='flex items-center justify-between'>
            <h2 className='font-bold text-[25px] bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-400 drop-shadow-lg cursor-default'>Create new project</h2>
          </div>
          <label htmlFor="emoji" className='flex items-center gap-2 cursor-pointer'>
            <span onClick={() => setOpenEmojiPicker(true)} className='p-3 rounded-full bg-blue-200 text-4xl'>{emoji || "🙂"}</span>
          </label>
          <div className='absolute left-0 top-0 z-10' onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}>
            <EmojiPicker
              open={openEmojiPicker}
              onEmojiClick={(emojiObject) => {
                setEmoji(emojiObject.emoji);
                setOpenEmojiPicker(false);
              }}
            />
          </div>
          <div className='flex flex-col'>
            <TextField id="title" label="Title" variant="outlined" onChange={(e) => setTitle(e.target.value)} value={title} />
          </div>
          <div className='flex flex-col'>
            <TextField
              id="description"
              label="Description"
              multiline
              rows={5}
              variant="outlined"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>
          <div>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={options} // array of { id, email }
              value={options.filter(option => selectedMembers.includes(option.id))} // convert IDs to full objects
              onChange={(event, newValue) => {
                setSelectedMembers(newValue.map(user => user.id)); // extract only IDs
              }}
              getOptionLabel={(option) => option.email}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              filterSelectedOptions
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Add members"
                  placeholder="Search member"
                />
              )}
            />
          </div>
          <Button sx={{
            width: "100%"
          }}
            variant='contained'
            type="submit"
            startIcon={<CreateIcon />}
            loading={loading}
            disabled={loading}
          >
            Create Project
          </Button>
        </form>
      </div>
    </>
  )
}

export default CreateProject