import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

const dbConfig: TypeOrmModuleOptions = {
  type: "sqlite",
  database: path.join(__dirname, '../../__data/db.sqlite'),
  entities: [
      path.join(__dirname, '/../**/*.entity{.ts,.js}')
  ],
  logging: true,
  synchronize: isDev
};

export default dbConfig;