import './App.css'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom'
import React from 'react';

function App() {
  let { loginWithRedirect, isLoading, isAuthenticated } = useAuth0()
  let navigate = useNavigate()

  // React.useEffect(() => {
  //   if (isLoading) return;
  //   if (!isLoading) {
  //     if (isAuthenticated) {
  //       navigate('/dashboard')
  //     }
  //   }
  // }, [isAuthenticated, isLoading, navigate])

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Worka</h1>
          <div className="space-x-4">
            <Stack spacing={2} direction="row">
              <Button variant="text" color="primary" onClick={() => loginWithRedirect({
                authorizationParams: {
                  scope: 'openid profile email offline_access'
                }
              })}>Login</Button>
              <Button variant="contained" color="primary" onClick={() => loginWithRedirect({
                authorizationParams: {
                  scope: 'openid profile email offline_access'
                }
              })}>Get Started</Button>
            </Stack>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Manage Projects with Ease</h2>
          <p className="text-xl text-gray-600 mb-8">Streamline your workflow, collaborate with your team, and deliver projects on time.</p>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained" size="large" onClick={() => loginWithRedirect({
              authorizationParams: {
                scope: 'openid profile email offline_access'
              }
            })}>Start Free Trial</Button>
            <Button variant="outlined" size="large">Learn More</Button>
          </Stack>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Task Management</h3>
            <p className="text-gray-600">Organize and track your tasks efficiently</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Team Collaboration</h3>
            <p className="text-gray-600">Work together seamlessly with your team</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Progress Tracking</h3>
            <p className="text-gray-600">Monitor project progress in real-time</p>
          </div>
        </div>

        <div className="bg-blue-50 p-12 rounded-xl mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Why Choose Worka?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-2">Easy to Use</h4>
                <p className="text-gray-600">Intuitive interface for quick adoption</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Secure</h4>
                <p className="text-gray-600">Enterprise-grade security features</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Scalable</h4>
                <p className="text-gray-600">Grows with your team and projects</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">24/7 Support</h4>
                <p className="text-gray-600">Always here to help you succeed</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-white p-8 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-600">support@projectflow.com</p>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="text-gray-600">
                <li className="mb-2">Documentation</li>
                <li className="mb-2">Blog</li>
                <li>Help Center</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="text-gray-600">
                <li className="mb-2">Privacy Policy</li>
                <li className="mb-2">Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App;