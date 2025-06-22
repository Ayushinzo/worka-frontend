import React from 'react'

function StatsCard({ statsCard }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {statsCard.map((stat, index) => (
        <div 
          key={index} 
          className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md 
          hover:shadow-xl transition-all duration-300 transform hover:scale-105 
          border border-gray-100 relative overflow-hidden"
        >
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-gray-600 text-lg font-medium mb-2">{stat.name}</p>
              <h3 className="text-4xl font-bold text-gray-800 tracking-tight">{stat.value}</h3>
            </div>
            <div className="text-blue-500 bg-blue-50 p-3 rounded-lg">
              <stat.icon className="h-12 w-12 transform transition-transform hover:rotate-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsCard
