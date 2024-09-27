import React, { useState, useContext } from "react";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import UserContext from "../UserContext"; 
import JoblyApi from "../api";
import {  Navigate } from "react-router-dom";
import "./Profile.css"
const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext); // Get current user and the function to update it
  if(!currentUser){
    return <Navigate to="/"/>;
  }
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName || "",
    lastName: currentUser.lastName || "",
    email: currentUser.email || "",
    password: "" 
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await JoblyApi.updateProfile(currentUser.username, formData);
      setCurrentUser(updatedUser); 
      setSuccess(true);
    } catch (err) {
      console.error("Error updating profile", err);
      setError("Profile update failed");
    }
  };

  return (
    <div className="Profile">
      <h1>Profile</h1>
      {success && <p className="success">Profile updated successfully!</p>}
      {error && <p className="error">{error}</p>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="text"
            id="username"
            name="username"
            value={currentUser.username}
            disabled // Username should not be editable
          />
        </FormGroup>
        <FormGroup>
          <Label for="firstName">First Name</Label>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name</Label>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required // Password is required for updates
          />
        </FormGroup>
        <Button type="submit" color="primary" block>Save Changes</Button>
      </Form>
    </div>
  );
};

export default Profile;
