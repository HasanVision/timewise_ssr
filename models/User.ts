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
  firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  primaryEmail!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  primaryEmailVerified?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  secondaryEmailVerified?: Date;
}
// import { Table, Column, Model, DataType } from 'sequelize-typescript';
// // import { CreationOptional } from 'sequelize';

// // Define the attributes for the User model
// interface UserAttributes {
//   id: number;
//   firstName: string;
//   lastName: string;
//   primaryEmail: string;
//   password: string;
//   primaryEmailVerified?: Date;
//   secondaryEmailVerified?: Date;
// }

// // Define the creation attributes (which omit the auto-generated fields like `id`)
// interface UserCreationAttributes extends Partial<UserAttributes> {
//   firstName: string;
//   lastName: string;
//   primaryEmail: string;
//   password: string;
// }

// @Table({
//   tableName: 'users',
//   timestamps: true,
// })
// export class User extends Model<UserAttributes, UserCreationAttributes> {
//   // declare id: CreationOptional<number>;

//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   firstName!: string;

//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   lastName!: string;

//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//     unique: true,
//   })
//   primaryEmail!: string;

//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   password!: string;

//   @Column({
//     type: DataType.DATE,
//     allowNull: true,
//   })
//   primaryEmailVerified?: Date;

//   @Column({
//     type: DataType.DATE,
//     allowNull: true,
//   })
//   secondaryEmailVerified?: Date;
// }