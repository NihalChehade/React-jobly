import React, {useState, useContext} from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import "./JobCard.css";
import UserContext from "../UserContext";

const JobCard = ({ jobDetail }) => {
  const { currentUser, apply } = useContext(UserContext);
  const [applied, setApplied] = useState(currentUser.applications.includes(jobDetail.id));

   // Handle the job application
   const handleApply = async () => {
    // Use applyToJob from context
    await apply(jobDetail.id); 
    // Update the UI once applied
    setApplied(true); 
  };

  return (
    <Card className="JobCard">
      <CardBody>
        <CardTitle tag="h5">{jobDetail.title}</CardTitle>
        <CardText>Salary: {jobDetail.salary}</CardText>
        <CardText>Equity: {jobDetail.equity}</CardText>
        
        {/* Conditionally render Apply button or Applied message */}
        {applied ? (
          <Button disabled className="btn btn-success fw-bold float-end">
            Applied
          </Button>
        ) : (
          <Button onClick={handleApply} className="btn btn-danger fw-bold float-end">
            Apply
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

export default JobCard;
