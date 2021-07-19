import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Global } from '@nestjs/common';
import dbConfig from './database.config';

@Global()
@Module({
    imports: [TypeOrmModule.forRoot(dbConfig)]
})
export class DatabaseModule {}