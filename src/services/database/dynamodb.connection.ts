import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

enum Environment {
  LOCAL = 'LOCAL',
  TEST = 'TEST',
  PROD = 'PROD',
}

const dynamoConfig: DynamoDBClientConfig = {
  region: process.env.AWS_REGION,
};

if (process.env.APP_ENV === Environment.LOCAL) {
  dynamoConfig.endpoint = process.env.AWS_ENDPOINT;
  dynamoConfig.credentials = {
    accessKeyId: 'dummy',
    secretAccessKey: 'dummy',
  };
}

export const dynamoDBDocumentClient = DynamoDBDocumentClient.from(
  new DynamoDBClient(dynamoConfig),
  /* {
    marshallOptions: {
      removeUndefinedValues: true,
    },
  }, */
);
