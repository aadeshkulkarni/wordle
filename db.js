const { MongoClient } = require("mongodb");
const uri =`mongodb+srv://wordle:wordle2022@wordle.jhm7z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
const moment = require('moment')

async function fetchword(category, date) {
    try {
        await client.connect();
        const database = client.db('wordle');
        const words = database.collection('words');
        const query = { category, date };
        const selection = { wordOfTheDay: 1 }
        const word = await words.findOne(query, { projection: selection })
        if (word?.wordOfTheDay) {
            return word?.wordOfTheDay;
        }
        return;
    }
    catch (er) {
        console.log(er)
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}

async function insertWordIntoDB(category, date, wordOfTheDay) {
    try {
        await client.connect();
        const database = client.db('wordle');
        const words = database.collection('words');
        const doc = {
            category,
            date,
            wordOfTheDay
        }
        const result = await words.insertOne(doc);
        return result;
    }
    catch (er) {
        console.log(er)
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}

async function hitCounter() {
    try {
        await client.connect();
        const database = client.db('wordle');
        const hits = database.collection('hits');
        await hits.updateOne(
            { cId: "V1" },
            { $inc: { "count": 1 } }
        )
    } catch (er) {
        console.log(er)
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}

async function getLeaderBoardData() {
    try {
        await client.connect();
        const database = client.db('wordle');
        const leaderboard = database.collection('leaderboard');
        const dateToday = moment().format('DD-MM-YYYY')
        const data = await leaderboard.find({ date: dateToday}, { name: 1}).sort({time: 1}).limit(10).toArray();;
        return data;
    } catch (er) {
        console.log(er)
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}

async function setLeaderBoardData(data){
    try {
        const dateToday = moment().format('DD-MM-YYYY')
        await client.connect();
        const database = client.db('wordle');
        const words = database.collection('leaderboard');
        const doc = {
            name:data.name,
            category: data.category,
            date:dateToday,
            time:data.time,
        }
        const result = await words.insertOne(doc);
        return result;
    }
    catch (er) {
        console.log(er)
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}




module.exports = { fetchword, hitCounter, insertWordIntoDB,getLeaderBoardData,setLeaderBoardData }