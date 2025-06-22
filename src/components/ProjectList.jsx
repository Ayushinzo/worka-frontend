import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/ContextProvider'

function ProjectList() {
  const [showProjects, setShowProjects] = React.useState(false);
  const { joinedEmail, projectList } = useAuth()

  let { pathname } = useLocation()
  function getProjectIdFromUrl(url) {
    const segments = url.split('/');
    return segments[segments.length - 1];
  }
  function getSectionFromPath(path) {
    const segments = path.split('/');
    return segments[2];
  }
  return (
    <li className="group">
      <div
        onClick={() => setShowProjects(!showProjects)}
        className={`flex justify-between items-center py-2 px-4 hover:bg-slate-100 transition-colors duration-200 rounded select-none cursor-pointer ${getSectionFromPath(pathname) == 'project' && 'bg-slate-200'}`}
      >
        <p className='font-semibold text-gray-800 text-[18px]'>Projects</p>
        {showProjects ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </div>

      <div className={`mt-2 overflow-hidden transition-all duration-300 ${showProjects ? 'max-h-[500px]' : 'max-h-0'}`}>
        <ul className="space-y-1">
          {
            joinedEmail == '' && (
              <Link to='/user/project/create-project' className={`flex gap-2 items-center py-2.5 px-4 hover:bg-slate-200 rounded cursor-pointer transition-colors duration-200 text-blue-600 ${getProjectIdFromUrl(pathname) == 'create-project' && 'bg-slate-200'}`}>
                <AddIcon className="text-blue-600" />
                <p className="font-medium">Create a project</p>
              </Link>
            )
          }
          {
            projectList.map((project, index) => {
              return (
                <Link
                  key={index}
                  to={`/user/project/${project._id}`}
                  className={`flex gap-1.5 items-center py-1.5 px-4 hover:bg-slate-200 rounded cursor-pointer transition-colors duration-200 ${getProjectIdFromUrl(pathname) == project._id && 'bg-slate-200'}`}
                >
                  <span className="w-[33px] h-[33px] rounded-full text-2xl">
                    {project.emoji}
                  </span>
                  <p className="text-gray-700 hover:text-gray-900 text-sm font-semibold">{project.title}</p>
                </Link>
              )
            })
          }
        </ul>
      </div>
    </li>
  )
}

export default ProjectList
