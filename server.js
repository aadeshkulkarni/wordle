const fs = require('fs');
const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
const CryptoAES = require('crypto-js/aes')
const wordsList = require('./wordList');
const path = require('path')
const filePath = './config.json'

const port = process.env.PORT || 4000
const host = process.env.HOST || '0.0.0.0'
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
   if (fileContents?.date !== today || fileContents?.wordOfTheDay !== '' || true) {
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

app.get('/api/word', async (req, res) => {
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

app.get('/api/hit', async (req, res) => {
   try {
      let hitCounter;
      let hitPath = "./hitcount.json"
      if (fs.existsSync(hitPath)) {
         let obj = JSON.parse(fs.readFileSync(hitPath, 'utf-8'));
         hitCounter = +obj.count + 1;
         fs.writeFileSync(hitPath, `{ "count": ${hitCounter}}`);
      }
      res.status(200).send({ count: hitCounter })
   }
   catch (ex) {
      console.log(ex)
   }
})

if (process.env.NODE_ENV === 'production') {
   // Set a static folder
   app.use(express.static('client/build'))

   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   })
}

app.listen(port, host, () => {
   console.log(`SERVER STARTED AT ${host}:${port}`)
});

process.on('unhandledRejection', err => {
   console.log('Uncaught Exception..shutting down')
   console.log(err.name, err.message)
   process.exit(1)
})
