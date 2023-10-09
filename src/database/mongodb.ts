import { MongoClient } from 'mongodb'
import { config } from 'dotenv'

config() // Starting dotenv

const uri = process.env.MONGO_DB_SECRET
const client = new MongoClient(uri) // starting mongodb


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