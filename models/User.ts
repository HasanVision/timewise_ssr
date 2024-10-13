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
  firstName!: string;  // First name field

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName!: string;  // Last name field

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  primaryEmail!: string;  // Primary email field

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  secondaryEmail?: string;  // Secondary email field (optional)

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  primaryEmailVerified?: Date;  // Date when primary email was verified (optional)

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  secondaryEmailVerified?: Date;  // Date when secondary email was verified (optional)

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;  // Password field
}