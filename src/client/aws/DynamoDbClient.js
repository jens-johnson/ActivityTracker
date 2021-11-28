import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import AWS from 'aws-sdk';

/**
 * @class DynamoDbClient
 * @constructor
 * @property {AWS.DynamoDB.DocumentClient} _client - The AWS SDK Dynamo DB client
 * @property {string} _table - The name of the DynamoDB
 */
export default class DynamoDbClient {

  /**
   *
   * @param {string} tableName
   * @return {DynamoDbClient}
   */
  constructor(tableName) {
    this._client = new AWS.DynamoDB.DocumentClient();
    this._table = tableName;
    this.putItem = this.putItem.bind(this);
    this.getAllItems = this.getAllItems.bind(this);
    return this;
  };

  /**
   * Puts an item in the DynamoDB table
   *
   * @param {Object} item
   * @return {Promise<void>}
   */
  putItem(item) {
    const params = {
      TableName: this._table,
      Item: item
    };
    return this._client.put(params)
      .promise()
  };

  /**
   * Retrieves all items from the DynamoDB table using a scan operation
   *
   * @return {Promise<Object[]>}
   */
  getAllItems() {
    let params = {
      TableName: this._table,
      Select: 'ALL_ATTRIBUTES'
    };
    return this._client.scan(params)
      .promise()
      .then(({ Items }) => Items);
  };

  /**
   * Retrieves items between two dates
   *
   * @param {Number} before - The before datetime as an epoch
   * @param {Number} after - The after datetime as an epoch
   * @return {Promise<Object[]>}
   */
  getItemsByDate({ before, after }) {
    let params = {
      TableName: this._table,
      FilterExpression: '#activity_date BETWEEN :after AND :before',
      ExpressionAttributeValues: {
        ':before': before,
        ':after': after
      },
      ExpressionAttributeNames: {
        '#activity_date': 'date'
      }
    };
    return this._client.scan(params)
      .promise()
      .then(({ Items }) => Items);
  };
};
