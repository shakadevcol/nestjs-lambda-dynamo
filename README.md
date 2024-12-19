# Lambda dynamo

## Description

Nest project to test lambda function and dynamo.

**Note**: Make sure you have docker installed.

## Installation

```bash
$ npm install
```

Duplicate the .env.example file and renamed to .env

## Build the app

```bash
# development
make setup
npm run build

```

## Test the app

```bash
# validation message
npx serverless invoke local -f main

# Get users
npx serverless invoke local -f main -d '{"body":{"requestType":"getUsers"}}'

# Get user
npx serverless invoke local -f main -d '{"body":{"requestType":"getUser","user":{"PK":"4","SK":"user04@hotmail.com"}}}'

# Create user
npx serverless invoke local -f main -d '{"body":{"requestType":"createUser","user":{"PK":"4","SK":"user04@hotmail.com","name":"name 04","phone":"5535454","age":52}}}'

# Update user
npx serverless invoke local -f main -d '{"body":{"requestType":"updateUser","user":{"PK":"4","SK":"user04@hotmail.com","name":"name 04","phone":"5535454","age":52}}}'

# Delete user
npx serverless invoke local -f main -d '{"body":{"requestType":"deleteUser","user":{"PK":"5","SK":"user05@hotmail.com"}}}'

```

## Unit Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
