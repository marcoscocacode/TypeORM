require('dotenv').config()
import { createConnection } from 'typeorm'
import { Banker } from './entities/Banker'
import { Client } from './entities/Client'
import { Transaction } from './entities/Transaction'


const main = async () => {
  try{
    await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.PASSWORD,
      database: 'TypeORM',
      entities: [Client, Banker, Transaction],
      synchronize: true // Atualiza todos os dados novos nas Tables.
    })
    console.log("Connected to Postgres!")
  } catch (error) {
    console.log(error)
    throw new Error('Unable to connect to db')
  }
}

main()