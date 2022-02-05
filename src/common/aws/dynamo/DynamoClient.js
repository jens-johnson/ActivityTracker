import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

import AWS from 'aws-sdk';

import { DynamoDBError, DYNAMO_DB_ERROR_CODES } from 'common/errors';

import { AWS_REGION, AWS_COGNITO_IDENTITY_POOL_ID } from '@env';

AWS.config.update({
  region: AWS_REGION,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: AWS_COGNITO_IDENTITY_POOL_ID
  })
});

/**
 * Wrapper over AWS SDK Dynamo DocumentClient to perform CRUD operations on a given table
 *
 * @class {DynamoClient}
 */
class DynamoClient {
  /**
   * Constructs an instance of the DynamoClient, configured with a given table
   *
   * @constructor
   * @param {string} table - The table to create a client for
   * @returns {DynamoClient} - An instance of the DynamoClient
   */
  constructor(table) {
    this._table = table;
    this._client = new AWS.DynamoDB.DocumentClient();
    this.putItem = this.putItem.bind(this);
    this.getItems = this.getItems.bind(this);
    return this;
  }

  /**
   * Puts an item in the table with optional request params.
   *
   * @param {Object} item - The item to put in the table
   * @param {Partial<AWS.DynamoDB.DocumentClient.PutItemInput>} options - Optional extended request params for the operation
   * @returns {Promise<AWS.DynamoDB.DocumentClient.PutItemOutput, AWS.AWSError>}
   */
  putItem(item, options=undefined) {
    const params = {
      TableName: this._table,
      Item: item,
      ...options
    };
    return this._client.put(params)
      .promise()
      .catch(error => {
        throw new DynamoDBError('Failed to put item in DynamoDB', {
          table: this._table,
          code: DYNAMO_DB_ERROR_CODES.PUT_ITEM,
          error
        });
      });
  }

  /**
   * Executes a scan operation to get items from the table with optional request params, defaulting to all items/attributes.
   *
   * @param {Partial<AWS.DynamoDB.DocumentClient.ScanInput>} options - Optional extended request params for the operation
   * @returns {Promise<AWS.DynamoDB.DocumentClient.AttributeMap[], DynamoDBError>}
   */
  getItems(options=undefined) {
    const params = {
      TableName: this._table,
      Select: 'ALL_ATTRIBUTES',
      ...options
    };
    return this._client.scan(params)
      .promise()
      .then(({ Items }) => Items)
      .catch(error => {
        throw new DynamoDBError('Failed to retrieve items from DynamoDB', {
          table: this._table,
          code: DYNAMO_DB_ERROR_CODES.GET_ITEMS,
          error
        });
      });
  }
}

export default DynamoClient;
