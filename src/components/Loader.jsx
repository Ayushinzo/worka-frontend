import React from 'react'

function Loader() {
return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="relative">
            <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-500"></div>
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-500 absolute top-2 left-2"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 absolute top-4 left-4"></div>
            <div className="animate-ping h-4 w-4 bg-blue-600 rounded-full absolute top-10 left-10"></div>
        </div>
        <div className="mt-8 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse">
            Loading...
        </div>
        <div className="mt-2 text-sm text-gray-500">
            Please wait while we prepare your content
        </div>
    </div>
)
}

export default Loader
