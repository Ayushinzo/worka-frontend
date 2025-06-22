import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader'

function ProtectRoute({ children }) {
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [sessionChecked, setSessionChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        // Try restoring session if possible
        await getAccessTokenSilently();
      } catch (err) {
        console.warn('Session could not be restored:', err.message);
      } finally {
        setSessionChecked(true); // whether success or fail, mark session as checked
      }
    };

    restoreSession();
  }, [getAccessTokenSilently]);

  useEffect(() => {
    if (sessionChecked && !isLoading) {
      if (isAuthenticated) {
        // navigate("/user/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, isLoading, sessionChecked, navigate]);

  if (isLoading || !sessionChecked) {
    return <Loader />;
  }

  return <>{children}</>;
}

export default ProtectRoute;