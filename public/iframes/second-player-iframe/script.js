let ACTIVE = null;
const DIRECTIONS = ["ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"];
const COLORS = ["red", "orange", "yellow", "green", "blue", "purple"];
let POINTS = 0;
const GAME_DURATION = 10000;

const board = document.getElementById("board");
const generator = document.getElementById("new-row-generator");
const pointCounter = document.getElementById("points");

const boardTop = board.getBoundingClientRect().top;

let gameTimer; // Timer variable
let gameInterval = null; // Add a variable to store the game interval

const handleKeyDown = (e) => {
  console.log(e.code);
  const directionIndex = DIRECTIONS.findIndex(
    (direction) => direction === e.code
  );
  if (!ACTIVE) return;

  const activeArrow = ACTIVE.getAttribute("data-active");
  if (directionIndex == activeArrow) {
    ACTIVE.children[directionIndex].style.setProperty(
      "--arrow-outline",
      "lightgreen"
    );
    ACTIVE.children[directionIndex].style.setProperty(
      "--arrow-color",
      "lightgreen"
    );
    POINTS++;
    pointCounter.innerHTML = `Points: ${POINTS}`;
    const clip = "./assets/win.wav";
  } else {
    const clip = "./assets/fail.wav";
    // ACTIVE.children[directionIndex].style.setProperty("--arrow-outline", "red")
  }
};

const createRow = (outineColor, speed) => {
  const newRow = board.cloneNode(true);
  newRow.style.position = "absolute";
  const randomizer = Math.floor(Math.random() * 4);
  newRow.setAttribute("data-active", randomizer);
  for (let i = 0; i < 4; i++) {
    if (i === randomizer) {
      newRow.children[i].style.setProperty("--arrow-outline", outineColor);
    } else {
      newRow.children[i].style.setProperty("--arrow-outline", "transparent");
      newRow.children[i].style.setProperty("--arrow-color", "transparent");
    }
  }
  generator.append(newRow);
  animateRow(newRow, speed);
};

const animateRow = (row, speed) => {
  const rowTop = row.getBoundingClientRect().top;
  const proximity = rowTop - boardTop;

  const LOWER_THRESHOLD = 70;
  const UPPER_THRESHOLD = 90;

  setTimeout(() => {
    ACTIVE = row;
    setTimeout(() => {
      if (ACTIVE === row) {
        ACTIVE = null;
      }
    }, (1 / speed) * UPPER_THRESHOLD);
  }, (1 / speed) * (proximity - LOWER_THRESHOLD));

  const options = [{ transform: "translateY(-10000px)" }];

  const keyframes = {
    duration: (1 / speed) * 10000, //1 pix every 2 mil
    iterations: Infinity,
  };

  row.animate(options, keyframes);

  setTimeout(() => {
    row.remove();
  }, (1 / speed) * 10000);
};

const startGame = (speed, interval) => {
  //speed = pixels per milisecond
  const clip = "./assets/game-music-new.mp3";
  document.addEventListener("keydown", handleKeyDown);

  gameInterval = setInterval(() => {
    const colorRandomizer = Math.floor(Math.random() * 6);
    const color = COLORS[colorRandomizer];
    createRow(color, speed);
  }, interval);

  gameTimer = setTimeout(() => {
    endGame();
  }, GAME_DURATION);
};

const endGame = () => {
  clearInterval(gameInterval); // Clear the game interval
  document.removeEventListener("keydown", handleKeyDown); // Remove the keydown event listener
  generator.innerHTML = ""; // Clear the generated rows
  window.parent.postMessage(
    { secondPlayerScore: POINTS, isGameEnded: true },
    "*"
  );
};

setTimeout(() => {
  startGame(0.7, 2000);
}, 3000);

window.addEventListener("message", function (event) {
  console.log(event.data);
  handleKeyDown({ code: event.data });
});
