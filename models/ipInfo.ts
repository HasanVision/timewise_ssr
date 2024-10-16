import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from './User';

@Table({
  tableName: 'ip_infos',
  timestamps: true,
})
export class IPInfo extends Model {
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ip!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  network?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  ipVersion?: string;

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
    allowNull: true,
  })
  inEu?: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  timezone!: string;
}