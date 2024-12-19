import { NestFactory } from '@nestjs/core';
import { APIGatewayProxyEvent, Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';
import { AppController } from './app.controller';

export const handler: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback,
) => {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const appController = appContext.get(AppController);

  return await appController.execute(event);
};
