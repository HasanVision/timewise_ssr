declare module './models/index' {
  import { Sequelize, Model } from 'sequelize';

  export interface DB {
    sequelize: Sequelize;
    Sequelize: typeof Sequelize;
    [key: string]: typeof Model | Sequelize;
  }

  const db: DB;
  export default db;
}