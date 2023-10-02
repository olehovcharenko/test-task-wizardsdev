import { Pool } from 'pg';
import databaseConfig from '../config/configuration';

export const databaseProvider = {
  provide: 'DATABASE_CONNECTION',
  useFactory: async () => {
    return new Pool({
      host: databaseConfig.host,
      user: databaseConfig.user,
      password: databaseConfig.password,
      database: databaseConfig.database,
      port: databaseConfig.port,
    });
  },
};
