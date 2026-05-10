import { useState } from "react";
import { motion } from "framer-motion";

export default function RPGdle() {
  const characters = [
    { name: "Hermes Vi Britannia", race: "Changeling", kingdom: "Britannia", status: "Vivo" },
    { name: "Zaros Rhazien Vi Britannia", race: "Vryloka", kingdom: "Britannia", status: "Morto" },
    { name: "Cedrico Ragnar", race: "Humano", kingdom: "Valhaz", status: "Morto" },
    { name: "Billy Florence", race: "Humano", kingdom: "Nenhum", status: "Vivo" },
    { name: "Tehen", race: "Elfo", kingdom: "Nenhum", status: "Vivo" },
    { name: "Mael Guinvern", race: "Elfo", kingdom: "Nenhum", status: "Morto" },
    { name: "Zeldris Dreifus", race: "Humano", kingdom: "Atreia", status: "Vivo" },
    { name: "Julius Vi Britannia", race: "Vryloka", kingdom: "Assuã", status: "Vivo" },
    { name: "Kojiro Kasaki", race: "Humano", kingdom: "Nenhum", status: "Vivo" },
    { name: "Alice Grimshaw", race: "Elfo", kingdom: "Nenhum", status: "Morto" },
    { name: "Morgott Skalgrim", race: "Gigante", kingdom: "Ashen", status: "Vivo" },
    { name: "Vendrick Valmor", race: "Humano", kingdom: "Reino", status: "Morto" },
    { name: "Gregory Windsor", race: "Humano", kingdom: "Morrowind", status: "VIvo" },
    { name: "Nebu Morningstar", race: "Changeling", kingdom: "Britannia", status: "Morto" },
    { name: "Heimdall Ragnar", race: "Humano", kingdom: "Valhaz", status: "Morto" },
    { name: "Ryuji Hanzo", race: "Humano", kingdom: "Nenhum", status: "Vivo" },
    { name: "Noctis Valemont", race: "Changeling", kingdom: "Drakória", status: "Vivo" },
    { name: "Galius Berkshire", race: "Humano", kingdom: "Drakória", status: "Vivo" },
    { name: "Syphros Rhazien", race: "Vryloka", kingdom: "Atreia", status: "Vivo" },
    { name: "Beru Hummel", race: "Humano", kingdom: "Heimar", status: "Vivo" },
    { name: "Rikigami Tenshou", race: "Humano", kingdom: "Nenhum", status: "Vivo" },
    { name: "Fynar", race: "Changeling", kingdom: "Britannia", status: "Vivo" },
    { name: "Rosnov Morningstar", race: "Changeling", kingdom: "Britannia", status: "Vivo" },
    { name: "Euphemia Rhazien Vi Britannia", race: "Vryloka", kingdom: "Britannia", status: "Vivo" },
    { name: "George Hummel", race: "Humano", kingdom: "Heimar", status: "Morto" },
    { name: "Teyocan Pachayoc", race: "Humano", kingdom: "Atreia", status: "Morto" }
  ];

  const randomCharacter = () =>
    characters[Math.floor(Math.random() * characters.length)];

  const [dailyCharacter, setDailyCharacter] = useState(() => randomCharacter());
  const [search, setSearch] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [gameWon, setGameWon] = useState(false);

  const guessedNames = guesses.map((guess) => guess.name);

  const filteredCharacters = characters
    .filter(
      (character) =>
        character.name.toLowerCase().startsWith(search.toLowerCase()) &&
        search.length > 0 &&
        !guessedNames.includes(character.name)
    )
    .sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      const searchTerm = search.toLowerCase();

      const aStarts = aName.startsWith(searchTerm);
      const bStarts = bName.startsWith(searchTerm);

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      return aName.localeCompare(bName);
    });

  const getCellColor = (field, guess, correct) => {
    if (guess[field] === correct[field]) return "bg-green-600";

    if (
      field === "kingdom" &&
      guess.kingdom !== correct.kingdom &&
      guess.kingdom !== "Nenhum" &&
      correct.kingdom !== "Nenhum"
    ) {
      return "bg-yellow-500";
    }

    return "bg-red-600";
  };

  const processGuess = (selectedCharacter) => {
    if (!selectedCharacter) return;

    const alreadyGuessed = guesses.some(
      (guess) => guess.name === selectedCharacter.name
    );

    if (alreadyGuessed) return;

    setGuesses((prev) => [...prev, selectedCharacter]);
    setSearch("");

    if (selectedCharacter.name === dailyCharacter.name) {
      setGameWon(true);
    }
  };

  const submitGuess = () => {
    const selectedCharacter = characters.find(
      (character) => character.name.toLowerCase() === search.toLowerCase()
    );

    processGuess(selectedCharacter);
  };

  const resetGame = () => {
    let newCharacter = randomCharacter();

    while (newCharacter.name === dailyCharacter.name && characters.length > 1) {
      newCharacter = randomCharacter();
    }

    setGuesses([]);
    setGameWon(false);
    setSearch("");
    setDailyCharacter(newCharacter);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-slate-950 text-white p-6 tracking-wide"
    >
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-6xl font-extrabold text-yellow-400 mb-2 tracking-widest" style={{fontFamily: 'UnifrakturCook, MedievalSharp, Georgia, serif', letterSpacing: '0.08em'}}>RPGdle</h1>
          <p className="text-slate-300 text-lg" style={{fontFamily: 'MedievalSharp, Georgia, serif'}}> 
            Descubra o personagem do dia do seu universo RPG
          </p>
        </header>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-slate-800 rounded-2xl shadow-2xl p-6 mb-8 backdrop-blur-sm"
        >
          <div className="flex gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submitGuess()}
              placeholder="Digite o nome de um personagem..."
              className="flex-1 p-4 rounded-xl bg-slate-900 border border-slate-700 text-white text-lg focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
            />

            <button
              onClick={submitGuess}
              className="bg-green-600 hover:bg-green-500 hover:scale-105 transition-all duration-300 px-5 rounded-xl flex items-center justify-center"
            >
              <span className="text-2xl font-bold">✓</span>
            </button>
          </div>

          {filteredCharacters.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-3 bg-slate-900 rounded-xl border border-slate-700 max-h-60 overflow-y-auto"
            >
              {filteredCharacters.map((character, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-3 hover:bg-slate-700 hover:translate-x-1 transition-all duration-200 border-b border-slate-800 last:border-b-0"
                  onClick={() => processGuess(character)}
                >
                  {character.name}
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {gameWon && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 bg-green-700 text-white rounded-2xl p-6 text-center shadow-2xl"
          >
            <h2 className="text-4xl font-bold mb-3 tracking-wide" style={{fontFamily: 'UnifrakturCook, MedievalSharp, Georgia, serif', letterSpacing: '0.08em'}}>🎉 Você ganhou! 🎉</h2>
            <p className="mb-4">
              Você descobriu o personagem correto: 
              <span className="font-bold text-yellow-300">
                {dailyCharacter.name}
              </span>
            </p>
            <button
              onClick={resetGame}
              className="bg-yellow-400 hover:bg-yellow-300 hover:scale-105 transition-all duration-300 text-black font-bold px-6 py-3 rounded-xl"
            >
              Jogar Novamente
            </button>
          </motion.div>
        )}

        <div className="grid grid-cols-4 gap-3 text-center font-semibold mb-4 text-sm md:text-base" style={{fontFamily: 'MedievalSharp, Georgia, serif'}}>
          <div className="bg-slate-700 p-3 rounded-lg">Nome</div>
          <div className="bg-slate-700 p-3 rounded-lg">Raça</div>
          <div className="bg-slate-700 p-3 rounded-lg">Reino</div>
          <div className="bg-slate-700 p-3 rounded-lg">Status</div>
        </div>

        <div className="space-y-3">
          {guesses.length === 0 ? (
            <div className="text-center text-slate-400 py-6">
              Nenhuma tentativa ainda. Digite um personagem para começar.
            </div>
          ) : (
            guesses.map((guess, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                key={index}
              className="grid grid-cols-4 gap-3 text-center text-sm md:text-base"
              >
                <div className={`${getCellColor("name", guess, dailyCharacter)} p-3 rounded-lg`}>
                  {guess.name}
                </div>
                <div className={`${getCellColor("race", guess, dailyCharacter)} p-3 rounded-lg`}>
                  {guess.race}
                </div>
                <div className={`${getCellColor("kingdom", guess, dailyCharacter)} p-3 rounded-lg`}>
                  {guess.kingdom}
                </div>
                <div className={`${getCellColor("status", guess, dailyCharacter)} p-3 rounded-lg`}>
                  {guess.status}
                </div>
              </motion.div>
            ))
          )}
        </div>

        <div className="mt-12 bg-slate-800 rounded-2xl p-6">
          <h2 className="text-3xl font-bold text-yellow-300 mb-4 tracking-wide" style={{fontFamily: 'UnifrakturCook, MedievalSharp, Georgia, serif', letterSpacing: '0.08em'}}>
            Como funciona
          </h2>
          <ul className="space-y-2 text-slate-300">
            <li>• Digite o nome de um personagem</li>
            <li>• Veja raça, reino e status do personagem</li>
            <li>• Verde = atributo correto</li>
            <li>• Amarelo = parcialmente correto</li>
            <li>• Vermelho = incorreto</li>
            <li>• Descubra o personagem diário</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
