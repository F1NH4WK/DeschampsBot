import { MongoClient } from 'mongodb'
import { config } from 'dotenv'

config() // Starting dotenv

const uri = process.env.MONGO_DB_SECRET
const client = new MongoClient(uri) // starting mongodb

export async function insertIntoDB(GUILD_ID, CHANNEL_ID){

    await client.connect()
    const db = client.db('Servers')
    const GUILD_DB = db.collection(GUILD_ID)
    
    const doc = {
        CHANNEL_ID: CHANNEL_ID
    }

    await GUILD_DB.insertOne(doc)
    await client.close()
    
}

export async function removeFromDB(GUILD_ID){

    await client.connect()

}

export async function getAllServers(){ // THIS IS GOING TO NEED A PERFORMANCE UPDATE

    await client.connect()

}

async function run(){
    try {

        await client.connect()
        const servers = await client.db('Servers').collections() // Listing all servers

        }
    catch(ex){
        console.log(ex)
    }
    finally{
        await client.close();
    }
}