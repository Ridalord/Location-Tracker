// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react"; // Import React
import LoginPage from "./components/login";
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from "./components/dashboard";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const App = () => {
  const [loggedIn, setLoggedIn] = useState(()=>JSON.parse(localStorage.getItem('loggedIn'))||false);
  const [token, setToken] = useState(null);

  const [userObject, setUserObject] = useState(() => {
    const storedUserObject = localStorage.getItem("userObject");
    const parsedUserObject = JSON.parse(storedUserObject);
    return parsedUserObject || {
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

  useEffect(() => {
    localStorage.setItem('loggedIn', JSON.stringify(loggedIn))
    // Check if the user is logged in
    if (loggedIn) {
      const storedUserObject = localStorage.getItem("userObject");
      const parsedUserObject = JSON.parse(storedUserObject);
      setUserObject(parsedUserObject);
    }
  }, [loggedIn]);
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
      <toastContainer/>
    </div>
  );
};

export default App;
