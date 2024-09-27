import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "../api";
import JobCard from "./JobCard";
import {  Navigate } from "react-router-dom";
import  UserContext from "../UserContext";
import { Button, Form, FormGroup, Input, Spinner } from "reactstrap";
import "./JobList.css"

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(UserContext);
  
  // Fetch all Jobs on component mount
  useEffect(() => {
    async function fetchJobs() {
    
      try {
        const result = await JoblyApi.getJobs();
        setJobs(result);
      } catch (err) {
        setError("Error fetching Jobs.");
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  // Handle search input change
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  
  // Handle form submission
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);

    try {
      // If searchTerm is empty, fetch all jobs
      if (searchTerm === '') {
        const result = await JoblyApi.getJobs(); // Fetch all jobs
        setJobs(result);
      } else {
        const result = await JoblyApi.getJobs({ title: searchTerm }); // Fetch jobs with search term
        setJobs(result);
      }
    } catch (err) {
      setError("Error fetching search results.");
    } finally {
      setLoading(false);
    }
  };

  if(!currentUser){
    return <Navigate to="/login" />;
  }

  // Display loading state
  if (loading) {
    return <Spinner style={{ width: '3rem', height: '3rem' }} />;
  }

  // Display error message
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="JobList">
      <div className="JobList-srchBar">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input 
              className="JobList-input"
              type="text" 
              name="searchTerm" 
              value={searchTerm}
              onChange={handleChange}
              placeholder="Search Jobs..."
            />
            <Button type="submit" color="primary">Search</Button>
          </FormGroup>
        </Form>
      </div>

      {jobs.length > 0 ? (
        jobs.map(c => (
          <JobCard key={c.id} jobDetail={c} />
        ))
      ) : (
        <p>No Jobs found.</p>
      )}
    </div>
  );
};

export default JobList