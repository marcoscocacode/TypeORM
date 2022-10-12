import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm'
import { Client } from './Client'
import { Person } from './utils/Person'

@Entity('banker')

export class Banker extends Person {

  @Column({
    unique: true,
    length: 10 // Para receber o metodo lenght é necessário que a tipagem seja 'string'
  })
  employee_number: string

  @ManyToMany(
    () => Client
  )
  @JoinTable({ // Cria uma nova tabela com os id's linkados entre as tabelas presentes no ManyToMany
    name: "bankers_clients",
    joinColumn: {
      name: "banker",
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'client',
      referencedColumnName: 'id'
    }
  })
  clients: Client[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}