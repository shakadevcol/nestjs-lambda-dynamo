import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoDBDocumentClient } from '../../../../src/services/database/dynamodb.connection';
import {
  AttributeValue,
  DeleteItemCommand,
  GetItemCommand,
  QueryCommand,
  ReturnValue,
  ScanCommand,
  UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
import { User } from '../types/user.type';

export class UserRepository {
  async findAll(): Promise<User[]> {
    const params = {
      TableName: 'users',
    };

    const command = new ScanCommand(params);
    const response = await dynamoDBDocumentClient.send(command);

    const items = response.Items.map(
      (item: Record<string, AttributeValue>): User => ({
        SK: item.SK.S,
        PK: item.PK.S,
        name: item.name.S,
        phone: item.phone.S,
        age: Number(item.age.N),
      }),
    );

    return items;
  }

  async find(id: string): Promise<User> {
    const params = {
      TableName: 'users',
      KeyConditionExpression: '#PK = :pk',
      ExpressionAttributeNames: {
        '#PK': 'PK',
      },
      ExpressionAttributeValues: {
        ':pk': {
          S: id,
        },
      },
    };

    const command = new QueryCommand(params);
    const response = await dynamoDBDocumentClient.send(command);

    const item = response.Items.map(
      (item: Record<string, AttributeValue>): User => ({
        SK: item.SK.S,
        PK: item.PK.S,
        name: item.name.S,
        phone: item.phone.S,
        age: Number(item.age.N),
      }),
    );
    return item[0];
  }

  async findByIdAndEmail(user: User): Promise<User | undefined> {
    const params = {
      TableName: 'users',
      Key: {
        PK: {
          S: user.PK,
        },
        SK: {
          S: user.SK,
        },
      },
    };

    const command = new GetItemCommand(params);
    const response = await dynamoDBDocumentClient.send(command);

    if (response.Item) {
      return {
        SK: response.Item.SK.S,
        PK: response.Item.PK.S,
        name: response.Item.name.S,
        phone: response.Item.phone.S,
        age: Number(response.Item.age.N),
      };
    }

    return undefined;
  }

  async save(user: User): Promise<string> {
    const userExist = await this.findByIdAndEmail(user);

    if (userExist) {
      return 'The user already exists';
    }

    const command = new PutCommand({
      TableName: 'users',
      Item: {
        PK: user.PK,
        SK: user.SK,
        name: user.name,
        age: user.age,
        phone: user.phone,
      },
    });

    await dynamoDBDocumentClient.send(command);

    return 'user created successfully';
  }

  async update(user: User): Promise<string> {
    const userExist = await this.findByIdAndEmail(user);

    if (!userExist) {
      return 'The user does not exists';
    }

    const params = {
      TableName: 'users',
      Key: {
        PK: {
          S: user.PK,
        },
        SK: {
          S: user.SK,
        },
      },
      ExpressionAttributeNames: {
        '#NAME': 'name',
        '#PHONE': 'phone',
        '#AGE': 'age',
      },
      ExpressionAttributeValues: {
        ':p': {
          S: user.phone,
        },
        ':n': {
          S: user.name,
        },
        ':a': {
          N: user.age.toString(),
        },
      },
      UpdateExpression: 'SET #PHONE = :p, #NAME = :n, #AGE = :a',
      ReturnValues: ReturnValue.ALL_NEW,
    };

    const command = new UpdateItemCommand(params);

    await dynamoDBDocumentClient.send(command);

    return 'user updated successfully';
  }

  async delete(user: User): Promise<string> {
    const userExist = await this.findByIdAndEmail(user);

    if (!userExist) {
      return 'The user does not exists';
    }

    const params = {
      TableName: 'users',
      Key: {
        PK: { S: user.PK },
        SK: { S: user.SK },
      },
    };

    const command = new DeleteItemCommand(params);
    await dynamoDBDocumentClient.send(command);

    return 'user deleted successfully';
  }
}
