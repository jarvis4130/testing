// CabDetails.js
import React from "react";
import { useParams } from "react-router-dom";

const CabDetails = () => {
  const { id } = useParams();

  // Fetch car details based on id from API or use mock data

  return (
    <div>
      <h1>Cab Details Page</h1>
      <p>You selected car with ID: {id}</p>
      {/* Display car details here */}
    </div>
  );
};

export default CabDetails;
