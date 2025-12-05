import { useEffect, useState } from "react";

// ======= CONFIG: CHANGE THESE ======= //
const SECRET_PASSCODE = "051225"; // change this
const PARTNER1_NAME = "Arjun";
const PARTNER2_NAME = "Mahi";

function App() {
  // Lock screen
  const [unlocked, setUnlocked] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [lockError, setLockError] = useState("");

  // About us
  const [about1, setAbout1] = useState("");
  const [about2, setAbout2] = useState("");

  // Nicknames
  const [nicknames, setNicknames] = useState([]);

  // Period tracker
  const [periodEntries, setPeriodEntries] = useState([]);

  // Songs
  const [songs, setSongs] = useState([]);

  // Memories
  const [memories, setMemories] = useState([]);

  // ======= LocalStorage Helpers ======= //
  const save = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const load = (key, defaultValue) => {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    try {
      return JSON.parse(raw);
    } catch {
      return defaultValue;
    }
  };

  // ======= Initial load ======= //
  useEffect(() => {
    setAbout1(load("aboutPartner1", ""));
    setAbout2(load("aboutPartner2", ""));
    setNicknames(load("nicknames", []));
    setPeriodEntries(load("periodEntries", []));
    setSongs(load("songs", []));
    setMemories(load("memories", []));
  }, []);

  // ======= Lock Screen Logic ======= //
  const handleUnlock = () => {
    if (passInput.trim() === SECRET_PASSCODE) {
      setUnlocked(true);
      setLockError("");
    } else {
      setLockError("Wrong passcode. Only we know the real one 💔");
    }
  };

  const handlePassKeyDown = (e) => {
    if (e.key === "Enter") handleUnlock();
  };

  // ======= About save ======= //
  const handleSaveAbout1 = () => {
    save("aboutPartner1", about1);
    alert("Saved what you feel about them ❤️");
  };

  const handleSaveAbout2 = () => {
    save("aboutPartner2", about2);
    alert("Saved what you feel about them ❤️");
  };

  // ======= Nicknames ======= //
  const [nicknameInput, setNicknameInput] = useState("");
  const [nicknameFor, setNicknameFor] = useState("");

  const addNickname = (e) => {
    e.preventDefault();
    const name = nicknameInput.trim();
    if (!name) return;
    const updated = [...nicknames, { name, forWhom: nicknameFor.trim() }];
    setNicknames(updated);
    save("nicknames", updated);
    setNicknameInput("");
    setNicknameFor("");
  };

  const removeNickname = (index) => {
    const updated = nicknames.filter((_, i) => i !== index);
    setNicknames(updated);
    save("nicknames", updated);
  };

  // ======= Period Tracker ======= //
  const [periodDate, setPeriodDate] = useState("");
  const [periodNotes, setPeriodNotes] = useState("");

  const addPeriodEntry = (e) => {
    e.preventDefault();
    if (!periodDate) return;
    const updated = [...periodEntries, { date: periodDate, notes: periodNotes.trim() }];
    setPeriodEntries(updated);
    save("periodEntries", updated);
    setPeriodDate("");
    setPeriodNotes("");
  };

  const removePeriodEntry = (index) => {
    const updated = periodEntries.filter((_, i) => i !== index);
    setPeriodEntries(updated);
    save("periodEntries", updated);
  };

  const sortedPeriods = [...periodEntries].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // ======= Songs ======= //
  const [songTitle, setSongTitle] = useState("");
  const [songArtist, setSongArtist] = useState("");
  const [songLink, setSongLink] = useState("");

  const addSong = (e) => {
    e.preventDefault();
    if (!songTitle.trim()) return;
    const updated = [
      ...songs,
      { title: songTitle.trim(), artist: songArtist.trim(), link: songLink.trim() },
    ];
    setSongs(updated);
    save("songs", updated);
    setSongTitle("");
    setSongArtist("");
    setSongLink("");
  };

  const removeSong = (index) => {
    const updated = songs.filter((_, i) => i !== index);
    setSongs(updated);
    save("songs", updated);
  };

  // ======= Memories ======= //
  const [memoryDate, setMemoryDate] = useState("");
  const [memoryTitle, setMemoryTitle] = useState("");
  const [memoryDesc, setMemoryDesc] = useState("");
  const [memoryImg, setMemoryImg] = useState("");

  const addMemory = (e) => {
    e.preventDefault();
    if (!memoryDate || !memoryTitle.trim() || !memoryDesc.trim()) return;
    const updated = [
      ...memories,
      {
        date: memoryDate,
        title: memoryTitle.trim(),
        description: memoryDesc.trim(),
        imageUrl: memoryImg.trim(),
      },
    ];
    setMemories(updated);
    save("memories", updated);
    setMemoryDate("");
    setMemoryTitle("");
    setMemoryDesc("");
    setMemoryImg("");
  };

  const removeMemory = (index) => {
    const updated = memories.filter((_, i) => i !== index);
    setMemories(updated);
    save("memories", updated);
  };

  const sortedMemories = [...memories].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // ======= Clear All Data ======= //
  const clearAllData = () => {
    if (
      window.confirm(
        "Are you sure? This will delete all our saved memories from this browser."
      )
    ) {
      localStorage.clear();
      setAbout1("");
      setAbout2("");
      setNicknames([]);
      setPeriodEntries([]);
      setSongs([]);
      setMemories([]);
      alert("Cleared. Fresh start. (But real memories toh rehengi hi 🥺)");
    }
  };

  // ======= JSX ======= //
  return (
    <>
      {/* Lock Screen */}
      {!unlocked && (
        <div id="lock-screen">
          <div className="lock-card">
            <h1 className="logo">Our Little World 💕</h1>
            <p>Enter our secret passcode:</p>
            <input
              type="password"
              value={passInput}
              onChange={(e) => setPassInput(e.target.value)}
              onKeyDown={handlePassKeyDown}
              placeholder="••••••"
            />
            <button onClick={handleUnlock}>Unlock</button>
            <p className="hint">Hint: Change passcode in App.jsx</p>
            {lockError && <p className="error-text">{lockError}</p>}
          </div>
        </div>
      )}

      {/* Main App */}
      <div id="app" className={!unlocked ? "hidden" : ""}>
        <header>
          <h1 className="logo">Us Forever ❤️</h1>
          <p className="subtitle">A tiny place made just for two of us.</p>
          <nav>
            <a href="#about-us">About Us</a>
            <a href="#nicknames">Nicknames</a>
            <a href="#period-tracker">Period</a>
            <a href="#music">Fav Music</a>
            <a href="#memories">Memories</a>
          </nav>
        </header>

        <main>
          {/* About Us */}
          <section id="about-us" className="card">
            <h2>About Us ✨</h2>
            <p className="section-subtitle">
              Write what you feel about each other in your own words.
            </p>
            <div className="two-column">
              <div className="about-box">
                <h3>What {PARTNER2_NAME} feel about {PARTNER1_NAME}</h3>
                <textarea
                  value={about1}
                  onChange={(e) => setAbout1(e.target.value)}
                  placeholder="Write from your heart..."
                />
                <button onClick={handleSaveAbout1}>Save</button>
              </div>
              <div className="about-box">
                <h3>What {PARTNER1_NAME} feel about {PARTNER2_NAME}</h3>
                <textarea
                  value={about2}
                  onChange={(e) => setAbout2(e.target.value)}
                  placeholder="Write from your heart..."
                />
                <button onClick={handleSaveAbout2}>Save</button>
              </div>
            </div>
          </section>

          {/* Nicknames */}
          <section id="nicknames" className="card">
            <h2>Our Cute Nicknames 🐻</h2>
            <form className="form-inline" onSubmit={addNickname}>
              <input
                type="text"
                placeholder="e.g. Motu, Bacha, Chipmunk..."
                value={nicknameInput}
                onChange={(e) => setNicknameInput(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="For whom? (e.g. Her/Him/Baby)"
                value={nicknameFor}
                onChange={(e) => setNicknameFor(e.target.value)}
              />
              <button type="submit">Add Nickname</button>
            </form>
            <ul className="tag-list">
              {nicknames.map((item, index) => (
                <li key={index}>
                  <span>{item.name}</span>
                  {item.forWhom && (
                    <span className="tag-for">({item.forWhom})</span>
                  )}
                  <button
                    type="button"
                    className="tag-remove"
                    onClick={() => removeNickname(index)}
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* Period Tracker */}
          <section id="period-tracker" className="card">
            <h2>Period Tracker 🌸</h2>
            <p className="section-subtitle">
              So that I always care for you, understand your mood, and never
              forget.
            </p>
            <form className="form-inline" onSubmit={addPeriodEntry}>
              <label>
                Start Date:
                <input
                  type="date"
                  value={periodDate}
                  onChange={(e) => setPeriodDate(e.target.value)}
                  required
                />
              </label>
              <input
                type="text"
                placeholder="Notes (cravings, mood, pain level etc.)"
                value={periodNotes}
                onChange={(e) => setPeriodNotes(e.target.value)}
              />
              <button type="submit">Add Entry</button>
            </form>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPeriods.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.date}</td>
                      <td>
                        {entry.notes}
                        <button
                          type="button"
                          className="tag-remove"
                          title="Delete"
                          onClick={() => removePeriodEntry(index)}
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Music */}
          <section id="music" className="card">
            <h2>Our Favourite Music 🎧</h2>
            <form className="form-inline" onSubmit={addSong}>
              <input
                type="text"
                placeholder="Song name"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Artist"
                value={songArtist}
                onChange={(e) => setSongArtist(e.target.value)}
              />
              <input
                type="url"
                placeholder="YouTube / Spotify link (optional)"
                value={songLink}
                onChange={(e) => setSongLink(e.target.value)}
              />
              <button type="submit">Add Song</button>
            </form>
            <ul className="music-list">
              {songs.map((song, index) => (
                <li key={index} className="music-item">
                  <div className="music-info">
                    <span>{song.title}</span>
                    {song.artist && " • " + song.artist}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    {song.link && (
                      <a
                        href={song.link}
                        target="_blank"
                        rel="noreferrer"
                        className="music-link"
                      >
                        Play
                      </a>
                    )}
                    <button
                      type="button"
                      className="tag-remove"
                      onClick={() => removeSong(index)}
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Memories */}
          <section id="memories" className="card">
            <h2>Our Memories 📸</h2>
            <form className="form-vertical" onSubmit={addMemory}>
              <input
                type="date"
                value={memoryDate}
                onChange={(e) => setMemoryDate(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Title (e.g. First Date, First Trip)"
                value={memoryTitle}
                onChange={(e) => setMemoryTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="What happened? What did you feel?"
                value={memoryDesc}
                onChange={(e) => setMemoryDesc(e.target.value)}
                required
              />
              <input
                type="url"
                placeholder="Image URL (optional)"
                value={memoryImg}
                onChange={(e) => setMemoryImg(e.target.value)}
              />
              <button type="submit">Add Memory</button>
            </form>
            <div className="memory-timeline">
              {sortedMemories.map((m, index) => (
                <div key={index} className="memory-card">
                  <div>
                    <div className="memory-header">
                      <span>{m.title}</span>
                      <span className="memory-date">{m.date}</span>
                    </div>
                    <p className="memory-description">{m.description}</p>
                    <button
                      type="button"
                      className="tag-remove"
                      title="Delete memory"
                      onClick={() => removeMemory(index)}
                    >
                      ×
                    </button>
                  </div>
                  {m.imageUrl && (
                    <img
                      src={m.imageUrl}
                      alt={m.title}
                      className="memory-image"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer>
          <p>Made with ❤️ just for us.</p>
          <button className="danger-btn" onClick={clearAllData}>
            Clear All Data (be careful)
          </button>
        </footer>
      </div>
    </>
  );
}

export default App;
