import React, {useContext} from "react";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import "./Home.css"
const Home = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const login =()=>{
    navigate('/login');
  }
  const signup =()=>{
    navigate('/signup');
  }
  return (
    <div className="Home">
      <h1>Jobly</h1>
      <p>All the jobs in one, convenient place.</p>
     
      {currentUser ? (
        <>
          
          <h2>Welcome Back, {currentUser.firstName}!</h2>
        </>
      ) : (
        <div>
          <Button type="button" onClick={login} color="primary" size="md" className="Home-btn">Log In</Button>
          <Button type="button" onClick={signup} color="primary" size="md" className="Home-btn">Sign Up</Button>
        </div>
      )}
    </div>
  );
};

export default Home;
