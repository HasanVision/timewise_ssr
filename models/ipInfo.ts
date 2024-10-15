import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';  // Import the User model

@Table({
  tableName: 'ip_infos',
  timestamps: true,  // Enable Sequelize's `createdAt` and `updatedAt`
})
export class IPInfo extends Model {
  // You don't need to declare `id` explicitly as Sequelize will handle it for you.
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ip!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userId!: string;

  @BelongsTo(() => User)
  user!: User;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  network?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  ipVersion?: string;  // Optional version field

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  cityCode?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  region!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  regionCode?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  country!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  countryName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  countryCode?: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  latitude!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  longitude!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  inEu!: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  timezone?: string;

  // No need to define `createdAt` or `updatedAt` - they are handled by Sequelize automatically.
}

export default IPInfo;