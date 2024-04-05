import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CabList = () => {
  // Function to check if user data exists in local storage
  const navigate = useNavigate();
  const isUserDataExists = () => {
    const userData = localStorage.getItem("userData");
    return userData !== null;
  };

  // Function to render the "Book Now" button or a message based on user data existence
  const renderBookButton = (car) => {
    if (isUserDataExists()) {
      return (
        <Link
          to={`/checkout/${car.id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded-md inline-block"
        >
          Book Now
        </Link>
      );
    } else {
      return (
        <p className="text-gray-500 cursor-pointer" onClick={navigate("/user-details")}>
          Please provide your details to book
        </p>
      );
    }
  };

  const cars = [
    {
      id: 1,
      name: "Toyota Camry",
      image: "./images/toyota-camry.jpg",
      description: "Comfortable sedan with ample legroom.",
    },
    {
      id: 2,
      name: "Honda Civic",
      image: "./images/honda-civic.jpg",
      description: "Sporty sedan with great fuel efficiency.",
    },
    {
      id: 3,
      name: "Ford Mustang",
      image: "./images/ford-mustang.jpg",
      description: "Iconic American muscle car.",
    },
    {
      id: 4,
      name: "Tesla Model S",
      image: "./images/tesla-model.jpg",
      description: "Electric luxury sedan with cutting-edge technology.",
    },
    {
      id: 5,
      name: "Rickshaw",
      image: "./images/rickshaw.jpg",
      description: "Fast and Cheap Rickshaw.",
    },
    {
      id: 6,
      name: "Bus",
      image: "./images/bus.jpg",
      description: "Great for environment",
    },
    {
      id: 7,
      name: "Local Train",
      image: "./images/local-train.jpg",
      description: "Fast and Easy way of Transportation.",
    },
    {
      id: 8,
      name: "Metro",
      image: "./images/metro.jpg",
      description: "Full on AC and Beat the traffic.",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center">
      {cars.map((car) => (
        <div
          key={car.id}
          className="m-4 bg-white rounded-md shadow-md overflow-hidden w-64"
        >
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">{car.name}</h2>
            <p className="text-sm mb-4">{car.description}</p>
            {/* Render "Book Now" button or message */}
            {renderBookButton(car)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CabList;
