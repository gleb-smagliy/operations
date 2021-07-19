import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

const env = process.env.NODE_ENV || 'development';

const dbPaths = {
  production: '../../__data/db.prod.sqlite',
  development: '../../__data/db.dev.sqlite',
  test: '../../__data/db.test.sqlite'
};

const dbConfig: TypeOrmModuleOptions = {
  type: "sqlite",
  database: path.join(__dirname, dbPaths[env]),
  entities: [
      path.join(__dirname, '/../**/*.entity{.ts,.js}')
  ],
  logging: true,
  synchronize: env == 'development' || env == 'test'
};

export default dbConfig;