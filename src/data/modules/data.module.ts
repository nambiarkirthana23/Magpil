import { Module } from '@nestjs/common';
import { DataService } from '../services/data.service';
import { DataController } from '../controllers/data.controller';
import { Data } from '../entities/data.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule} from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';



@Module({
  imports: [TypeOrmModule.forFeature([Data]),

  ConfigModule.forRoot(),

  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.registerAsync({
    useFactory: (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET_KEY'),
      signOptions: {
        expiresIn: configService.get('EXPIRES_IN'),
      },
    }),
    inject: [ConfigService],
  }),],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule { }
//,JwtService,ConfigService