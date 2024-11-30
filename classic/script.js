const beginButton = document.getElementById("beginButton");
const fullscreenToggle = document.getElementById("fullscreenToggle");
const hardModeToggle = document.getElementById("hardModeToggle");
const container = document.querySelector(".container");
const gameArea = document.getElementById("gameArea");
const timerDiv = document.getElementById("timer");
const timeSpan = document.getElementById("time");
const hardModeLabel = document.getElementById("hardModeLabel");

let timerInterval;
let startTime;
let hardMode = false;
let redButton;
let teleportingEnabled = true;
let buttonClickedFlag = false;
let hardModeInterval;
let nothingHappenedFlag = false;
let isFullscreen = false;

// Create the red button dynamically
function createRedButton() {
  redButton = document.createElement("button");
  redButton.id = "redButton";
  redButton.textContent = "DON'T PRESS!";
  redButton.addEventListener("click", buttonClicked);
  redButton.addEventListener("mouseover", buttonHovered);
  return redButton;
}

// Create the restart button dynamically
function createRestartButton() {
  const restartButton = document.createElement("button");
  restartButton.id = "restartButton";
  restartButton.textContent = "Restart";
  restartButton.addEventListener("click", restartGame);
  return restartButton;
}

// Start the timer
function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
    timeSpan.textContent = elapsedTime;
  }, 10);
}

// Stop the timer
function stopTimer() {
  clearInterval(timerInterval);
}

// Randomly teleport the button, avoiding the cursor's position
function randomTeleport(button) {
  const buttonRect = button.getBoundingClientRect();
  let x, y;

  do {
    x = Math.random() * (window.innerWidth - button.offsetWidth);
    y = Math.random() * (window.innerHeight - button.offsetHeight);
  } while (
    Math.abs(x - (window.innerWidth / 2)) < 100 || // Avoid teleporting near the center (cursor)
    Math.abs(y - (window.innerHeight / 2)) < 100
  );

  button.style.left = `${x}px`;
  button.style.top = `${y}px`;
}

// Handle button hover with teleportation
function buttonHovered() {
  if (!buttonClickedFlag && teleportingEnabled) {
    randomTeleport(this);
  }
}

// Handle the red button click
function buttonClicked() {
  if (buttonClickedFlag) return; // Prevent further clicks after the first click
  buttonClickedFlag = true;
  stopTimer();
  this.classList.add("grey");
  teleportingEnabled = false; // Disable teleporting after the button is clicked

  // Random events
  const actions = [
    () => {
      if (!nothingHappenedFlag) {
        displayMessage("Nothing happened...");
        nothingHappenedFlag = true;
      } else {
        displayMessage("You clicked me again!");
      }
    },
    () => window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank"),
    () => displayMessage("How dare you!"),
    () => displayMessage("STOP TOUCHING ME YOU CREEP"),
    () => displayMessage("Why would you do that...?"),
    () => displayMessage("Ouch!"),
  ];
  const randomAction = actions[Math.floor(Math.random() * actions.length)];
  randomAction();

  // Add restart button
  const restartButton = createRestartButton();
  document.body.appendChild(restartButton);
}

// Display message in center of the screen
function displayMessage(message) {
  const messageElement = document.createElement("h1");
  messageElement.textContent = message;
  messageElement.style.position = "absolute";
  messageElement.style.top = "50%";
  messageElement.style.left = "50%";
  messageElement.style.transform = "translate(-50%, -50%)";
  messageElement.style.color = "#ff4500";
  document.body.appendChild(messageElement);
}

// Restart the game
function restartGame() {
  location.reload(); // Reload the page to restart the game
}

// Start the game when the begin button is clicked
beginButton.addEventListener("click", () => {
  // Remove the main menu elements
  container.style.display = "none";
  gameArea.style.display = "block";
  timerDiv.style.display = "block";

  startTimer();
  gameArea.appendChild(createRedButton());
  beginButton.disabled = true; // Disable the begin button after it's clicked
});