import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-lg text-gray-600 mb-6">Oops! The page you are looking for doesn't exist.</p>

            <button
                onClick={() => navigate(-1)} // Go back to previous page
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition duration-200"
            >
                🔙 Go Back
            </button>
        </div>
    );
}
