import { useState, useEffect } from 'react';
import classes from "./index.module.css"
import { PropagateLoader } from "react-spinners";
import PropTypes from "prop-types"
import { useNavigate } from 'react-router-dom';
import LoginImage from "./mobile.webp"
import {toast} from 'react-toastify';


const LoginForm = ({ onSignupClick, token, setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [invalidCredentials, setInvalidCredentials] = useState(false);


  useEffect(() => {
    if (localStorage.getItem('rememberMe')==='true') {
      console.log('yes')
      setEmail(localStorage.getItem('rememberedEmail'))
      setPassword(localStorage.getItem('rememberedPassword'))
      setRememberMe(localStorage.getItem('rememberMe'))
    }
    else {
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberedPassword');
      localStorage.removeItem('rememberMe');
    }
    
  }, [token]);
  const navigate = useNavigate();


  const handleLogin = () => {
    
    let isValid = true;

    // Validate email
    if (!email) {
      console.log("no email")
      setEmailError('Email is required');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);
    const userIndex = users.findIndex(user => user.email === email);
    localStorage.setItem("userIndex", userIndex)
    localStorage.setItem("userObject", JSON.stringify(user))
    if (!user) {
      setInvalidCredentials(true);
      return;
    }

    if (isValid) {
      localStorage.setItem('rememberMe', rememberMe);
      setLoggedIn(true);
      localStorage.setItem('rememberedEmail', email)
      localStorage.setItem('rememberedPassword', password)
      localStorage.setItem('rememberMe', rememberMe)
      toast.success("Login Successful")
      navigate('/dashboard');
      setLoading(!loading);
    }

  }
  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <h1>Location Tracker</h1>
      </div>
      <form className={classes.formWrap}>
        <div>
          <input
            required
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={classes.input}
          />
          {emailError && <p className={classes.error}>{emailError}</p>}
        </div>
        <div>
          <input
            required
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={classes.input}
          />
          {passwordError && <p className={classes.error}>{passwordError}</p>}
          {invalidCredentials && <p className={classes.error}>Invalid email or password. Please try again.</p>}
        </div>
        <div className={classes.rememberMe}>
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(prevState => !prevState)}
          />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>
        <div>
          <button type="button" onClick={handleLogin} className={classes.button}>
            Login
          </button>
        </div>
        
        <div className={classes.formButtom}>
          <div>
            <a href="#forgot">Forgot Password?</a>
          </div>
          <p>
            Don&apos;t have an account?
            <span onClick={onSignupClick} style={{ cursor: 'pointer', color: '#007bff' }}>
              Sign Up
            </span>
          </p>
        </div>
      </form>
      {loading && <div className={classes.loader}>
        <PropagateLoader color="#636363" />
      </div>}
    </div>
  );
};

LoginForm.propTypes = {
  onSignupClick: PropTypes.func,
  token: PropTypes.string,
  setToken: PropTypes.func,
  loggedIn: PropTypes.bool,
  setLoggedIn: PropTypes.func,
}

const SignupForm = ({ onLoginClick, setLoggedIn }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [emailExists, setEmailExists] = useState(false);

  const navigate = useNavigate();

  const handleSignup = () => {
    let isValid = true;
    

    // Validate first name
    if (!firstName) {
      setFirstNameError('First name is required');
      isValid = false;
    } else {
      setFirstNameError('');
    }

    // Validate last name
    if (!lastName) {
      setLastNameError('Last name is required');
      isValid = false;
    } else {
      setLastNameError('');
    }

    // Validate email
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    // Validate country
    if (!country) {
      setCountryError('Country is required');
      isValid = false;
    } else {
      setCountryError('');
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === email);
    if (userExists) {
      setEmailExists(true);
      return;
    }

    const newUser = { firstName, lastName, email, password, country };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('userObject', JSON.stringify(newUser))

    if (isValid) {
      setLoading(!loading);
      toast.success("Signup Successful");
      setFirstName('');
      setLastname('');
      setEmail('');
      setPassword('');
      setCountry('');
      setLoggedIn(true);
      navigate("/dashboard");
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <h1>Location Tracker</h1>
      </div>
      <form className={classes.formWrap}>
        <div>
          <input
            required
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First Name'
            className={classes.input}
          />
          {firstNameError && <p className={classes.error}>{firstNameError}</p>}
        </div>
        <div>
          <input
            required
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastname(e.target.value)}
            placeholder='Last Name'
            className={classes.input}
          />
          {lastNameError && <p className={classes.error}>{lastNameError}</p>}
        </div>
        <div>
          <input
            required
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder='Country'
            className={classes.input}
          />
          {countryError && <p className={classes.error}>{countryError}</p>}
        </div>
        <div>
          <input
            required
            type="email"
            id="newEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            className={classes.input}
          />
          {emailError && <p className={classes.error}>{emailError}</p>}
        </div>
        <div>
          <input
            required
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            className={classes.input}
          />
          {passwordError && <p className={classes.error}>{passwordError}</p>}
          {emailExists && <p className={classes.error}>Email already exists. Please use a different email.</p>}
        </div>
        <div>
          <button type="button" onClick={handleSignup} className={classes.button}>
            Sign Up
          </button>
        </div>
        <div className={classes.formButtom}>
          <p>
            Already have an account?{' '}
            <span onClick={onLoginClick} style={{ cursor: 'pointer', color: '#007bff' }}>
              Login
            </span>
          </p>
        </div>
      </form>
      {loading && <div className={classes.loader}>
        <PropagateLoader color="#636363" />
      </div>}
    </div>
  );
};

SignupForm.propTypes = {
  onLoginClick: PropTypes.func,
  setLoggedIn: PropTypes.func,
}

const LoginContainer = ({setLoggedIn, setToken, token, loggedIn}) => {
  const [showLogin, setShowLogin] = useState(true);
  const handleSignupClick = () => {
    setShowLogin(false);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };
  useEffect(() => {
    // If user is logged in, redirect to the dashboard
    if (loggedIn) {
      // navigate('/dashboard');
    }
  }, [loggedIn]);

  return (
    <div className={classes.backgroundWrap}>
      <div className={classes.mainWrap}>
        <div className={classes.wrap}>
          {showLogin ? (
            <LoginForm loggedIn={loggedIn} setToken={setToken} token={token} setLoggedIn={setLoggedIn} onSignupClick={handleSignupClick} />
          ) : (
            <SignupForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} setToken={setToken} token={token} onLoginClick={handleLoginClick} />
          )}
        </div>
        <div className={classes.loginImage}>
          <img src={LoginImage} alt="Login Image" />
        </div>
      </div>
    </div>
  );
};
LoginContainer.propTypes = {
  setLoggedIn: PropTypes.func,
  setToken: PropTypes.func,
  token: PropTypes.bool,
  loggedIn: PropTypes.bool 
}

export default LoginContainer;
