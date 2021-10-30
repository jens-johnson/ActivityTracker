import AWS from 'aws-sdk';
import DynamoDbClient from './DynamoDbClient';
import { AWS_REGION, AWS_COGNITO_IDENTITY_POOL_ID } from '@env';

AWS.config.update({
  region: AWS_REGION,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: AWS_COGNITO_IDENTITY_POOL_ID
  })
});

export default {
  dynamoDb: (tableName) => new DynamoDbClient(tableName)
};
