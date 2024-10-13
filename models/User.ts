// models/User.ts

import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'users',  // The name of the table in the database
  timestamps: true,    // Automatically add createdAt and updatedAt fields
})
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName!: string;  // Define the username field

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName!: string; 

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  primaryEmail!: string;  // Define the email field

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;  // Define the password field
}