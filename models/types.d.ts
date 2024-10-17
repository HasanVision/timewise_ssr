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

// make sure to import the module in the file where you want to use it NEED TO LEARN MORE ABOUT THIS