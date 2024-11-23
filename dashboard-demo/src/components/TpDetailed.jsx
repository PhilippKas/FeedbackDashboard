import React from 'react';
import { useParams, useNavigate } from "react-router-dom";

const TpDetailed = () => {
  const { name } = useParams(); // Extract the name from the URL
  
  const navigate = useNavigate();

  const handleReturnClick = () => {
    console.log("Navigating to /");
    navigate(`/`);
  };

  return (
    <div>
      <button onClick = {handleReturnClick}>
        Go Back
      </button>
      <h1>{name}</h1>
    </div>
  );
};

export default TpDetailed;