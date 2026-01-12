console.log("Type Hero loaded");

const lane = document.getElementById("lane");
const input = document.getElementById("input");
const scoreEl = document.getElementById("score");
const comboEl = document.getElementById("combo");

const words = {
  easy: ["A","S","D","F","J","K","L"],
  medium: ["cat","dog","run","sun","ball"],
  hard: ["typing","keyboard","jump"]
};

let difficulty = "easy";
let speed = 2500;
let currentWord = "";
let fallTimer;
let score = 0;
let combo = 0;

function setDifficulty(level) {
  difficulty = level;
  speed = level === "easy" ? 2500 : level === "medium" ? 1500 : 800;
  reset();
}

function reset() {
  clearInterval(fallTimer);
  lane.innerHTML = "";
  input.value = "";
  spawn();
}

function spawn() {
  const list = words[difficulty];
  currentWord = list[Math.floor(Math.random() * list.length)];

  const el = document.createElement("div");
  el.className = "note";
  el.textContent = currentWord;
  lane.appendChild(el);

  let top = 0;
  fallTimer = setInterval(() => {
    top += 4;
    el.style.top = top + "px";

    if (top > 360) {
      clearInterval(fallTimer);
      combo = 0;
      comboEl.textContent = combo;
      reset();
    }
  }, 50);
}

input.addEventListener("input", () => {
  if (input.value.toLowerCase() === currentWord.toLowerCase()) {
    score += 10 + combo * 5;
    combo++;
    scoreEl.textContent = score;
    comboEl.textContent = combo;
    reset();
  }
});

spawn();
