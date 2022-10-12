require('dotenv').config()
import express from 'express'
import { createConnection } from 'typeorm'
import { Banker } from './entities/Banker'
import { Client } from './entities/Client'
import { Transaction } from './entities/Transaction'
import { fecthClientRouter } from './routes/fetch_clients'
import { createBankerRouter } from './routes/create_banker'
import { createClientRouter } from './routes/create_client'
import { deleteLClientRouter } from './routes/delete_client'
import { createTransactionRouter } from './routes/create_transaction'
import { connectBankerClientRouter } from './routes/connect_banker_client'

const app = express()

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

    app.use(express.json())
    app.use(fecthClientRouter)
    app.use(createClientRouter)
    app.use(createBankerRouter)
    app.use(deleteLClientRouter)
    app.use(createTransactionRouter)
    app.use(connectBankerClientRouter)

    app.listen(8080, () => {
      console.log("Now running on port 8080")
    } )
  } catch (error) {
    console.log(error)
    throw new Error('Unable to connect to database')
  }
}

main()