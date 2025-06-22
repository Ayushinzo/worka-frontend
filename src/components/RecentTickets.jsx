import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';

function RecentTickets({ tasks }) {
  return (
    <div className='mt-4 md:mt-8 bg-white p-2 md:p-4 rounded-xl shadow-md w-full md:w-2/3'>
      <div className="!p-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg mb-2 transition-all duration-300">
        <div className="flex justify-between items-center">
          <h2 className="text-gray-800 text-md sm:text-xl md:text-2xl font-bold flex items-center gap-2 hover:text-blue-700">
            Recent Tickets
          </h2>
        </div>
      </div>
      <div className="rounded-md bg-white">
        {
          tasks.map((task, index) => (
            <div key={index} className="bg-white w-full max-w-full shadow">
              <div className="py-2 px-4 flex flex-row sm:items-center justify-between gap-15 rounded">
                <div>
                  <p className="text-gray-800 font-medium text-base sm:text-lg">{task.title}</p>
                  <span className="text-[13px] text-gray-500">{new Date(task.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex flex-wrap justify-end items-center gap-2 sm:gap-4">
                  <span className="text-sm px-2 py-1 rounded bg-blue-100 text-blue-600 font-semibold">{task.priority}</span>
                  <span className={`text-sm px-2 py-1 ${task.status == 'todo' ? 'bg-red-100 text-red-600' : task.status == 'progress' ? 'bg-yellow-100 text-yellow-600' : task.status == 'done' ? 'bg-green-100 text-green-600' : null} rounded font-semibold`}>{task.status}</span>
                </div>
              </div>
            </div>
          ))
        }

        {/* <div className="bg-white w-full max-w-full shadow">
          <div className="py-2 px-4 flex flex-row sm:items-center justify-between gap-15 rounded">
            <div>
              <p className="text-gray-800 font-medium text-base sm:text-lg">Navigation bar fixed</p>
              <span className="text-[13px] text-gray-500">12/23/2345</span>
            </div>
            <div className="flex flex-wrap justify-end items-center gap-2 sm:gap-4">
              <span className="text-sm px-2 py-1 rounded bg-red-100 text-red-600 font-semibold">High</span>
              <span className="text-sm px-2 py-1 rounded bg-blue-100 text-blue-600 font-semibold">Progress</span>
            </div>
          </div>
        </div>
        <div className="bg-white w-full max-w-full shadow">
          <div className="py-2 px-4 flex flex-row sm:items-center justify-between gap-15 rounded">
            <div>
              <p className="text-gray-800 font-medium text-base sm:text-lg">Navigation bar fixed</p>
              <span className="text-[13px] text-gray-500">12/23/2345</span>
            </div>
            <div className="flex flex-wrap justify-end items-center gap-2 sm:gap-4">
              <span className="text-sm px-2 py-1 rounded bg-red-100 text-red-600 font-semibold">High</span>
              <span className="text-sm px-2 py-1 rounded bg-blue-100 text-blue-600 font-semibold">Progress</span>
            </div>
          </div>
        </div>
        <div className="bg-white w-full max-w-full shadow">
          <div className="py-2 px-4 flex flex-row sm:items-center justify-between gap-15 rounded">
            <div>
              <p className="text-gray-800 font-medium text-base sm:text-lg">Navigation bar fixed</p>
              <span className="text-[13px] text-gray-500">12/23/2345</span>
            </div>
            <div className="flex flex-wrap justify-end items-center gap-2 sm:gap-4">
              <span className="text-sm px-2 py-1 rounded bg-red-100 text-red-600 font-semibold">High</span>
              <span className="text-sm px-2 py-1 rounded bg-blue-100 text-blue-600 font-semibold">Progress</span>
            </div>
          </div>
        </div>
        <div className="bg-white w-full max-w-full shadow">
          <div className="py-2 px-4 flex flex-row sm:items-center justify-between gap-15 rounded">
            <div>
              <p className="text-gray-800 font-medium text-base sm:text-lg">Navigation bar fixed</p>
              <span className="text-[13px] text-gray-500">12/23/2345</span>
            </div>
            <div className="flex flex-wrap justify-end items-center gap-2 sm:gap-4">
              <span className="text-sm px-2 py-1 rounded bg-red-100 text-red-600 font-semibold">High</span>
              <span className="text-sm px-2 py-1 rounded bg-blue-100 text-blue-600 font-semibold">Progress</span>
            </div>
          </div>
        </div>
        <div className="bg-white w-full max-w-full shadow">
          <div className="py-2 px-4 flex flex-row sm:items-center justify-between gap-15 rounded">
            <div>
              <p className="text-gray-800 font-medium text-base sm:text-lg">Navigation bar fixed</p>
              <span className="text-[13px] text-gray-500">12/23/2345</span>
            </div>
            <div className="flex flex-wrap justify-end items-center gap-2 sm:gap-4">
              <span className="text-sm px-2 py-1 rounded bg-red-100 text-red-600 font-semibold">High</span>
              <span className="text-sm px-2 py-1 rounded bg-blue-100 text-blue-600 font-semibold">Progress</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default RecentTickets