import React from 'react';
import { useParams } from "react-router-dom";

const TpDetailed = () => {
  const { name } = useParams(); // Extract the name from the URL
  
  return (
    <div>
      <h1>{name}</h1>
      {/* You can add more content related to the name here */}
    </div>
  );
};

export default TpDetailed;