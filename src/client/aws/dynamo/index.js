import logging from 'common/logging';
import dynamo from 'common/aws/dynamo';

const logger = logging.getLogger('dynamo-client');

/**
 * Retrieves items within a given date range from DynamoDB
 *
 * @param {Object} params - Request params
 * @param {string} params.table - The name of the table to grab items from
 * @param {number} params.before - The epoch value specifying the end of the date range
 * @param {number} params.after - The epoch value specifying the beginning of the date range
 * @param {string='date'} params.indexName - The name of the date index in the table (optional; default 'date')
 * @return {Promise<DocumentClient.AttributeMap[], Error>}
 */
function getItemsByDate(params) {
  const {
    table,
    before,
    after,
    indexName = 'date'
  } = params;
  const request = {
    FilterExpression: '#date_index BETWEEN :after AND :before',
    ExpressionAttributeValues: {
      ':before': before,
      ':after': after
    },
    ExpressionAttributeNames: {
      '#date_index': indexName
    }
  }
  const dynamoClient = new dynamo.Client(table);
  return dynamoClient.getItems(request)
    .then(items => {
      logger.debug({
        message: `Retrieved items between ${new Date(before).toISOString()} and ${new Date(after).toISOString()}`,
        event: 'getItemsByDate',
        success: true,
        before,
        after,
        items: items?.length || 0
      });
      return items;
    })
    .catch(error => {
      logger.error({
        message: 'Failed to retrieve items by date',
        event: 'getItemsByDate',
        success: false,
        before,
        after,
        error
      });
      throw error;
    });
}

function getAllItems(params) {
  const {
    table
  } = params;
  const dynamoClient = new dynamo.Client(table);
  return dynamoClient.getItems()
    .then(items => {
      logger.debug({
        message: 'Retrieved all items from DynamoDB',
        event: 'getAllItems',
        success: true,
        itemsRetrieved: items.length
      });
      return items;
    })
    .catch(error => {
      logger.error({
        message: 'Failed to retrieve all items from DynamoDB',
        event: 'getAllItems',
        success: false,
        error
      });
      throw error;
    });
}

function putItem(params) {
  const {
    item,
    table
  } = params;
  const dynamoClient = new dynamo.Client(table);
  return dynamoClient.putItem(item)
    .then(() => {
      logger.debug({
        message: 'Item successfully uploaded to DynamoDB',
        event: 'putItem',
        success: true,
        item
      });
    })
    .catch(error => {
      logger.error({
        message: 'Failed to upload item to DynamoDB',
        event: 'putItem',
        success: false,
        item
      });
      throw error;
    });
}

export default {
  getItemsByDate,
  getAllItems,
  putItem
};
