import React, { useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, TextField, Autocomplete, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useAuth } from '../Context/ContextProvider';
import { useEffect } from 'react';
import axios from 'axios';
import DialogBox from './DialogBox';

function EditProject({ setEditProject, details, fetchData }) {
    // const [options, setOptions] = useState([
    //     {
    //         id: 1,
    //         name: "Ayush"
    //     },
    //     {
    //         id: 2,
    //         name: "Kunal"
    //     },
    //     {
    //         id: 3,
    //         name: "Jhon"
    //     },
    //     {
    //         id: 4,
    //         name: "Prashant"
    //     },
    //     {
    //         id: 5,
    //         name: "Harry"
    //     },
    // ])
    let { membersList } = useAuth()
    const [title, setTitle] = useState(details.title)
    const [description, setDescription] = useState(details.description)
    const [members, setMembers] = useState(details.members)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")

    const handleClose = () => {
        setEditProject(false)
        setOpen(false)
    }

    async function SaveChanges(e) {
        e.preventDefault()
        try {
            setLoading(true)
            let response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/project/editProject`, {
                id: details._id,
                title,
                description,
                members: members.map(project => project._id)
            })
            if (response.data.success) {
                setLoading(false)
                setMessage(response.data.message)
                setOpen(true)
                fetchData()
            }
            else {
                setLoading(false)
                setMessage(response.data.message)
                setOpen(true)
            }
        } catch (error) {
            setLoading(false)
            setMessage("Could not update project")
            setOpen(true)
        }
    }
    return (
        <>
            <DialogBox
                open={open}
                title={"Project updation"}
                message={message}
                handleClose={handleClose}
            />
            <div className='fixed bottom-0 right-0 left-0 top-0 z-40 flex items-center justify-center bg-gray-400/40'>
                <div className='w-[450px] p-4 shadow-2xl rounded-md bg-white'>
                    <div className='flex items-center justify-between'>
                        <h2 className='font-bold text-[25px] bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-400 drop-shadow-lg cursor-default'>Edit Project</h2>
                        <IconButton className='hover:bg-gray-200' onClick={() => setEditProject(false)}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <form action="" onSubmit={SaveChanges}>
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
                            <Autocomplete
                                multiple
                                options={membersList}
                                getOptionLabel={(option) => option.email}
                                isOptionEqualToValue={(option, value) => option._id === value._id}
                                defaultValue={members}
                                value={members}
                                onChange={(_, newValue) => {
                                    setMembers(newValue);
                                }}
                                filterSelectedOptions
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Members"
                                    />
                                )}
                            />
                            <Button
                                type="submit"
                                variant='contained'
                                className="bg-blue-600 hover:bg-blue-700"
                                fullWidth
                                startIcon={<SaveIcon />}
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

export default EditProject
