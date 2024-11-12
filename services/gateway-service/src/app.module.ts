import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: { port: Number(process.env.AUTH_SERVICE_PORT) },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
//
