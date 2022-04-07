const fs = require('fs');
const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
const CryptoAES = require('crypto-js/aes')
const wordsList = require('./wordList');
const path = require('path')
const { hitCounter, fetchword, insertWordIntoDB, getLeaderBoardData, setLeaderBoardData } = require('./db');

const port = process.env.PORT || 4000
const host = process.env.HOST || '0.0.0.0'
const app = express();
app.use(cors())
app.use(express.json());
dotenv.config();

const fetchTodaysWord = async (category) => {

   const today = new Date().toLocaleDateString();
   let wordOfTheDay = await fetchword(category, today);
   if (!wordOfTheDay) {
      const word = fetchRandomWords(category);
      const response = await insertWordIntoDB(category, today, word)
      wordOfTheDay = word;
   }
   return wordOfTheDay;
}

const fetchRandomWords = (category) => {
   const list = wordsList[0][category].filter(word => word.length === 5);
   const word = list[Math.floor(Math.random() * list.length)]
   return CryptoAES.encrypt(word, process.env.ENCRYPT_KEY).toString()
}

app.get('/api/word/:category', async (req, res) => {
   const categorySelected = req.params.category;
   const today = new Date().toLocaleDateString();
   const wordOfTheDay = await fetchword(categorySelected, today);
   if (wordOfTheDay) {

      res.status(200).send({
         words: wordOfTheDay,
         status: 'success'
      })
   }
   else {
      let word = await fetchTodaysWord(categorySelected)
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


app.get('/api/categories', async (req, res) => {
   try {
      const categories = Object.keys(wordsList[0]);

      res.status(200).send({
         categories: categories,
         status: 'success'
      })
   }
   catch {
      res.status(500).send({
         error: 'Something Went Wrong!',
         status: 'error'
      })
   }
})

app.get('/api/leaderboard', async (req, res) => {
   try {
      const data = await getLeaderBoardData()
      res.status(200).send({
         status: 'Success',
         data: data,
      })
   }
   catch (ex) {
      res.status(500).send({
         error: `Error: ${ex}`,
         status: 'error'
      })
   }
})

app.post('/api/leaderboard', async (req, res) => {
   try {

      const timer = req.body.time;
      const data = await getLeaderBoardData()
      if (data.length < 10 || data[9].time > timer) {
         const { name, category, time } = req?.body;
         await setLeaderBoardData({ name, category, time: Number(time || 0) })
         res.status(200).send({
            status: 'Success',
            message: 'data inserted successfully',
            data: data,
            reshuffled: true,
         })
      }
      else {
         res.status(200).send({
            status: 'Success',
            data: data,
            reshuffled: false,
         })
      }
   }
   catch (ex) {
      res.status(500).send({
         error: `Error: ${ex}`,
         status: 'error'
      })
   }
})

app.get('/api/hit', async (req, res) => {
   try {
      await hitCounter()
      res.status(200).send('Hit recorded successfully')
   }
   catch (ex) {
      res.status(502).send({
         error: `Error: ${ex}`,
         status: 'error'
      })
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
