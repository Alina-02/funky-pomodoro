import React, { useEffect, useRef, useState } from "react";

const Pomodoro = () => {
  const DURATION = 3600;
  const [seconds, setSeconds] = useState(DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    pause();
    setSeconds(DURATION);
  };
  const rest = () => {
    setSeconds(600);
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <>
      <div className="numbers-container-div">
        <div className="number-div">{formatTime(seconds)[0]}</div>
        <div className="number-div">{formatTime(seconds)[1]}</div>
        <p className="text">:</p>
        <div className="number-div">{formatTime(seconds)[3]}</div>
        <div className="number-div">{formatTime(seconds)[4]}</div>
      </div>
      <div>
        <button onClick={isRunning ? pause : start}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={reset}>Reset</button>
        <button onClick={rest}>Rest</button>
      </div>
    </>
  );
};

export default Pomodoro;
