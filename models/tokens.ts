import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from './User'; // assuming you have a User model

@Table({
  tableName: 'tokens',
  timestamps: true,
})
export class Token extends Model {
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  token!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.ENUM('reset_password_verification', 'email_verification', 'secondary_email_verification'),
    allowNull: false,
  })
  tokenType!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  userId!: number;


  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expiresAt!: Date;

}