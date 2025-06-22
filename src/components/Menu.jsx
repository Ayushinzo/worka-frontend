import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

let menu = [
  {
    name: "Dashboard",
    icon: DashboardIcon,
    slug: "/user/dashboard"
  },
  {
    name: "Kanban",
    icon: ViewKanbanIcon,
    slug: "/user/kanban-board"
  },
  {
    name: "Members",
    icon: PeopleAltIcon,
    slug: "/user/members"
  },
  // {
  //   name: "Setting",
  //   icon: SettingsIcon,
  //   slug: "/user/setting"
  // }
]

function Menu() {
  let { pathname } = useLocation()
  return (
    <div className='mt-3'>
      {
        menu.map(({ slug, icon: Icon, name }, index) => (
          <Link
            to={`${slug}`}
            key={index}
            className={`mt-1 group flex items-center gap-4 py-3 px-5 rounded-xl transition-all duration-200 hover:bg-slate-100 ${pathname == slug && 'bg-slate-100'}`}
            aria-label={`Navigate to ${name}`}
          >
            <Icon className={`text-slate-500 group-hover:text-slate-700 transition-colors duration-200 text-lg ${pathname == slug && 'text-slate-700 '}`} />
            <span className={`text-slate-700 group-hover:text-slate-900 font-semibold tracking-tigh ${pathname == slug && 'text-slate-900'}`}>
              {name}
            </span>
          </Link>
        ))
      }
    </div>
  )
}

export default Menu
