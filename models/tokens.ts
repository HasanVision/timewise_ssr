import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from './User'; 

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

  // Getter method for expiresAt
  getExpiresAt() {
    return this.getDataValue('expiresAt');
  }

}

// TODO: Combine both approaches: send a verification link containing a long token and, after the user clicks the link, ask them to enter the 6-digit code as an additional layer of security.