import express from "express"
import { Client } from "../entities/Client"
import { createQueryBuilder } from "typeorm"

const router = express.Router()

router.get("/api/clients",async (req, res) => {
  const clients = await createQueryBuilder(
    'client'
  )
  .select('client')
  .addSelect("client.balance")
  .from(Client, 'clients')
  .leftJoinAndSelect(
    'client.transactions',
    'transactions'
  )
  .where('client.id = :clientId', {clientId: 1})
  .getMany()
})

export { router as fecthClientRouter }