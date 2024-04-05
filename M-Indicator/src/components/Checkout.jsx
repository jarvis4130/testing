import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock car details
  const cars = [
    {
      id: 1,
      name: "Toyota Camry",
      image: "./images/toyota-camry.jpg",
      description: "Comfortable sedan with ample legroom.",
      price: 2500, // Adding price for demonstration
    },
    {
      id: 2,
      name: "Honda Civic",
      image: "./images/honda-civic.jpg",
      description: "Sporty sedan with great fuel efficiency.",
      price: 2200, // Adding price for demonstration
    },
    {
      id: 3,
      name: "Ford Mustang",
      image: "./images/ford-mustang.jpg",
      description: "Iconic American muscle car.",
      price: 4000,
    },
    {
      id: 4,
      name: "Tesla Model S",
      image: "./images/tesla-model.jpg",
      description: "Electric luxury sedan with cutting-edge technology.",
      price: 8000,
    },
    {
      id: 5,
      name: "Rickshaw",
      image: "./images/rickshaw.jpg",
      description: "Fast and Cheap Rickshaw.",
      price: 500,
    },
    {
      id: 6,
      name: "Bus",
      image: "./images/bus.jpg",
      description: "Great for environment",
      price: 25,
    },
    {
      id: 7,
      name: "Local Train",
      image: "./images/local-train.jpg",
      description: "Fast and Easy way of Transportation.",
      price: 20,
    },
    {
      id: 8,
      name: "Metro",
      image: "./images/metro.jpg",
      description: "Full on AC and Beat the traffic.",
      price: 50,
    },
  ];

  const handlePayment = () => {
    alert("booking done! We will call you shortly for Payment.");
  };

  // Find the car details based on id
  const carDetails = cars.find((car) => car.id === parseInt(id));

  if (!carDetails) {
    return <div>Car not found</div>; // Handle case where car is not found
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
      <div className="bg-white rounded-md shadow-md p-4">
        <div className="m-4 bg-white rounded-md shadow-md overflow-hidden w-64">
          <img
            src={`./../../public/${carDetails.image}`}
            alt={carDetails.name}
            className="w-full h-40 object-cover"
          />
        </div>
        <h2 className="text-lg font-semibold mb-2">{carDetails.name}</h2>
        <p className="text-sm mb-2">{carDetails.description}</p>
        <p className="text-sm mb-2">Price: ${carDetails.price}</p>
        <p className="text-sm mb-2">ID: {carDetails.id}</p>
        {/* Add checkout form and process here */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md inline-block mt-4"
          onClick={handlePayment}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Checkout;
