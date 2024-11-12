import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { AuthModule } from '../services/auth-service/src/';
import { GatewayModule } from '../services/gateway-service/src/';

import { AggregatorModule } from './Aggregator.module';

async function runMicroservices() {
	try {
		NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
			transport: Transport.TCP,
			options: {
				port: Number(process.env.AUTH_SERVICE_PORT!)
			}
		})
			.then((app) => app.listen())
			.then(() =>
				console.log(
					`Auth service is running on port ${Number(process.env.AUTH_SERVICE_PORT!)}`
				)
			);
		NestFactory.create(GatewayModule)
			.then((app) => {
				return app.listen(Number(process.env.GATEWAY_SERVICE_PORT!));
			})
			.then(() => {
				console.log(
					`Gateway service is running on port ${Number(process.env.GATEWAY_SERVICE_PORT!)}`
				);
			});
	} catch (error) {
		console.error(`Failed to start service :`, error);
	}
}

async function runAggregator() {
	try {
		const app = await NestFactory.create(AggregatorModule);
		await app.listen(Number(process.env.AGGREGATOR_SERVICE_PORT!));
		console.log(
			`Aggregator service is running on port ${Number(process.env.AGGREGATOR_SERVICE_PORT!)}`
		);
	} catch (error) {
		console.error(`Failed to start service :`, error);
	}
}

async function bootstrap() {
	const runAsMicroservices = process.env.RUN_AS_MICROSERVICES === 'true';

	if (runAsMicroservices) {
		await runMicroservices();
		console.log('Running as Microservices');
	} else {
		await runAggregator();
		console.log('Running as Aggregator');
	}
}

bootstrap();
