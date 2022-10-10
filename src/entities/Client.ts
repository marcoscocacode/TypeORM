import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany } from 'typeorm'
import { Person } from './utils/Person'
import { Transaction } from './Transaction'
import { Banker } from './Banker'

@Entity('client')

export class Client extends Person {

  @Column({
    type: "numeric" // Configura tipagem específicas aos valores
  })
  balance: number

  @Column({
    default: true, // Configura um valor padrão aos valores
    name: "active" // Configura o nome dentro do database
  })
  is_active: boolean

  @Column({
    type: "simple-json",
    nullable: true // Permite que essa informação seja opcional
  })
  additional_info: {
    age: number
    hair_color: string
  }

  @Column({
    type: "simple-array",
    default: []
  })
  family_members: string[]

  @ManyToMany(
    () => Banker
  )
  bankers: Banker[]

	@OneToMany(
		() => Transaction,
		(transaction) => transaction.client
	)
	transactions: Transaction[];

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}