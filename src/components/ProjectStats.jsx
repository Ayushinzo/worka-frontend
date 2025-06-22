import React from 'react'

function ProjectStats({ stats, projectStats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {projectStats.map((stat, index) => (
        <div
          key={index}
          className={`bg-white rounded-xl shadow-lg p-8 transition-all duration-300 
            hover:scale-105 hover:shadow-xl border-l-4 ${stat.color === 'blue' ? 'border-blue-500' :
              stat.color === 'green' ? 'border-green-500' :
                'border-red-500'
            } transform hover:-translate-y-1`}
        >
          <div className="flex items-center justify-between space-x-4">
            <div className="flex-1">
              <p className={`${stat.color === 'blue' ? 'text-blue-600' :
                stat.color === 'green' ? 'text-green-600' :
                  'text-red-600'
                } text-sm font-semibold tracking-wide uppercase`}>
                {stat.name}
              </p>
              <h3 className="text-3xl font-bold mt-2 text-gray-800">
                {stat.value}
              </h3>
            </div>
            <div className={`p-4 rounded-lg ${stat.color === 'blue' ? 'bg-blue-100' :
              stat.color === 'green' ? 'bg-green-100' :
                'bg-red-100'
              } transform transition-all duration-300 hover:rotate-12`}>
              <stat.icon className={`h-8 w-8 ${stat.color === 'blue' ? 'text-blue-600' :
                stat.color === 'green' ? 'text-green-600' :
                  'text-red-600'
                }`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProjectStats