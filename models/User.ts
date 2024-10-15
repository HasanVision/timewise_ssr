import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  get firstName(): string {
    return this.getDataValue('firstName');
  }

  set firstName(value: string) {
    this.setDataValue('firstName', value);
  }

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  get lastName(): string {
    return this.getDataValue('lastName');
  }

  set lastName(value: string) {
    this.setDataValue('lastName', value);
  }

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  get primaryEmail(): string {
    return this.getDataValue('primaryEmail');
  }

  set primaryEmail(value: string) {
    this.setDataValue('primaryEmail', value);
  }

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  get password(): string {
    return this.getDataValue('password');
  }

  set password(value: string) {
    this.setDataValue('password', value);
  }

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  get primaryEmailVerified(): Date | undefined {
    return this.getDataValue('primaryEmailVerified');
  }

  set primaryEmailVerified(value: Date | undefined) {
    this.setDataValue('primaryEmailVerified', value);
  }

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  get secondaryEmailVerified(): Date | undefined {
    return this.getDataValue('secondaryEmailVerified');
  }

  set secondaryEmailVerified(value: Date | undefined) {
    this.setDataValue('secondaryEmailVerified', value);
  }
}
