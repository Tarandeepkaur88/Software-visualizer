import React, { useState, useRef, useEffect } from 'react';
import Navbar from "./components/Navbar";
import Bar from './components/Bar';

const generateArray = (size) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * 300 + 50));

const App = () => {
  const [array, setarray] = useState(generateArray(25));
  const [currentIndex, setcurrentIndex] = useState(-1);
  const [secondaryIndex, setsecondary] = useState(-1);
  const [paused, setpaused] = useState(false);
  const [issorting, setissorting] = useState(false);
  const [algoInfo, setAlgoInfo] = useState(null);

  const pausedRef = useRef(paused);
  const cancelRef = useRef(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const togglePause = () => {
    setpaused(prev => !prev);
  };

  const sleep = (ms) => {
    return new Promise((resolve) => {
      const start = Date.now();
      const check = () => {
        if (cancelRef.current) {
          resolve(); return;
        }
        if (!pausedRef.current) {
          const elapsed = Date.now() - start;
          if (elapsed >= ms) resolve();
          else setTimeout(check, 10);
        } else {
          setTimeout(check, 10);
        }
      };
      check();
    });
  };

  const resetArray = () => {
    cancelRef.current = true;
    setarray(generateArray(25));
    setAlgoInfo(null);
    setcurrentIndex(-1);
    setsecondary(-1);
    setpaused(false);
    setissorting(false);
  };

  const bubblesort = async () => {
    cancelRef.current = true;
    await sleep(0);
    cancelRef.current = false;
    setissorting(true);

    setAlgoInfo({
      name: "Bubble Sort",
      best: "O(n)",
      avg: "O(n²)",
      worst: "O(n²)"
    });

    const arr = [...array];
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (cancelRef.current) {
          setissorting(false); return;
        }
        setcurrentIndex(j);
        setsecondary(j + 1);
        await sleep(60);
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setarray([...arr]);
          await sleep(60);
        }
      }
    }

    setcurrentIndex(-1);
    setsecondary(-1);
    setissorting(false);
  };

  const mergesort = async () => {
    cancelRef.current = true;
    await sleep(0);
    cancelRef.current = false;
    setissorting(true);

    setAlgoInfo({
      name: "Merge Sort",
      best: "O(n log n)",
      avg: "O(n log n)",
      worst: "O(n log n)"
    });

    const arr = [...array];
    await mergesorthelper(arr, 0, arr.length - 1);
    setarray([...arr]);
    setcurrentIndex(-1);
    setsecondary(-1);
    setissorting(false);
  };

  const mergesorthelper = async (arr, l, r) => {
    if (cancelRef.current || l >= r) return;
    const mid = Math.floor((l + r) / 2);
    await mergesorthelper(arr, l, mid);
    await mergesorthelper(arr, mid + 1, r);
    await merge(arr, l, mid, r);
  };

  const merge = async (arr, l, mid, r) => {
    const left = arr.slice(l, mid + 1);
    const right = arr.slice(mid + 1, r + 1);
    let i = 0, j = 0, k = l;

    while (i < left.length && j < right.length) {
      if (cancelRef.current) return;
      setcurrentIndex(k);
      setsecondary(k + 1);
      await sleep(20);
      if (left[i] <= right[j]) {
        arr[k++] = left[i++];
      } else {
        arr[k++] = right[j++];
      }
      setarray([...arr]);
    }

    while (i < left.length) {
      if (cancelRef.current) return;
      arr[k++] = left[i++];
      setarray([...arr]);
      await sleep(20);
    }

    while (j < right.length) {
      if (cancelRef.current) return;
      arr[k++] = right[j++];
      setarray([...arr]);
      await sleep(20);
    }
  };

  const quicksort = async () => {
    cancelRef.current = true;
    await sleep(0);
    cancelRef.current = false;
    setissorting(true);

    setAlgoInfo({
      name: "Quick Sort",
      best: "O(n log n)",
      avg: "O(n log n)",
      worst: "O(n²)"
    });

    const arr = [...array];
    await quicksorthelper(arr, 0, arr.length - 1);
    setarray([...arr]);
    setcurrentIndex(-1);
    setsecondary(-1);
    setissorting(false);
  };

  const quicksorthelper = async (arr, low, high) => {
    if (cancelRef.current || low >= high) return;
    const pi = await partition(arr, low, high);
    await quicksorthelper(arr, low, pi - 1);
    await quicksorthelper(arr, pi + 1, high);
  };

  const partition = async (arr, low, high) => {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (cancelRef.current) return high;
      setcurrentIndex(j);
      setsecondary(high);
      await sleep(30);
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setarray([...arr]);
        await sleep(20);
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setarray([...arr]);
    await sleep(20);
    return i + 1;
  };

  return (
    <div className='min-h-screen bg-slate-900 text-white'>
      <Navbar
        onreset={resetArray}
        onsort={bubblesort}
        onmergesort={mergesort}
        onquicksort={quicksort}
        onpause={togglePause}
        paused={paused}
        sorting={issorting}
        algoInfo={algoInfo}
      />
      <div className='flex items-end gap-1 mt-20 w-full justify-center'>
        {array.map((value, idx) => (
          <Bar key={idx} height={value} active={idx === currentIndex || idx === secondaryIndex} />
        ))}
      </div>
    </div>
  );
};

export default App;



