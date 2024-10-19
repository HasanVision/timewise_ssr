
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from './User';
@Table({
    tableName: 'work_hours',
    timestamps: true,
  })
  export class WorkHours extends Model {

    @ForeignKey(() => User)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    userId!: number;
  
    @Column({
      type: DataType.DATEONLY,
      allowNull: false,
    })
    workDate!: Date;
  
    @Column({
      type: DataType.DECIMAL(5, 2),
      allowNull: false,
    })
    hoursWorked!: number;
  
    @Column({
      type: DataType.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 0,
    })
    overtimeHours!: number;
  }

  