import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Client } from "./Client"

export enum TransactionTypes {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw'
}

@Entity('transaction')

export class Transaction extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: TransactionTypes,
  })
  type: string

  @Column({
    type: 'numeric',
  })
  amount: number

  @ManyToOne( // Especifica a relação entre as tabelas.
    () => Client, 
    (client) => client.transactions, // Para funcionar precisa da especificação inversa na tabela correspondente
    {
      onDelete: "CASCADE" // Deleta em cascata todos os valores ligados a esse ID
    }
  )

  @JoinColumn({ // Especifica o nome da Primery Key
    name: 'client_id'
  })
  client: Client

  @CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
  
}