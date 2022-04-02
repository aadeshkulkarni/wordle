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
      const word = CryptoAES.decrypt(response, process.env.REACT_APP_ENCRYPT_KEY).toString(CryptoENC);
      setWord(word.toUpperCase());
    }
    fetchWordOfTheDay()
  }, [])

  useEffect(() => {
    setColumn(currentWord.length)
  }, [currentWord])

  useEffect(() => {
    if ((row === 5) && (currentWord.toUpperCase() !== word.toUpperCase())) {
      setGameStatus(word)
    }
  }, [row])

  const onEnter = async () => {
    if (currentWord.length === 5) {
      const response = await checkWordInDictionary(currentWord)
      //failure sucess scenarios
      if (response) {
        setRow(row => row + 1)
        if (currentWord === word) {
          setGameStatus("Genius!")
          setCurrentWord("")
        }
      }
      else {
        await setGameStatus("Word not found")
        setTimeout(() => {
          setGameStatus("")
        }, 4000)
      }
      setCurrentWord("")
    }
  }


  //optimize common function
  const onBackspace = () => {
    let word = currentWord.slice(0, -1);
    if (word.length >= 0) {
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

  const getClassForBox = (boxCharacter, rowIndex, colIndex, currentRow, currentWord) => {
    let className;
    if (rowIndex < currentRow && currentWord) {

      if (boxCharacter.toUpperCase() === word?.charAt(colIndex).toUpperCase()) {
        className = 'exact-match'
      }
      else if (word.indexOf(boxCharacter) != -1) {
        className = "partial-match"
      }
      else {
        className = 'no-match'
      }
    }
    return className;
  }

  const getColorForAlphabet = (alphabet) => {

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5 && j < (row - 1); j++) {
        let character = userWords[i][j];
        if (character === alphabet && word.indexOf(alphabet) === j) {
          return 'exact-match'
        }
        else if (character === alphabet) {
          return 'partial-match'
        }
      }
    }
    return ''
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: "100%" }}>
      <Header />
      <div className="status">
        <h1 style={{ textAlign: "center" }}>{gameStatus}</h1>
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", flex: 1 }}>
        <div style={{ maxWidth: "500px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "0.5rem", marginBottom: "0.5rem" }}>
          {userWords.map((_, rowIndex) => userWords.map((_, columnIndex) => <div key={`${rowIndex}${columnIndex}`} className={`box ${getClassForBox(userWords[rowIndex][columnIndex], rowIndex, columnIndex, row, word)}`}>{userWords[rowIndex][columnIndex]}</div>))}
        </div>
      </div>
      <Footer onEnter={onEnter} onAlphabetClick={onAlphabetClick} onBackspace={onBackspace} getColorForAlphabet={getColorForAlphabet} />
    </div>
  );
}

export default App;
