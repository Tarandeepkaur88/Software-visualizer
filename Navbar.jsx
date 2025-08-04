import React from 'react';

const Navbar = ({
  onreset,
  onsort,
  onmergesort,
  onquicksort,
  onpause,
  paused,
  sorting,
  algoInfo,
}) => {
  return (
    <div className="w-full bg-slate-800 p-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-lg">
      <div className="flex flex-col items-center md:items-start">
        <h1 className="text-white text-2xl font-bold">Sorting Visualizer</h1>
        {algoInfo && (
          <div className="text-sm md:text-base text-blue-300 mt-2 space-y-1">
            <div><span className="font-semibold text-white">Algorithm:</span> {algoInfo.name}</div>
            <div><span className="font-semibold text-white">Best:</span> {algoInfo.best}</div>
            <div><span className="font-semibold text-white">Average:</span> {algoInfo.avg}</div>
            <div><span className="font-semibold text-white">Worst:</span> {algoInfo.worst}</div>
          </div>
        )}
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={onreset}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={sorting}
        >
          Reset
        </button>
        <button
          onClick={onsort}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={sorting}
        >
          Bubble Sort
        </button>
        <button
          onClick={onmergesort}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={sorting}
        >
          Merge Sort
        </button>
        <button
          onClick={onquicksort}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={sorting}
        >
          Quick Sort
        </button>
        <button
          onClick={onpause}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={!sorting}
        >
          {paused ? "Resume" : "Pause"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;


