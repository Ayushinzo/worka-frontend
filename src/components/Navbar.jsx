import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

function Navbar({ setOpenSideBar }) {
  let { user, isAuthenticated, isLoading, logout } = useAuth0()
  const [userImage, setUserImage] = useState("/userImage.png")

  const [showMenu, setShowMenu] = useState(false)

  window.addEventListener('click', (e) => {
    if (e.target.closest('.w-12')) return
    if (showMenu && !e.target.closest('.absolute')) {
      setShowMenu(false)
    }
    if (e.target.closest('.w-12') && showMenu) {
      setShowMenu(false)
    }
    if (e.target.closest('.w-12') && !showMenu) {
      setShowMenu(true)
    }
    if (e.target.closest('.w-12') && isLoading) {
      setUserImage("/userImage.png")
    }
    if (e.target.closest('.w-12') && isAuthenticated) {
      setUserImage(user.picture)
    }
    if (e.target.closest('.w-12') && !isAuthenticated) {
      setUserImage("/userImage.png")
    }
  })

  return (
    <div className='w-full py-3 px-4 sm:px-7 bg-gradient-to-b from-white to-blue-50 shadow-sm relative flex items-center justify-between'>
      <div className='hidden lg:block'></div>
      <IconButton onClick={() => setOpenSideBar(true)}>
        <MenuIcon fontSize='large' className='cursor-pointer block lg:!hidden' />
      </IconButton>
      <div className='relative'>
        <div
          className='w-12 h-12 cursor-pointer'
          onClick={() => setShowMenu(!showMenu)}
        >
          <img
            src={isAuthenticated ? user.picture : userImage}
            alt="user-image"
            className='w-full h-full rounded-full'
          />
        </div>
        {showMenu && (
          <div
            className='py-3 px-5 bg-white rounded-md cursor-pointer absolute w-[120px] shadow-2xl z-40 right-0 top-[110%] flex gap-2 hover:bg-gray-100 transition-colors duration-200'
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            <LogoutIcon className="text-red-500" />
            <div className='font-semibold text-red-500'>Logout</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
