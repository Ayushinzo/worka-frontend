import React from 'react'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

function BlackScreen() {
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-500">
            <div className="flex flex-col items-center gap-3 animate-fade-in">
                <HourglassEmptyIcon className="text-white animate-spin h-10 w-10" />
                <span className="text-white text-lg sm:text-xl font-medium tracking-wide">
                    Updating status, please wait...
                </span>
            </div>
        </div>
    )
}

export default BlackScreen
