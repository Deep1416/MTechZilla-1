import React, { useState, useEffect } from "react";
import "./Timer.css";
import Alert from "./../alert/Alert";

const Timer = () => {
  const initialFocusTime = 1500; // 1500 seconds = 25 minutes
  const initialBreakTime = 300; // 300 seconds = 5 minutes
  const [time, setTime] = useState(initialFocusTime);
  const [timerId, setTimerId] = useState(null);
  const [timerLimit, setTimerLimit] = useState(initialFocusTime);
  const [alert, setAlert] = useState({ message: "", type: "", duration: 0 });
  const [isBreakTime, setIsBreakTime] = useState(false);

  useEffect(() => {
    if (time <= 0 && timerId) {
      clearInterval(timerId);
      setTimerId(null);
      if (!isBreakTime) {
        setAlert({
          message: "Focus time's up! Take a break.",
          type: "info",
          duration: 3000,
        });
        setTime(initialBreakTime);
        setTimerLimit(initialBreakTime);
        setIsBreakTime(true);
      } else {
        setAlert({
          message: "Break time's up! Focus again.",
          type: "info",
          duration: 3000,
        });
        setTime(initialFocusTime);
        setTimerLimit(initialFocusTime);
        setIsBreakTime(false);
      }

      setTimeout(() => {
        setAlert({ message: "", type: "", duration: 0 });
      }, 3000);
    }
  }, [time, timerId, isBreakTime, initialFocusTime, initialBreakTime]);

  const startTimer = () => {
    if (!timerId) {
      const id = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      setTimerId(id);
    }
  };

  const pauseTimer = () => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
  };

  const resetTimer = () => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
    setTime(initialFocusTime);
    setTimerLimit(initialFocusTime);
    setIsBreakTime(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  const decreaseTimerLimit = () => {
    const newLimit = timerLimit - 60; // Decrease by 1 minute
    if (newLimit >= 60) {
      setTimerLimit(newLimit);
      setTime(newLimit);
    }
  };

  const increaseTimerLimit = () => {
    const newLimit = timerLimit + 60; // Increase by 1 minute
    if (newLimit <= 3600) {
      // Limit maximum to 1 hour
      setTimerLimit(newLimit);
      setTime(newLimit);
    }
  };

  return (
    <div className="app-container flex flex-col justify-end items-center min-h-[100vh] px-10 pt-0 pb-32 ">
      {alert.message && (
        <Alert
          message={alert.message}
          type={alert.type}
          duration={alert.duration}
        />
      )}

      <div className="flex flex-col items-center w-[90%] md:flex-row md:max-w-[1140]">
        <div className="timer-display-container">
          <div className="elapsed-time-container">
            <h1 className="text-[#00d9f5] font-bold font-roboto text-xl sm:text-[48px] md:text-[28px] m-0">
              {formatTime(time)}
            </h1>
            <p className="text-[#1e293b] font-bold font-roboto text-base md:text-xl m-0">
              {timerId ? "Running" : "Paused"}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center flex-grow">
          <div className="flex items-center">
            <button
              className="flex items-center bg-transparent border-0 mx-4 px-0 cursor-pointer outline-none"
              onClick={timerId ? pauseTimer : startTimer}
              type="button"
            >
              <img
                alt={timerId ? "pause icon" : "play icon"}
                className="w-6 h-6 md:w-9 md:h-9 mr-2 md:mr-3"
                src={
                  timerId
                    ? "https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                    : "https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                }
              />
              <p className="text-blue-gray-800 font-medium font-roboto text-base md:text-lg">
                {timerId ? "Pause" : "Start"}
              </p>
            </button>
            <button
              className="flex items-center bg-transparent border-0 mx-4 px-0 cursor-pointer outline-none"
              onClick={resetTimer}
              type="button"
            >
              <img
                alt="reset icon"
                className="w-6 h-6 md:w-9 md:h-9 mr-2 md:mr-3"
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              />
              <p className="text-blue-gray-800 font-medium font-roboto text-base md:text-lg">
                Reset
              </p>
            </button>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-blue-gray-800 font-medium font-roboto text-base">
              Set Timer limit
            </p>
            <div className="flex items-center">
              <button
                className="text-[#1e293b] bg-transparent font-medium font-roboto text-[40px] border-0 m-2 cursor-pointer outline-none"
                onClick={decreaseTimerLimit}
                type="button"
              >
                -
              </button>
              <div className="flex flex-col items-center m-2">
                <p className="text-center text-[#1e293b] bg-gradient-to-r from-[#00f5a0] to-[#00d9f5] font-roboto text-lg md:text-[32px] font-medium w-[100px] rounded-lg m-0 p-2">
                  {formatTime(timerLimit)}
                </p>
              </div>
              <button
                className="text-[#1e293b] bg-transparent font-medium font-roboto text-[40px] border-0 m-2 cursor-pointer outline-none"
                onClick={increaseTimerLimit}
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
