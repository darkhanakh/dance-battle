import { useRef, useEffect, useState } from "react";
import "./../styles/TestRhythms.css";
import Countdown from "../components/layout/Countdown.tsx";
// @ts-ignore
import useSound from "use-sound";
import queryString from "query-string";
import { useLocation } from "react-router";

import music from "../assets/audios/music_1.mp3";
import Battle from "../components/Battle/Battle.tsx";

const Game = () => {
  const [isCountdownEnded, setIsCountdownEnded] = useState(false);
  const [firstPlayerPoints, setFirstPlayerPoints] = useState(0);
  const [secondPlayerPoints, setSecondPlayerPoints] = useState(0);
  const [winner, setWinner] = useState("");
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [play, { stop }] = useSound(music, { volume: 0.5 });

  const firstIframeRef = useRef<HTMLIFrameElement>(null);
  const secondIframeRef = useRef<HTMLIFrameElement>(null);

  const location = useLocation();

  const queryParams = queryString.parse(location.search);
  const player1 = queryParams.player1 as string;
  const player2 = queryParams.player2 as string;

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

  const handleCountdownEnd = () => {
    setIsCountdownEnded(true);
  };

  const handleResetGame = () => {
    setFirstPlayerPoints(0);
    setSecondPlayerPoints(0);
    setWinner("");
    setIsCountdownEnded(false);
    setIsGameEnded(false);
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
      {isCountdownEnded && !isGameEnded && (
        <Battle player1={player1} player2={player2} />
      )}
      {isGameEnded && (
        <div>
          <div className="text-3xl">{winner}</div>
          <button className="btn btn-primary" onClick={handleResetGame}>
            Начать заново
          </button>
        </div>
      )}
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
    </div>
  );
};

export default Game;
