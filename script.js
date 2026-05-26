let timer = 60;
let score = 0;
let targetNumber = 0;
let timerInterval;

const bubbleContainer =
  document.querySelector("#bubble-container");

const timerValue =
  document.querySelector("#timer-value");

const scoreValue =
  document.querySelector("#score-value");

const hitValue =
  document.querySelector("#hit-value");

const startScreen =
  document.querySelector("#start-screen");

const gameOverScreen =
  document.querySelector("#game-over");

const finalScore =
  document.querySelector("#final-score");

const startBtn =
  document.querySelector("#start-btn");

const restartBtn =
  document.querySelector("#restart-btn");

/* START */

startBtn.addEventListener(
  "click",
  startGame
);

restartBtn.addEventListener(
  "click",
  restartGame
);

function startGame(){

  startScreen.classList.add("hidden");

  timer = 60;
  score = 0;

  timerValue.textContent = timer;
  scoreValue.textContent = score;

  createTarget();

  generateBubbles();

  runTimer();
}

/* TIMER */

function runTimer(){

  clearInterval(timerInterval);

  timerInterval = setInterval(() => {

    if(timer > 0){

      timer--;

      timerValue.textContent = timer;
    }

    else{

      endGame();
    }

  },1000);
}

/* TARGET */

function createTarget(){

  targetNumber =
    Math.floor(Math.random() * 10);

  hitValue.textContent =
    targetNumber;
}

/* BUBBLES */

function generateBubbles(){

  let clutter = "";

  const themes = [
    "pink",
    "cyan",
    "purple"
  ];

  for(let i = 0; i < 114; i++){

    const randomNumber =
      Math.floor(Math.random() * 10);

    const randomTheme =
      themes[
        Math.floor(
          Math.random() * themes.length
        )
      ];

    clutter += `
      <div class="bubble ${randomTheme}">
        ${randomNumber}
      </div>
    `;
  }

  bubbleContainer.innerHTML = clutter;
}

/* SCORE */

function increaseScore(){

  score += 10;

  scoreValue.textContent = score;
}

/* CLICK */

bubbleContainer.addEventListener(
  "click",
  (details) => {

    const clickedBubble =
      details.target;

    if(
      !clickedBubble.classList.contains(
        "bubble"
      )
    ){
      return;
    }

    const clickedNumber =
      Number(clickedBubble.textContent);

    if(clickedNumber === targetNumber){

      clickedBubble.classList.add("pop");

      setTimeout(() => {

        increaseScore();

        createTarget();

        generateBubbles();

      },120);
    }
  }
);

/* END GAME */

function endGame(){

  clearInterval(timerInterval);

  finalScore.textContent =
    score;

  gameOverScreen.classList.remove(
    "hidden"
  );
}

/* RESTART */

function restartGame(){

  gameOverScreen.classList.add(
    "hidden"
  );

  startGame();
}