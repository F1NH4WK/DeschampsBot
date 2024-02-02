import { MongoClient } from 'mongodb'
import { config } from 'dotenv'
import logger from '../log/logger.js'

config() // Starting dotenv

const uri = process.env.MONGO_DB_SECRET
const client = new MongoClient(uri) // starting mongodb

export async function insertIntoDB(GUILD_ID, CHANNEL_ID){

    try{
        await client.connect()
        const db = client.db('Servers')
        const GUILD_DB = db.collection(GUILD_ID)

        const doc = {
            CHANNEL_ID: CHANNEL_ID
        }

        await GUILD_DB.deleteMany({}) // Deleting eventuals channels, if so
        await GUILD_DB.insertOne(doc)

        logger.info(`A guilda ${GUILD_ID} teve o canal ${CHANNEL_ID} adicionado!`)
        await client.close()

        return true
    }
    catch (err){
       return err
    }
    
}

export async function removeFromDB(GUILD_ID){

    await client.connect()

    const db = client.db('Servers')
    await db.collection(GUILD_ID).drop()
    return console.log(`${GUILD_ID} retira com sucesso!`)
}

export async function getAllChannels(){ 
    await client.connect()
    
    const db = client.db('Servers')
    const collections = await db.listCollections().toArray()
    const sendInfo = []

    for (const collection of collections){
        const guild_id = collection.name
        let channel_id = await db.collection(guild_id).findOne({})
        channel_id = channel_id.CHANNEL_ID

        sendInfo.push([ channel_id, guild_id ])
    }

    await client.close()

    return sendInfo
}