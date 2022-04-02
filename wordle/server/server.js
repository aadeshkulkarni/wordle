const fs = require('fs');
const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
const CryptoAES = require('crypto-js/aes')

const wordsList = require('./wordList');
const filePath = './config.json'

const app = express();
app.use(cors())
dotenv.config();


let fileContents;
if (fs.existsSync(filePath)) {
   fileContents = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

const fetchTodaysWord = async () => {
   const word = fetchRandomWords();
   const today = new Date().toLocaleDateString();
   if (fileContents?.date !== today || fileContents?.wordOfTheDay !== '') {
      fs.writeFileSync(filePath, `{
      "date": "${new Date().toLocaleDateString()}",
      "wordOfTheDay": "${word}"
   }`)
   }
   return word;
}

const fetchRandomWords = () => {
   const list = wordsList.filter(word => word.length === 5);
   const word = list[Math.floor(Math.random() * list.length)]
   return CryptoAES.encrypt(word, process.env.ENCRYPT_KEY).toString()
}

app.get('/', async (req, res) => {
   const today = new Date().toLocaleDateString();
   if (fileContents?.date === today && fileContents?.wordOfTheDay !== '') {
      res.status(200).send({
         words: fileContents.wordOfTheDay,
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

process.on('unhandledRejection', err => {
   console.log('Uncaught Exception..shutting down')
   console.log(err.name, err.message)
   process.exit(1)
})
