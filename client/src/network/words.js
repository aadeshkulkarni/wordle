const axios = require('axios')
const APIEndpoint = process.env.REACT_APP_API_ENDPOINT;

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
   const response = await axios.get('/api/categories')
   return response.data.categories
}

export async function wordOfTheDay(category) {
   const response = await axios.get(`/api/word/${category}`)
   return response.data.words;
}

export async function hitCount() {
   const response = await axios.get(`/api/hit`)
   return response.data.words;
}
