import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, color }) => {
  const starComponents = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 0.5; // Adjust the star value
    return (
      <span key={index}>
        {value > starValue ? (
          <FaStar color={color} />
        ) : value >= starValue - 0.5 ? (
          <FaStarHalfAlt color={color} />
        ) : (
          <FaRegStar color={color} />
        )}
      </span>
    );
  });

  return <div className="flex flex-row">{starComponents}</div>;
};

Rating.defaultProps = {
  color: "#fcc419",
};

export default Rating;
