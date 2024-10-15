import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'verification_tokens',
  timestamps: true,
})
export class VerificationToken extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  get token(): string {
    return this.getDataValue('token');
  }

  set token(value: string) {
    this.setDataValue('token', value);
  }

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  get primaryEmail(): string {
    return this.getDataValue('primaryEmail');
  }

  set primaryEmail(value: string) {
    this.setDataValue('primaryEmail', value);
  }

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  get expiresAt(): Date {
    return this.getDataValue('expiresAt');
  }

  set expiresAt(value: Date) {
    this.setDataValue('expiresAt', value);
  }
}