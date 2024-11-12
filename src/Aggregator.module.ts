import { Module } from '@nestjs/common';

import { AuthModule } from '../services/auth-service/src/';
@Module({
	imports: [AuthModule],
	controllers: [],
	providers: []
})
export class AggregatorModule {}
