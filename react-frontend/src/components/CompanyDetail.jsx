import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";
import JobCard from "./JobCard";
import "./CompanyDetail.css"
const CompanyDetail = () => {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCompany() {
      try {
        const res = await JoblyApi.getCompany(handle);
        setCompany(res);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchCompany();
  }, [handle]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!company) {
    return <p>No company found.</p>;
  }

  return (
    <div className="CompanyDetail">
      <h3>{company.name}</h3>
      <div className="CompanyDetail-div">{company.description}</div>

      {company.jobs.map((job) => (
        <JobCard jobDetail={job} key={job.id} />
      ))}
    </div>
  );
};

export default CompanyDetail;
