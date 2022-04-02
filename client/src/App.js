import { useEffect, useState } from 'react';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import Help from './Help';
import { checkWordInDictionary, wordOfTheDay } from "./network/words"
import Statistics from './Statistics';
const CryptoAES = require('crypto-js/aes')
const CryptoENC = require('crypto-js/enc-utf8')


function App() {
  const LSData=JSON.parse(localStorage.getItem(new Date().toLocaleDateString()))
  const [showHelp, setHelpStatus] = useState(LSData?.showHelp ? LSData?.showHelp : false)
  const [stats, setStats] = useState(LSData?.stats || {})
  const [statStatus,setStatStatus]=useState(LSData?.statStatus ? LSData?.statStatus : false)
  const [gameStatus, setGameStatus] = useState(LSData?.gameStatus || "")
  const [word, setWord] = useState(LSData?.word || '')
  const [userWords, setUserWords] = useState(LSData?.userWords || [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ])
  const [row, setRow] = useState(LSData?.row ?LSData?.row : 0)
  const [column, setColumn] = useState(LSData?.column?LSData?.column: 0)
  const [currentWord, setCurrentWord] = useState(LSData?.currentWord || "")

  useEffect(() => {
    setStatistics(0,0);
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
      setStatistics(1,0)
    }
  }, [row])

  const onEnter = async () => {
    if (currentWord.length === 5) {
      const response = await checkWordInDictionary(currentWord)
      //failure sucess scenarios
      if (response) {
        const key=new Date().toLocaleDateString()
        const value={
          showHelp,
          stats,
          statStatus,
          gameStatus,
          word,
          userWords,
          row,
          column,
          currentWord
        }
        localStorage.setItem(key,JSON.stringify(value))
        setRow(row => row + 1)
        if (currentWord === word) {
          setGameStatus("Genius!")
          setStatistics(1,1)
        }else if(row ===5){
          setStatistics(1,0)
        }
        setCurrentWord("")
      }
      else {
        await setGameStatus("Word not found")
        setTimeout(() => {
          setGameStatus("")
        }, 4000)
      }

    }
  }

  function setStatistics(hasPlayed,hasWon) {
    let streak = localStorage.getItem('streak') || 0;
    let maxStreak = localStorage.getItem('maxStreak') || 0;
    let played = localStorage.getItem('played') || 0;
    let won = localStorage.getItem('won') || 0;
    let winPercentage 
    if(hasPlayed){
      played++;
      localStorage.setItem('played', played);
      if (hasWon) {
        won++;
        streak++;
        if(streak > maxStreak){
          maxStreak = streak;
          localStorage.setItem('maxStreak', maxStreak);
        }
        localStorage.setItem('streak', streak);
        localStorage.setItem('won', won);
      }
    }
    winPercentage = (won ===0 && played===0 ) ? 0 : Math.ceil(won * 100 / played)

    setStats({
      streak, maxStreak, played, won, winPercentage
    })
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

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < 5; j++) {
        let character = userWords[i][j];
        if (character === alphabet && word.indexOf(alphabet) === j) {
          return 'exact-match'
        }
        else if (character === alphabet && (word.indexOf(alphabet) !== -1) && (word.indexOf(alphabet) !== j)) {
          return 'partial-match'
        }
        else if (character === alphabet) {
          return 'no-match'
        }
      }
    }
    return ''
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: "100%" }}>
      {showHelp ? <Help setHelpStatus={setHelpStatus} /> : statStatus? <Statistics stats={stats} setStatStatus={setStatStatus} /> :(<>
        <Header setHelpStatus={setHelpStatus} setStatStatus={setStatStatus}/>
        <div className="status">
          {/* <h1>{word}</h1> */}
          <h1 style={{ textAlign: "center" }}>{gameStatus}</h1>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", flex: 1 }}>
          <div style={{ maxWidth: "500px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "0.5rem", marginBottom: "0.5rem" }}>
            {userWords.map((_, rowIndex) => userWords.map((_, columnIndex) => <div key={`${rowIndex}${columnIndex}`} className={`box ${getClassForBox(userWords[rowIndex][columnIndex], rowIndex, columnIndex, row, word)}`}>{userWords[rowIndex][columnIndex]}</div>))}
          </div>
        </div>
        <Footer onEnter={onEnter} onAlphabetClick={onAlphabetClick} onBackspace={onBackspace} getColorForAlphabet={getColorForAlphabet} />
      </>)}
    </div>
  );
}

export default App;
