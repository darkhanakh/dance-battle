import React, { useState, useEffect } from "react";

interface CountdownProps {
  duration: number;
  onCountdownEnd: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ duration, onCountdownEnd }) => {
  const [count, setCount] = useState(duration);

  useEffect(() => {
    if (count === 0) {
      onCountdownEnd();
      return;
    }

    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [count, onCountdownEnd]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCount((prevCount) => prevCount - 1);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <span className="countdown font-mono text-6xl">
      {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
      {/*@ts-ignore*/}
      <span style={{ "--value": count }}></span>
    </span>
  );
};

export default Countdown;
