import * as mysql from 'mysql2/promise';
import databaseConfig from './config/configuration';

export const databaseProvider = {
  provide: 'DATABASE_CONNECTION',
  useFactory: async () => {
    return await mysql.createConnection({
      host: databaseConfig.host,
      user: databaseConfig.user,
      password: databaseConfig.password,
      database: databaseConfig.database,
    });
  },
};
