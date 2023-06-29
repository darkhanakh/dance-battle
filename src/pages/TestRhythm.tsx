import { useRef, useEffect, useState } from "react";
import "./../styles/TestRhythms.css";
import Countdown from "../components/layout/Countdown.tsx";
// @ts-ignore
import useSound from "use-sound";

import music from "./../../public/assets/audios/music_1.mp3";

const TestRhythm = () => {
  const [isCountdownEnded, setIsCountdownEnded] = useState(false);
  const [firstPlayerPoints, setFirstPlayerPoints] = useState(0);
  const [secondPlayerPoints, setSecondPlayerPoints] = useState(0);
  const [winner, setWinner] = useState("");
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [play, { stop }] = useSound(music, { volume: 0.5 });

  const firstIframeRef = useRef<HTMLIFrameElement>(null);
  const secondIframeRef = useRef<HTMLIFrameElement>(null);

  const calculateWinner = () => {
    if (firstPlayerPoints > secondPlayerPoints) {
      return "First player wins!";
    } else if (firstPlayerPoints < secondPlayerPoints) {
      return "Second player wins!";
    } else {
      return "It's a tie!";
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (firstIframeRef.current && firstIframeRef.current.contentWindow) {
        if (
          e.code === "KeyA" ||
          e.code === "KeyW" ||
          e.code === "KeyS" ||
          e.code === "KeyD"
        ) {
          firstIframeRef.current.contentWindow.postMessage(e.code, "*");
        }
      }

      if (secondIframeRef.current && secondIframeRef.current.contentWindow) {
        if (
          e.key === "ArrowLeft" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowDown" ||
          e.key === "ArrowRight"
        ) {
          secondIframeRef.current.contentWindow.postMessage(e.code, "*");
        }
      }
    };

    const handleMessage = (event: any) => {
      const messageData = event.data;

      if (
        messageData &&
        Object.prototype.hasOwnProperty.call(messageData, "firstPlayerScore")
      ) {
        setFirstPlayerPoints(+messageData.firstPlayerScore);
      } else if (
        messageData &&
        Object.prototype.hasOwnProperty.call(messageData, "secondPlayerScore")
      ) {
        setSecondPlayerPoints(+messageData.secondPlayerScore);
      }

      if (
        messageData &&
        Object.prototype.hasOwnProperty.call(messageData, "isGameEnded")
      ) {
        setIsGameEnded(true);
      }
    };

    window.addEventListener("message", handleMessage);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isGameEnded) {
      const winner = calculateWinner();
      setWinner(winner);

      // Delay for 5 seconds and then reset the game state
      const toastTimeout = setTimeout(() => {
        setIsGameEnded(false);
      }, 5000);

      // Clean up the timeout when the component unmounts
      return () => {
        clearTimeout(toastTimeout);
      };
    }
  }, [isGameEnded]);

  const handleCountdownEnd = () => {
    setIsCountdownEnded(true);
  };

  const renderCountdownAndPlaySound = () => {
    play();
    setTimeout(() => {
      stop();
    }, 30000);
    return <Countdown duration={3} onCountdownEnd={handleCountdownEnd} />;
  };

  return (
    <div className="flex justify-between items-center">
      <div className="box" style={{ float: "left", marginRight: "20px" }}>
        <iframe
          ref={firstIframeRef}
          src="/iframes/first-player-iframe/iframe.html"
          frameBorder="no"
          width={400}
          height={700}
          style={{ border: "solid 1px black" }}
        ></iframe>
      </div>
      {!isCountdownEnded && renderCountdownAndPlaySound()}

      <div className="box" style={{ float: "left", marginRight: "20px" }}>
        <iframe
          ref={secondIframeRef}
          src="/iframes/second-player-iframe/iframe.html"
          frameBorder="no"
          width={400}
          height={700}
          style={{ border: "solid 1px black" }}
        ></iframe>
      </div>

      {isGameEnded && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>{winner}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestRhythm;
