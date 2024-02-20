// eslint-disable-next-line no-unused-vars
import React, { useState } from "react"; // Import React
import LoginPage from "./components/login";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  // const [userObject, setUserObject] = useState(null);
  return (
    <div className="App">
      <LoginPage loggedIn={loggedIn} token={token} setToken={setToken} setLoggedIn={setLoggedIn} />
    </div>
  );
};

export default App;
