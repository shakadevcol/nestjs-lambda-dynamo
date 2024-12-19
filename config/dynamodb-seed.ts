import { configDotenv } from 'dotenv';
configDotenv();
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoDBDocumentClient } from '../src/services/database/dynamodb.connection';

const command = new PutCommand({
  TableName: 'users',
  Item: {
    PK: '3',
    SK: 'user03@hotmail.com',
    name: 'name 03',
    age: 54,
    phone: '467543545',
  },
});

dynamoDBDocumentClient.send(command);
