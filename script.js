let dailyCharacter = characters[Math.floor(Math.random() * characters.length)];
let guesses = [];

const searchInput = document.getElementById("searchInput");
const guessButton = document.getElementById("guessButton");
const suggestions = document.getElementById("suggestions");
const guessesContainer = document.getElementById("guessesContainer");
const winMessage = document.getElementById("winMessage");
const winnerName = document.getElementById("winnerName");

searchInput.addEventListener("input", updateSuggestions);
guessButton.addEventListener("click", submitGuess);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") submitGuess();
});

function updateSuggestions() {
  const value = searchInput.value.toLowerCase();
  suggestions.innerHTML = "";

  if (!value) return;

  const filtered = characters.filter(c =>
    c.name.toLowerCase().startsWith(value) &&
    !guesses.includes(c.name)
  );

  filtered.forEach(character => {
    const btn = document.createElement("button");
    btn.textContent = character.name;
    btn.onclick = () => processGuess(character);
    suggestions.appendChild(btn);
  });
}

function submitGuess() {
}
