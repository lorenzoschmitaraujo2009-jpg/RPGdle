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
searchInput.addEventListener("keydown", e => { if (e.key === "Enter") submitGuess(); });
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
  const character = characters.find(
    c => c.name.toLowerCase() === searchInput.value.toLowerCase()
  );
  processGuess(character);
}
function processGuess(character) {
  if (!character || guesses.includes(character.name)) return;
  guesses.push(character.name);
  searchInput.value = "";
  suggestions.innerHTML = "";
  renderGuess(character);
  if (character.name === dailyCharacter.name) {
    winnerName.textContent = `Você descobriu: ${dailyCharacter.name}`;
    winMessage.classList.remove("hidden");
  }
}
function renderGuess(character) {
  const row = document.createElement("div");
  row.className = "guess-row";
  ["name", "race", "kingdom", "status"].forEach(field => {
    const cell = document.createElement("div");
    cell.textContent = character[field];
    if (character[field] === dailyCharacter[field]) cell.classList.add("green");
    else if (field === "kingdom" && character.kingdom !== "Nenhum" && dailyCharacter.kingdom !== "Nenhum") cell.classList.add("yellow");
    else cell.classList.add("red");
    row.appendChild(cell);
  });
  guessesContainer.prepend(row);
}
function resetGame() {
  guesses = [];
  guessesContainer.innerHTML = "";
  winMessage.classList.add("hidden");
  dailyCharacter = characters[Math.floor(Math.random() * characters.length)];
}
