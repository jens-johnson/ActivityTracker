import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import AWS from 'aws-sdk';

export default class DynamoDbClient {
  constructor(tableName) {
    this._client = new AWS.DynamoDB.DocumentClient();
    this._table = tableName;
    this.putItem = this.putItem.bind(this);
  }
  putItem(item) {
    console.log('putting', item)
    const params = {
      TableName: this._table,
      Item: item
    };
    return this._client.put(params)
      .promise()
      .then(() => undefined)
      .catch((e) => {
        console.log(e, 'darn')
        return undefined;
      })
  }
}

/*
export default class DynamoDb {
  constructor({ region, identityPoolId }) {
    const params = {
      region,
      credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({ region }),
        identityPoolId,
      })
    };
    this._client = new DynamoDBClient(params);
    return this;
  }

  uploadActivity() {

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

  async getActivitiesThisWeek() {
    const startOfWeek = moment().startOf('week').toISOString();
    const endOfWeek = moment().endOf('week').toISOString();

    const params = {
      TableName: AWS_DYNAMODB_TABLE_NAME,
      FilterExpression: "#ts BETWEEN :sow AND :eow",
      ExpressionAttributeNames:{
        "#ts": "timestamp"
      },
      ExpressionAttributeValues: {
        ":sow": {
          S: startOfWeek
        },
        ":eow": {
          S: endOfWeek
        }
      }
    }

    try {
      const { Items } = await this._client.send(new ScanCommand(params));
      return Items;
    } catch (err) {
      return null;
    }
  }
}
*/
