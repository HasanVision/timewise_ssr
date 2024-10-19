import { Table, Column, Model, DataType, Unique } from 'sequelize-typescript';

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

  @Unique('unique_email')
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

  @Unique('unique_email')
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  get secondaryEmail(): string {
    return this.getDataValue('secondaryEmail');
  }

  set secondaryEmail(value: string) {
    this.setDataValue('secondaryEmail', value);
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
  get primaryEmailVerified(): Date {
    return this.getDataValue('primaryEmailVerified');
  }

  set primaryEmailVerified(value: Date ) {
    this.setDataValue('primaryEmailVerified', value);
  }

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  get secondaryEmailVerified(): Date {
    return this.getDataValue('secondaryEmailVerified');
  }

  set secondaryEmailVerified(value: Date ) {
    this.setDataValue('secondaryEmailVerified', value);
  }
}
