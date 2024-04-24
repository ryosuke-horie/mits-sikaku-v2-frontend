import React, { useState } from "react";

const SliderComponent = ({ value, setValue }) => {
  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <input
        type="range"
        name="speed"
        min="0"
        max="10"
        value={value}
        onChange={handleChange}
        className="h-2 w-full cursor-pointer rounded-full bg-gray-200"
      />
      <p>難易度: {value}</p>
    </div>
  );
};

export default SliderComponent;
