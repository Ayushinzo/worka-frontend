import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom';
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react';
import { useAuth } from '../Context/ContextProvider';

function User() {
  const [openSideBar, setOpenSideBar] = useState(false)
  let { user } = useAuth0()
  let { setJoinedEmail, joinedEmail, projectList, setMembersList, setProjectList } = useAuth()

  async function addUser() {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/add`, {
        name: user.name || "Anonymous",
        email: user.email
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchProjects() {
    try {
      let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/project/getProjects?email=${joinedEmail == '' ? user.email : joinedEmail}`);
      if (response.data.success) {
        setProjectList(response.data.projects)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function ppp() {
    try {
      let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/isJoined?email=${user.email}`)
      if (response.data.success) {
        setJoinedEmail(response.data.email)
        let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/getMembers`, {
          email: response.data.email,
          isJoined: true
        })
        setMembersList(res.data.members)
      } else {
        setJoinedEmail('')
        let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/getMembers`, {
          email: user.email,
          isJoined: false
        })
        setMembersList(res.data.members.members)
      }
    } catch (error) {
      console.log(error)
      setJoinedEmail('')
    }
  }

  useEffect(() => {
    addUser()
    ppp()
  }, [])

  useEffect(()=>{
    fetchProjects()
  }, [joinedEmail])
  return (
    <div className='flex'>
      <Sidebar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
      <div className='w-full'>
        <Navbar setOpenSideBar={setOpenSideBar} />
        <div className='w-full overflow-y-scroll h-[88vh]'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default User;

