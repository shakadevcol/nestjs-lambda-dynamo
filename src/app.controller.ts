import { Controller, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { isEmpty } from 'class-validator';
import { User } from './services/database/types/user.type';

type Body = {
  requestType: string;
  user?: User;
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  execute(event: APIGatewayProxyEvent) {
    if (isEmpty(event.body)) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Body is empty',
      };
    }

    const body: Body = JSON.parse(JSON.stringify(event.body));
    let response: object;

    switch (body.requestType) {
      case 'getUsers':
        response = this.appService.findUsers();
        break;

      case 'getUser':
        if (!body.user) {
          response = {
            status: HttpStatus.BAD_REQUEST,
            message: 'user field is required',
          };
          return;
        }

        response = this.appService.findUser(body.user);
        break;
      case 'createUser':
        if (!body.user) {
          response = {
            status: HttpStatus.BAD_REQUEST,
            message: 'user field is required',
          };
          return;
        }

        response = this.appService.createUser(body.user);
        break;

      case 'updateUser':
        if (!body.user) {
          response = {
            status: HttpStatus.BAD_REQUEST,
            message: 'user field is required',
          };
          return;
        }

        response = this.appService.updateUser(body.user);
        break;

      case 'deleteUser':
        if (!body.user) {
          response = {
            status: HttpStatus.BAD_REQUEST,
            message: 'user field is required',
          };
          return;
        }

        response = this.appService.deleteUser(body.user);
        break;

      default:
        response = {
          status: HttpStatus.BAD_REQUEST,
          message: 'requestType not supported',
        };
        break;
    }

    return response;
  }
}
