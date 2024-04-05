// AddCabForm.js
import React, { useState } from "react";

const AddCabForm = ({ addCab }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    const newCab = {
      id: Date.now(),
      name: name,
    };
    addCab(newCab);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Enter Cab Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded-md p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
      >
        Add Cab
      </button>
    </form>
  );
};

export default AddCabForm;
