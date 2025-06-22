import React, { useState } from 'react'
import { IconButton, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import axios from "axios"
import { useAuth0 } from '@auth0/auth0-react';
import DialogBox from '../components/DialogBox'

function InviteMembers({ setInvite }) {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    let { user } = useAuth0()
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")
    async function sendInvitation(e) {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/invite`, {
                from: user.email,
                to: email,
            });
            if (response.data.success) {
                console.log(response.data);
                setMessage(response.data.message)
                setOpen(true)
                setLoading(false)
            } else {
                console.log(response.data)
                setMessage(response.data.message)
                setOpen(true)
                setLoading(false)
            }
        } catch (error) {
            console.error("Error sending invitation:", error);
            setMessage("Email could not send")
            setOpen(true)
            setLoading(false)
        }
    }
    return (
        <>
            <DialogBox
                open={open}
                message={message}
                title={"Invitation"}
                handleClose={() => setOpen(false)}
            />
            <div className='fixed bottom-0 right-0 left-0 top-0 z-40 flex items-center justify-center bg-gray-400/40 p-3'>
                <div className='w-[450px] p-4 shadow-2xl rounded-md bg-white'>
                    <div className='flex items-center justify-between'>
                        <h2 className='font-bold text-[25px] bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-400 drop-shadow-lg cursor-default'>Invite member</h2>
                        <IconButton className='hover:bg-gray-200' onClick={() => setInvite(false)}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <form action="" onSubmit={sendInvitation}>
                        <div className='flex flex-col gap-4 mt-4'>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700"
                                fullWidth
                                startIcon={<EmailIcon />}
                                disabled={loading}
                                loading={loading}
                            >
                                Send Invitation
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default InviteMembers
