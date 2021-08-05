import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import { DynamoDBClient, DescribeTableCommand } from '@aws-sdk/client-dynamodb';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { AWS_DYNAMODB_REGION, AWS_DYNAMODB_COGNITO_IDENTITY_POOL_ID, AWS_DYNAMODB_TABLE_NAME } from '@env';

export default class dbClient {
  constructor() {
    const region = AWS_DYNAMODB_REGION;
    const cognitoIdentityPoolId = AWS_DYNAMODB_COGNITO_IDENTITY_POOL_ID;
    const params = {
      region,
      credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({ region }),
        identityPoolId: cognitoIdentityPoolId,
      })
    };
    const client = new DynamoDBClient(params);
    this._client = client;
    return;
  }

  async getTotalNumberOfActivities() {
    try {
      const params = {
        TableName: AWS_DYNAMODB_TABLE_NAME
      }
      const data = await this._client.send(new DescribeTableCommand(params));
      return data.Table.ItemCount;
    } catch (err) {
      return null;
    }
  }
}
