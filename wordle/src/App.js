import { useState } from 'react';
import './App.css';
import Footer from './Footer';
import Header from './Header';

function App() {

  const [gameStatus, setGameStatus] = useState("")
  const [word, setWord] = useState("BRAVE")
  const [userWords, setUserWords] = useState([])
  const [currentWord, setCurrentWord] = useState("")

  const onEnter = () => {
    console.log(currentWord)
    if (currentWord.length === 5) {
      let newList = [...userWords, currentWord]
      setUserWords([...newList])
      setCurrentWord("")
    }
  }

  const onBackspace=()=>{
    setCurrentWord(currentWord.slice(0, -1));
  }

  const onAlphabetClick = (character) => {
    let newWord = currentWord + character;
    setCurrentWord(newWord);
  }

  return (
    <div style={{ position: "relative", minHeight: "100%" }}>
      <Header />
      <div>
        <h1 style={{ textAlign: "center" }}>{currentWord}</h1>
        <h1 style={{ textAlign: "center" }}>{gameStatus}</h1>
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", }}>
        <div style={{ maxWidth: "500px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <div className="box">{userWords[0] && userWords[0].charAt(0)}</div>
          <div className="box">{userWords[0] && userWords[0].charAt(1)}</div>
          <div className="box">{userWords[0] && userWords[0].charAt(2)}</div>
          <div className="box">{userWords[0] && userWords[0].charAt(3)}</div>
          <div className="box">{userWords[0] && userWords[0].charAt(4)}</div>
        </div>
        <div style={{ maxWidth: "500px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <div className="box">{userWords[1] && userWords[1].charAt(0)}</div>
          <div className="box">{userWords[1] && userWords[1].charAt(1)}</div>
          <div className="box">{userWords[1] && userWords[1].charAt(2)}</div>
          <div className="box">{userWords[1] && userWords[1].charAt(3)}</div>
          <div className="box">{userWords[1] && userWords[1].charAt(4)}</div>
        </div>
        <div style={{ maxWidth: "500px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <div className="box">{userWords[2] && userWords[2].charAt(0)}</div>
          <div className="box">{userWords[2] && userWords[2].charAt(1)}</div>
          <div className="box">{userWords[2] && userWords[2].charAt(2)}</div>
          <div className="box">{userWords[2] && userWords[2].charAt(3)}</div>
          <div className="box">{userWords[2] && userWords[2].charAt(4)}</div>
        </div>
        <div style={{ maxWidth: "500px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <div className="box">{userWords[3] && userWords[3].charAt(0)}</div>
          <div className="box">{userWords[3] && userWords[3].charAt(1)}</div>
          <div className="box">{userWords[3] && userWords[3].charAt(2)}</div>
          <div className="box">{userWords[3] && userWords[3].charAt(3)}</div>
          <div className="box">{userWords[3] && userWords[3].charAt(4)}</div>
        </div>
        <div style={{ maxWidth: "500px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <div className="box">{userWords[4] && userWords[4].charAt(0)}</div>
          <div className="box">{userWords[4] && userWords[4].charAt(1)}</div>
          <div className="box">{userWords[4] && userWords[4].charAt(2)}</div>
          <div className="box">{userWords[4] && userWords[4].charAt(3)}</div>
          <div className="box">{userWords[4] && userWords[4].charAt(4)}</div>
        </div>
      </div>
      <Footer onEnter={onEnter} onAlphabetClick={onAlphabetClick} onBackspace={onBackspace} />
    </div>
  );
}

export default App;
