import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import DescriptionIcon from '@mui/icons-material/Description';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LoopRoundedIcon from '@mui/icons-material/LoopRounded';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import StatsCard from '../components/StatsCard'
import RecentTickets from '../components/RecentTickets.jsx'
import PieChartGraph from '../components/PieChartGraph.jsx';
import { useEffect } from 'react';
import { useAuth } from '../Context/ContextProvider.jsx';
import axios from 'axios';
import { useState } from 'react';

function Dashboard() {
  let { user } = useAuth0()
  let { joinedEmail } = useAuth()
  const [statsCard, setStatsCard] = React.useState([
          {
            name: "Total Projects",
            icon: DescriptionIcon,
            value: 0
          },
          {
            name: "Open tickets",
            icon: LockOpenIcon,
            value: 0
          },
          {
            name: "Progress tickets",
            icon: LoopRoundedIcon,
            value: 0
          },
          {
            name: "Done tickets",
            icon: DoneAllRoundedIcon,
            value: 0
          }
        ])
  let [tasks, setTasks] = useState([])
  const [graphData, setGraphData] = useState()

  async function getDetails() {
    try {
      let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/dashboardDetails?email=${joinedEmail == '' ? user.email : joinedEmail}`)
      if (response.data.success) {
        let { projectCount, tasksCount, tasks, graph } = response.data.data;
        setStatsCard([
          {
            name: "Total Projects",
            icon: DescriptionIcon,
            value: projectCount
          },
          {
            name: "Open tickets",
            icon: LockOpenIcon,
            value: tasksCount.openTasksCount
          },
          {
            name: "Progress tickets",
            icon: LoopRoundedIcon,
            value: tasksCount.progressTasksCount
          },
          {
            name: "Done tickets",
            icon: DoneAllRoundedIcon,
            value: tasksCount.doneTasksCount
          }
        ])
        setTasks(tasks)
        setGraphData(graph)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDetails()
  }, [user, joinedEmail])
  return (
    <div className='m-2 md:m-5 p-1 lg:p-4 shadow-md bg-gradient-to-b from-white to-blue-50 rounded-xl'>
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3'>
        <h1 className='font-bold text-3xl md:text-4xl'>
          Hi, <span className='text-blue-500 underline underline-offset-4'>{user?.name}</span>👋
        </h1>
        {joinedEmail != '' && (
          <p className="flex items-center gap-2 px-3 py-1 rounded-lg shadow border border-blue-200 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 font-semibold transition-all duration-200 text-xs sm:text-sm md:text-base">
            <span className="text-gray-500">Joined to:</span>
            <span className="text-blue-700 font-bold underline underline-offset-2 tracking-wide break-all">{joinedEmail}</span>
          </p>
        )}
      </div>
      <p className='mt-3 text-xs md:text-sm font-semibold text-gray-600'>
        Welcome to your dashboard. Here you can view your project stats, recent tickets, and progress overview.
      </p>
      <StatsCard statsCard={statsCard} />
      <div className='flex flex-col md:flex-row gap-3'>
        <RecentTickets tasks={tasks} />
        <PieChartGraph graphData={graphData} />
      </div>
    </div>
  )
}

export default Dashboard
