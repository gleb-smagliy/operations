import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import dbConfig from './database.config';

@Module({
    imports: [TypeOrmModule.forRoot(dbConfig)]
})
export class DatabaseModule {}