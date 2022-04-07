const axios = require('axios')
const mode = 'prod'
const APIEndpoint = mode === "dev" ? process.env.REACT_APP_API_ENDPOINT : ''

export async function checkWordInDictionary(word) {
   try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      return response.status === 200 ? true : false;
   } catch (err) {
      console.log("err", err)
      return false;
   }
}

// export async function wordOfTheDay() {
//    // const response = await axios.get('https://random-words-api.vercel.app/word')
//    // return response.data[0]?.word
// }

export async function fetchAllCategories() {
   const response = await axios.get(`${APIEndpoint}/api/categories`)
   return response.data.categories
}

export async function wordOfTheDay(category) {
   const response = await axios.get(`${APIEndpoint}/api/word/${category}`)
   return response.data.words;
}

export async function hitCount() {
   const response = await axios.get(`${APIEndpoint}/api/hit`)
   return response.data.words;
}

export async function fetchLeaderboard() {
   const response = await axios.get(`${APIEndpoint}/api/leaderboard`)
   if (response.data.status === 'Success')
      return response.data.data;
   else
      return []
}

export async function InsertIntoBoard(name, category, time) {
   const response = await axios.post(`${APIEndpoint}/api/leaderboard`, { name, category, time })
   return response;
}
