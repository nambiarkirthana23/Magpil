// // typeorm.config.ts
// import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'mysql',
//   host: 'your-mysql-host',
//   port: 3306,
//   username: '',
//   password: 'Shilpa@2001',
//   database: 'task_magpil',
//   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//  // synchronize: true, // Set to false in production
// };

// export default typeOrmConfig;
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";

import { ConfigModule, ConfigService } from "@nestjs/config";
import { Data } from "../entities/data.entity";



export default class TypeOrmConfig {
    static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_NAME'),
            entities: [Data],
            synchronize: false,
            autoLoadEntities: true,

            // migrations:['dist/db/migrations/*.js']

        };
    }
}

// const typeOrmconfig =new TypeOrmConfig()

export const typeOrmconfigAsync: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
    inject: [ConfigService],
}
