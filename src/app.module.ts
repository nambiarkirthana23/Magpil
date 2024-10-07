// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeOrmconfigAsync } from './data/configs/typeorm.config';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { DataModule } from './data/modules/data.module';
// import { JwtModule, JwtService } from '@nestjs/jwt';

// @Module({
//   imports: [
//     // ConfigModule.forRoot({
//     //   isGlobal: true, 
//     // }),
//     //PassportModule.register({ defaultStrategy: 'jwt' }),
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       useFactory: async (configService: ConfigService) => ({
//         secret: configService.get<string>('JWT_SECRET'),
//         signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
//       }),
//       inject: [ConfigService],
//     }),
//     ConfigModule.forRoot(),
//     TypeOrmModule.forRootAsync(typeOrmconfigAsync),
//     DataModule
//   ],

//   controllers: [AppController],
//   providers: [AppService,JwtService,ConfigService],
// })
// export class AppModule {}
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmconfigAsync } from './data/configs/typeorm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataModule } from './data/modules/data.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmconfigAsync),
    DataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
