import { Module } from '@nestjs/common';
import { dynamoDBDocumentClient } from './dynamodb.connection';
import { UserRepository } from './repositories/user.repository';

@Module({
  providers: [
    {
      provide: 'DynamoDBClient',
      useValue: dynamoDBDocumentClient,
    },
    UserRepository,
  ],
  exports: [UserRepository],
})
export class DynamoDBModule {}
