import React from 'react'
import Menu from '../components/Menu'
import ProjectList from '../components/ProjectList'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

function Sidebar({ setOpenSideBar, openSideBar }) {
  return (
    <div className={`w-[300px] lg:w-[330px] h-screen p-4 bg-gradient-to-b from-white to-blue-50 shadow-sm fixed z-40 lg:relative translate-x-[-300px] lg:translate-x-0 duration-300 ease-in-out ${openSideBar && '!translate-x-0'} overflow-y-auto`}>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <img src="/logo.png" alt="website-logo" className='w-12 h-12 rounded-full object-cover' />
          <h1 className='text-blue-600 font-bold text-2xl'>Worka</h1>
        </div>
        <IconButton onClick={() => setOpenSideBar(false)}>
          <CloseIcon className='cursor-pointer text-gray-500 rounded-full  transition-all block lg:!hidden' fontSize='medium' />
        </IconButton>
      </div>
      <hr className='mt-2 opacity-5' />
      <div className='mt-2'>
        <p className='text-gray-500 text-sm font-medium mb-2'>Workspace</p>
        <div className='flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer'>
          <img src="/p.jpg" alt="workspace" className='w-10 h-10 rounded-lg object-cover' />
          <div>
            <p className='text-gray-700 font-medium'>Project management</p>
            <span className='text-xs text-gray-400'>Free</span>
          </div>
        </div>
      </div>
      <hr className='mt-3 opacity-5' />
      <Menu />
      <hr className='mt-3 opacity-5' />
      <ProjectList />
    </div>
  )
}

export default Sidebar
