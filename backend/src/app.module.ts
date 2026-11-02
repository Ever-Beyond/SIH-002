import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { UsersModule } from './modules/users/users.module.js';
import { IncidentsModule } from './modules/incidents/incidents.module.js';
import { validate } from './config/env.validation.js';
import { FleetModule } from './modules/fleet/fleet.module.js';
import { LogisticsModule } from './modules/logistics/logistics.module.js';
import { GisModule } from './modules/gis/gis.module.js';
import { WeatherModule } from './modules/weather/weather.module.js';
import { RealtimeModule } from './modules/realtime/realtime.module.js';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigModule available across entire app without re-importing
      validate,       // inject class-validator schema
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    AuthModule, 
    UsersModule, 
    IncidentsModule, 
    FleetModule, 
    LogisticsModule,
    GisModule,
    WeatherModule,
    RealtimeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
