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

}

export async function getAllServers(){ // THIS IS GOING TO NEED A PERFORMANCE UPDATE

    await client.connect()

}