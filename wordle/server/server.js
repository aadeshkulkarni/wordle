const fs = require('fs');
const express = require('express');
const cors = require('cors')

const wordsList = require('./wordList');

const app = express();

const textIn = JSON.parse(fs.readFileSync('./config.json', 'utf-8'))
const today = new Date().toLocaleDateString();


const fetchTodaysWord = async () => {
   const word  = fetchRandomWords()
   if (textIn.date !== today || textIn.wordOfTheDay !== '') {
      fs.writeFileSync('./config.json', `{
      "date": "${new Date().toLocaleDateString()}",
      "wordOfTheDay": "${word}"
   }`)
   }
   return word;
}

const fetchRandomWords = () => {
   const word = wordsList[Math.floor(Math.random() * wordsList.length)]
   return word;
}

app.use(cors())

app.get('/', async (req, res) => {
   if (textIn.date === today && textIn.wordOfTheDay !== '') {
      res.status(200).send({
         words: textIn.wordOfTheDay,
         status: 'success'
      })
   }
   else {
      let word = await fetchTodaysWord()
      if (word) {
         res.status(200).send({
            words: word,
            status: 'success'
         })
      }
      else {
         res.status(404).send({
            error: 'Error finding word',
            status: 'error'
         })
      }
   }
})

app.listen(4000, () => {
   console.log("SERVER STARTED AT PORT 4000")
});