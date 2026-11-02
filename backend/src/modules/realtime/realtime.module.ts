import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RealtimeGateway } from './realtime.gateway.js';
import { FleetModule } from '../fleet/fleet.module.js';

@Module({
  imports: [
    JwtModule.register({}), // Secrets loaded dynamically in guard/gateway via ConfigService
    FleetModule,
  ],
  providers: [RealtimeGateway],
  exports: [RealtimeGateway],
})
export class RealtimeModule {}
