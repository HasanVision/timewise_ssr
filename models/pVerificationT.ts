import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from './User'; // Ensure the path is correct

@Table({
  tableName: 'verification_tokens',
  timestamps: true,
})
export class VerificationToken extends Model {
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

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expiresAt!: Date;
}