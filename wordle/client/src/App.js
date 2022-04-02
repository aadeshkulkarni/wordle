import { useEffect, useState } from 'react';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import { checkWordInDictionary, wordOfTheDay } from "./network/words"
const CryptoAES = require('crypto-js/aes')
const CryptoENC = require('crypto-js/enc-utf8')


function App() {

  const [gameStatus, setGameStatus] = useState("")
  const [word, setWord] = useState()
  const [userWords, setUserWords] = useState([
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', '']
])
  const [row, setRow] = useState(0)
  const [column, setColumn] = useState(0)
  const [currentWord, setCurrentWord] = useState("")

  useEffect(() => {
    async function fetchWordOfTheDay() {
      const response = await wordOfTheDay()
      setWord(CryptoAES.decrypt(response, process.env.REACT_APP_ENCRYPT_KEY).toString(CryptoENC));
    }
    fetchWordOfTheDay()
  }, [])

  useEffect(() => {
    setColumn(currentWord.length)
  },[currentWord])

  const onEnter = async () => {
    if (currentWord.length === 5) {
      const response = await checkWordInDictionary(currentWord)
      //failure sucess scenarios
      if (response) {
        setRow(row => row + 1)
        if(currentWord === word){
          alert("You have guessed the word")
        }
      }
      else {
        alert("Word not found")
      }
      setCurrentWord("")
    }
  }


  //optimize common function
  const onBackspace = () => {
    let word  = currentWord.slice(0, -1);
    if(word.length >= 0){
      let wordsClone = [...userWords]
      wordsClone[row][column - 1] = ''
      setUserWords(wordsClone)
      setCurrentWord(word)
    } 
  }

  const onAlphabetClick = (character) => {
    let newWord = currentWord + character;
    if (newWord.length <= 5) {
      setCurrentWord(newWord);
      let wordsClone = [...userWords]
      wordsClone[row][column] = character
      setUserWords(wordsClone)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: "100%" }}>
      <Header />
      <div>
      <h1 style={{ textAlign: "center" }}>{currentWord}</h1>
        <h1 style={{ textAlign: "center" }}>{gameStatus}</h1>
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", flex: 1 }}>
        <div style={{ maxWidth: "500px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "0.5rem", marginBottom: "0.5rem" }}>
          {userWords.map((_, rowIndex) => userWords.map((_, columnIndex) => <div key={`${rowIndex}${columnIndex}`} className="box">{userWords[rowIndex][columnIndex]}</div>))}
        </div>
      </div>
      <Footer onEnter={onEnter} onAlphabetClick={onAlphabetClick} onBackspace={onBackspace} />
    </div>
  );
}

export default App;
