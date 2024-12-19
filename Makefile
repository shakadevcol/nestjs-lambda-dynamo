include .env

setup: docker-compose-run setup-dynamodb

setup-dynamodb: dynamodb-create-table dynamodb-seed

docker-compose-run:
	docker compose up -d

dynamodb-create-table:
	awslocal dynamodb create-table \
		--table-name $(DYNAMODB_TABLE_USERS) \
		--attribute-definitions \
			AttributeName=PK,AttributeType=S \
			AttributeName=SK,AttributeType=S \
		--key-schema \
			AttributeName=PK,KeyType=HASH \
			AttributeName=SK,KeyType=RANGE \
		--provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
		--query 'TableDescription.TableName'

dynamodb-seed:
	npx ts-node config/dynamodb-seed.ts
