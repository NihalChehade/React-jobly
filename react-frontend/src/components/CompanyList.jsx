import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "../api";
import CompanyCard from "./CompanyCard";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";
import { Button, Form, FormGroup, Input, Spinner } from "reactstrap";
import "./CompanyList.css";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(UserContext);

  // Fetch all companies on component mount
  useEffect(() => {
    async function fetchCompanies() {
      try {
        const result = await JoblyApi.getCompanies();
        setCompanies(result);
      } catch (err) {
        setError("Error fetching companies.");
      } finally {
        setLoading(false);
      }
    }
    fetchCompanies();
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
      // If searchTerm is empty, fetch all companies
      if (searchTerm === "") {
        const result = await JoblyApi.getCompanies(); // Fetch all jobs
        setCompanies(result);
      } else {
        const result = await JoblyApi.getCompanies({ name: searchTerm });
        setCompanies(result);
      }
    } catch (err) {
      setError("Error fetching search results.");
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Display loading state
  if (loading) {
    return <Spinner style={{ width: "3rem", height: "3rem" }} />;
  }

  // Display error message
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="CompanyList">
      <div className="CompanyList-srchBar">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              className="CompanyList-input"
              type="text"
              name="searchTerm"
              value={searchTerm}
              onChange={handleChange}
              placeholder="Search companies..."
            />
            <Button type="submit" color="primary">
              Search
            </Button>
          </FormGroup>
        </Form>
      </div>

      {companies.length > 0 ? (
        companies.map((c) => <CompanyCard key={c.handle} details={c} />)
      ) : (
        <p>No companies found.</p>
      )}
    </div>
  );
};

export default CompanyList;
