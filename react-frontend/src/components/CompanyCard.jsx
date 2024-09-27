import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";

import "./CompanyCard.css";
const CompanyCard = ({ details }) => {
  return (
    <Card className="CompanyCard">
      <Link to={`/companies/${details.handle}`}>
        <CardBody>
          <CardTitle tag="h5">
            {details.name}
            <span className="CompanyCard-span">
              <img src={details.logoUrl} alt="logo" />
            </span>
          </CardTitle>
          <CardText>{details.description}</CardText>
        </CardBody>
      </Link>
    </Card>
  );
};

export default CompanyCard;
