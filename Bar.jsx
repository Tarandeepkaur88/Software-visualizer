import React from 'react';

const Bar = ({ height, active }) => {
  return (
    <div
      style={{ height: `${height}px` }}
      className={`w-[2%] rounded-sm transition-all duration-200 ${
        active ? 'bg-red-500' : 'bg-blue-500'
      }`}
    ></div>
  );
};

export default Bar;
