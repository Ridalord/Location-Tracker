// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react"; // Import React
import LoginPage from "./components/login";
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from "./components/dashboard";


const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userObject, setUserObject] = useState(() => {
    // Retrieve userObject from local storage if available
    const storedUserObject = localStorage.getItem('userObject');
    return storedUserObject ? JSON.parse(storedUserObject) : {
      "firstName": "Ridwan",
      "lastName": "Alabi",
      "email": "ridhwan.alabi@gmail.com",
      "password": "$argon2id$v=19$m=65536,t=3,p=4$w5LyFs2SsUnmEcXH4daINQ$yp2l8sbrXXQeUHTyimYHtMnsdkDp+r9eJfTGWFGYkCw",
      "country": "Nigeria",
      "role": "admin",
      "verified": true,
      "isSuspended": false,
      "createdAt": "2023-12-05T09:01:15.674Z",
      "updatedAt": "2023-12-05T09:01:15.674Z",
      "id": "656ee6dba96ce29473a7e34a"
    };
  });

  // Save userObject to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('userObject', JSON.stringify(userObject));
  }, [userObject]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          exact
          element={<LoginPage loggedIn={loggedIn} token={token} setToken={setToken} setLoggedIn={setLoggedIn} />}
        />
        <Route
          path="/dashboard/*"
          element={
            loggedIn ? (
              <Dashboard loggedIn={loggedIn} userObject={userObject} token={token} setLoggedIn={setLoggedIn} setUserObject={setUserObject} />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
