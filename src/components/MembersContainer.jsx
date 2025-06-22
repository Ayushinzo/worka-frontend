import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import InviteMembers from './InviteMembers';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../Context/ContextProvider';
import ConfirmDialog from './ConfirmDialog';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const UserTable = () => {
    const [filter, setFilter] = React.useState('all');
    const [users, setUsers] = React.useState([
        { name: "Ayush Shembekar", id: 1, email: 'john@example.com', joinedDate: '2025-06-01' },
        { name: "Ayush Shembekar", id: 2, email: 'jane@example.com', joinedDate: '2025-06-10' },
        { name: "Ayush Shembekar", id: 3, email: 'alex@example.com', joinedDate: '2025-05-20' },
        { name: "Ayush Shembekar", id: 1, email: 'john@example.com', joinedDate: '2025-06-01' },
        { name: "Ayush Shembekar", id: 2, email: 'jane@example.com', joinedDate: '2025-06-10' },
        { name: "Ayush Shembekar", id: 3, email: 'alex@example.com', joinedDate: '2025-05-20' },
        { name: "Ayush Shembekar", id: 1, email: 'john@example.com', joinedDate: '2025-06-01' },
        { name: "Ayush Shembekar", id: 2, email: 'jane@example.com', joinedDate: '2025-06-10' },
        { name: "Ayush Shembekar", id: 3, email: 'alex@example.com', joinedDate: '2025-05-20' },
        { name: "Ayush Shembekar", id: 1, email: 'john@example.com', joinedDate: '2025-06-01' },
        { name: "Ayush Shembekar", id: 2, email: 'jane@example.com', joinedDate: '2025-06-10' },
        { name: "Ayush Shembekar", id: 3, email: 'alex@example.com', joinedDate: '2025-05-20' },
        { name: "Ayush Shembekar", id: 1, email: 'john@example.com', joinedDate: '2025-06-01' },
        { name: "Ayush Shembekar", id: 2, email: 'jane@example.com', joinedDate: '2025-06-10' },
        { name: "Ayush Shembekar", id: 3, email: 'alex@example.com', joinedDate: '2025-05-20' },
    ]);
    const [invite, setInvite] = useState(false)
    const { membersList, joinedEmail } = useAuth();
    const [open, setOpen] = useState(false)
    let { user } = useAuth0()

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    async function LeaveWorkspace(email, workspaceEmail) {
        try {
            if (!email || !workspaceEmail) return;
            let response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/leaveWorkspace`, {
                email,
                workspaceEmail
            })
            if (response.data.success) {
                console.log(response.data)
                setOpen(false)
                window.location.reload();
            }
            else {
                console.log(response.data)
                setOpen(false)
            }
        } catch (error) {
            console.log(error)
            setOpen(false)
        }
    }

    async function RemoveUser(email, workspaceEmail) {
        try {
            if (!email || !workspaceEmail) return;
            let isConfirm = confirm("Do you really want to remove the user? It will also delete the tasks assigned to him/her")
            if (isConfirm) {
                let response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/leaveWorkspace`, {
                    email,
                    workspaceEmail
                })
                if (response.data.success) {
                    window.location.reload();
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {
                invite && <InviteMembers setInvite={setInvite} />
            }
            <ConfirmDialog
                open={open}
                title={"Leaving workspace"}
                content={"Are you sure you want to leave this workspace? You will lose access to all projects and data associated with it. And with that It will also delete all the taskes that were assigned to you."}
                onClose={() => setOpen(false)}
                confirm={"Leave"}
                onConfirm={() => LeaveWorkspace(user.email, joinedEmail)}
            />
            <Box className="mt-6">
                <Card sx={{ width: '100%' }}>
                    <CardContent>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                justifyContent: 'space-between',
                                alignItems: { xs: 'stretch', sm: 'center' },
                                gap: 2,
                                mb: 3,
                            }}
                        >
                            <div></div>
                            {
                                joinedEmail == '' ? (
                                    <Button variant="contained" sx={{ alignSelf: { xs: 'flex-end', sm: 'auto' } }} startIcon={<PersonAddIcon />} onClick={() => setInvite(true)}>Invite</Button>
                                ) : (
                                    <Button color='error' variant="contained" sx={{ alignSelf: { xs: 'flex-end', sm: 'auto' } }} startIcon={<LogoutIcon />} onClick={() => {
                                        setOpen(true)
                                    }}>Leave workspace</Button>
                                )
                            }
                        </Box>

                        {/* Responsive Table */}
                        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                            <Box sx={{ minWidth: '700px', maxHeight: "400px" }}>
                                <Table stickyHeader size="small" aria-label="user table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ width: '25%' }}>Name</TableCell>
                                            <TableCell sx={{ width: '35%' }}>Email</TableCell>
                                            <TableCell sx={{ width: '25%' }}>Joined Date</TableCell>
                                            {
                                                joinedEmail == '' && (
                                                    <TableCell sx={{ width: '15%' }} align="right">Action</TableCell>
                                                )
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {membersList.map((member, index) => (
                                            <TableRow key={member._id}>
                                                <TableCell sx={{ width: '30%' }}>{member.name}</TableCell>
                                                <TableCell sx={{ width: '35%' }}>{member.email}</TableCell>
                                                <TableCell sx={{ width: '20%' }}>{new Date(member.createdAt).toLocaleDateString()}</TableCell>
                                                {
                                                    joinedEmail == '' && (
                                                        <TableCell sx={{ width: '15%' }} align="right">
                                                            <IconButton color="error" onClick={() => RemoveUser(member.email, user.email)}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                    )
                                                }
                                            </TableRow>
                                        ))}
                                        {membersList.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={4} align="center">
                                                    No users found
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </Box>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default UserTable;