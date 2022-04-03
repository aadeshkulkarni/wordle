import { useEffect, useState } from 'react';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import Help from './Help';
import Category from './Category';
import { checkWordInDictionary, wordOfTheDay, hitCount } from "./network/words"
import Statistics from './Statistics';
const CryptoAES = require('crypto-js/aes')
const CryptoENC = require('crypto-js/enc-utf8')


function App() {
  const [loader, setLoader] = useState(false)
  const LSData = getLocalStorage(new Date().toLocaleDateString())
  const [category, setCategory] = useState(LSData?.category ? LSData?.category : '')
  const [showHelp, setHelpStatus] = useState(LSData?.showHelp ? LSData?.showHelp : false)
  const [stats, setStats] = useState(LSData?.stats || {})
  const [statStatus, setStatStatus] = useState(LSData?.statStatus ? LSData?.statStatus : false)
  const [gameStatus, setGameStatus] = useState(LSData?.gameStatus || "")
  const [gameOver, setGameOver] = useState(LSData?.gameOver ? LSData?.gameOver : false)
  const [word, setWord] = useState(LSData?.word || '')
  const [userWords, setUserWords] = useState(LSData?.userWords || [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ])
  const [row, setRow] = useState(LSData?.row ? LSData?.row : 0)
  const [column, setColumn] = useState()
  const [currentWord, setCurrentWord] = useState("")

  const onCategorySelectHandler = (e) => {
    setCategory(e.target.dataset.categoryName)
  }

  useEffect(() => {
    if (!localStorage.getItem('played')) {
      setHelpStatus(true)
    }
    setStatistics(0, 0);
    async function fetchWordOfTheDay() {
      const response = await wordOfTheDay(category)
      const word = CryptoAES.decrypt(response, process.env.REACT_APP_ENCRYPT_KEY).toString(CryptoENC);
      setWord(word.toUpperCase());
    }
    if(category){
      fetchWordOfTheDay()
    }
    hitCount()
  }, [category])

  useEffect(() => {
    if(currentWord){
      setColumn(currentWord.length)
    }
    else{
      setColumn(0)
    }
   
  }, [currentWord])

  useEffect(() => {
    if ((row === 5) && (currentWord.toUpperCase() !== word.toUpperCase())) {
      setGameStatus(word)
      setStatistics(1, 0)
    }
  }, [row])

  const onEnter = async () => {
    if(!gameOver){
      setLoader(true)
      const key = new Date().toLocaleDateString()
      let obj = {
        showHelp,
        stats,
        statStatus,
        gameStatus,
        word,
        row,
        userWords,
        // column,
        // currentWord,
        gameOver,
        category
      }
  
      if (!gameOver) {
        if ("vibrate" in navigator) {
          // vibration API supported
        }
        if (currentWord.length === 5) {
          const response = await checkWordInDictionary(currentWord)
          //failure sucess scenarios
          if (response) {
            obj.row = row + 1;
            setRow(row => row + 1)
            if (currentWord === word) {
              navigator.vibrate([100, 100, 100]);
              setGameStatus("Genius!")
              setGameOver(true)
              setStatistics(1, 1)
              obj.gameOver = true
            } else if (row === 5) {
              setStatistics(1, 0)
              setGameOver(true)
              obj.gameOver = true
            }
            setCurrentWord("")
          }
          else {
            navigator.vibrate(300);
            setGameStatus("Word not found")
            setGameOver(false)
            obj.gameOver = false
            setTimeout(() => {
              setGameStatus("")
            }, 4000)
          }
          setLocalStorage(key, obj);
        }
      }
      setLoader(false)
    }
  }

  function setLocalStorage(key, value) {
    const obj = CryptoAES.encrypt(JSON.stringify(value), process.env.REACT_APP_ENCRYPT_KEY).toString();
    localStorage.setItem(key, obj)
  }
  function getLocalStorage(key) {
    const obj = localStorage.getItem(key)
    let value;
    if (obj) {
      value = JSON.parse(CryptoAES.decrypt(obj, process.env.REACT_APP_ENCRYPT_KEY).toString(CryptoENC));
    }

    return value;
  }

  function setStatistics(hasPlayed, hasWon) {
    let streak = localStorage.getItem('streak') || 0;
    let maxStreak = localStorage.getItem('maxStreak') || 0;
    let played = localStorage.getItem('played') || 0;
    let won = localStorage.getItem('won') || 0;
    let winPercentage
    if (hasPlayed) {
      played++;
      localStorage.setItem('played', played);
      if (hasWon) {
        won++;
        streak++;
        if (streak > maxStreak) {
          maxStreak = streak;
          localStorage.setItem('maxStreak', maxStreak);
        }
        localStorage.setItem('streak', streak);
        localStorage.setItem('won', won);
      }
    }
    winPercentage = (won === 0 && played === 0) ? 0 : Math.ceil(won * 100 / played)

    setStats({
      streak, maxStreak, played, won, winPercentage
    })
  }

  const onBackspace = () => {
    if (currentWord.length > 0 && !gameOver) {
      if (!gameOver) {
        if ("vibrate" in navigator) {
          // vibration API supported
          navigator.vibrate(100);
        }
        let word = currentWord.slice(0, -1);
        if (word.length >= 0) {
          let wordsClone = [...userWords]
          wordsClone[row][column - 1] = ''
          setUserWords(wordsClone)
          setCurrentWord(word)
        }
      }
    }
  }

  const onAlphabetClick = (character) => {
    if (!gameOver) {
      if ("vibrate" in navigator) {
        // vibration API supported
        navigator.vibrate(50);
      }
      let newWord = currentWord + character;
      if (newWord.length <= 5) {
        setCurrentWord(newWord);
        let wordsClone = [...userWords]
        wordsClone[row][column] = character
        setUserWords(wordsClone)
      }
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
    let className = ''
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < 5; j++) {
        let character = userWords[i][j];
        if (character === alphabet && word.charAt(j) == alphabet) {
          className = 'exact-match-outline'
          return className;
        }
        else if (character === alphabet && (word.indexOf(alphabet) !== -1) && (word.indexOf(alphabet) !== j)) {
          className = 'partial-match-outline'
        }
        else if (character === alphabet) {
          className = 'no-match-outline'
        }
      }
    }
    return className
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: "100%", overflow: "hidden" }}>
      {showHelp ? <Help setHelpStatus={setHelpStatus} /> : statStatus ? <Statistics stats={stats} setStatStatus={setStatStatus} /> : !category ?
        <Category onCategorySelectHandler={onCategorySelectHandler} /> : (<>
          <Header setHelpStatus={setHelpStatus} setStatStatus={setStatStatus} />
          <div className="status">
            {loader && (<h2>Checking ...</h2>)}
            <h2 style={{ textAlign: "center", fontWeight: "300" }}>{gameStatus}</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", flex: 1 }}>
            <div style={{ maxWidth: "500px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "0.5rem", marginBottom: "0.5rem" }}>
              {userWords.map((_, rowIndex) => userWords.map((_, columnIndex) => <div key={`${rowIndex}${columnIndex}`} className={`box col-${columnIndex} ${getClassForBox(userWords[rowIndex][columnIndex], rowIndex, columnIndex, row, word)}`}>{userWords[rowIndex][columnIndex]}</div>))}
            </div>
          </div>
          <Footer onEnter={onEnter} onAlphabetClick={onAlphabetClick} onBackspace={onBackspace} getColorForAlphabet={getColorForAlphabet} />
        </>)}
    </div>
  );
}

export default App;
