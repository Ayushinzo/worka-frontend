import React from 'react'
import Button from '@mui/material/Button';
import MembersContainer from '../components/MembersContainer'

function Members() {
  return (
    <div className='m-2 md:m-5 p-1 lg:p-4 shadow-md bg-gradient-to-b from-white to-blue-50'>
      <div className='flex items-center justify-between'>
        <h2 className='font-bold text-[25px] bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-400 drop-shadow-lg cursor-default'>Workspace members</h2>
      </div>
      <MembersContainer />
    </div>
  )
}

export default Members
