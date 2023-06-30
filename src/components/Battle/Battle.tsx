import { useEffect, useRef } from "react";
import { FC } from "react";

interface IBattle {
  player1: string;
  player2: string;
}

const Battle: FC<IBattle> = ({ player1, player2 }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const sendDataToIframe = () => {
    const iframe = iframeRef.current;

    if (iframe && iframe.contentWindow) {
      const data = {
        player1: player1 && player1.replace(/["']/g, ""),
        player2: player2 && player2.replace(/["']/g, ""),
      };

      iframe.contentWindow.postMessage(data);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      sendDataToIframe();
    }, 300);
    const handleMessage = (event: any) => {
      console.log("event.data", event.data);
    };

    window.addEventListener("message", handleMessage);

    // Clean up the event listener
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div>
      <iframe
        src="/iframes/index.html"
        ref={iframeRef}
        width={800}
        height={600}
      ></iframe>
    </div>
  );
};

export default Battle;
