import React, { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import UserContext from "./UserContext"; 
import { jwtDecode } from "jwt-decode";

import JoblyApi from "./api";
import Home from './components/Home';
import CompanyList from "./components/CompanyList";
import CompanyDetail from "./components/CompanyDetail";
import JobList from "./components/JobList";
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Profile from './components/Profile';
import Logout from './components/Logout';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [token, setToken] = useState(null); // Store token in state
  const [currentUser, setCurrentUser] = useState(null); // Store current user info in state

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        JoblyApi.token = storedToken;
        setToken(storedToken);  // If decoding is successful, set the token
      } catch (err) {
        console.error("Invalid token in localStorage, clearing...", err);
        localStorage.removeItem("token"); // If the token is invalid, clear it
      }
    }
  }, []);

  // Use effect to fetch user info whenever token changes
  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          console.log("changing current user useEffect");
          const { username } = jwtDecode(token); // Decode the token to get the username
          const user = await JoblyApi.getUser(username); // Fetch user details from backend
          console.log("current user is ", user);
          setCurrentUser(user); // Set the user in state
        } catch (err) {
          console.error("Error loading user", err);
          setCurrentUser(null);
        }
      }
    }
    getCurrentUser();
  }, [token]); // Run this effect whenever the token changes

  // Login function
  async function login(credentials) {
    try {
      const token = await JoblyApi.login(credentials); // Get token from backend
      setToken(token); // Save the token in state
      JoblyApi.token = token;
      localStorage.setItem("token", token); //store the token in localStorage
      return true;
    } catch (err) {
      console.error("Login failed ", err);
      return false;
    }
  }

  // Signup function
  async function signup(userData) {
    try {
       // Get token from backend after signup
      const token = await JoblyApi.signup(userData);
      setToken(token); 
      JoblyApi.token = token;
       // store the token in localStorage
      localStorage.setItem("token", token);
      return true;
    } catch (err) {
      console.error("Signup failed", err);
      return false;
    }
  }

  // Logout function
  function logout() {
    setToken(null); 
    setCurrentUser(null); 
    JoblyApi.token = null;
    localStorage.removeItem("token"); 
  }

  // Apply to a job function
  const apply = async (jobId) => {
    try {
      if (currentUser.applications.includes(jobId)) {
        console.log("Already applied to this job");
        return;
      }
      const res = await JoblyApi.applyToJob(currentUser.username, jobId);
      if (res.applied === jobId) {
        setCurrentUser((curr) => ({
          ...curr,
          applications: [...curr.applications, jobId] 
        }));
      }
    } catch (err) {
      console.error("Error applying to job", err);
    }
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, login, signup, logout, apply }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/companies" element={<CompanyList />} />
        <Route path="/companies/:handle" element={<CompanyDetail />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
