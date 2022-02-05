/**
 * Custom error codes describing DynamoDBErrors
 */
const CODES = {
  GET_ITEMS: 'GET_ITEMS',
  PUT_ITEM: 'PUT_ITEM'
};

/**
 * Custom error class describing DynamoDB operational errors
 */
class DynamoDBError extends Error {
  /**
   * Constructs an instance of the DynamoDBError
   *
   * @param {string} message - A human-readable message describing the error
   * @param {string} table - The name of the Dynamo DB table being used when the error was generated; optional
   * @param {string} code - An enumeration of custom DynamoDB error codes to describe the error; optional
   * @param {Error} error - The native error object that generated the error; optional
   * @return {DynamoDBError}
   */
  constructor(message, { table=undefined, code=undefined, error=undefined }) {
    super(message);
    this.table = table;
    this.code = code;
    this.error = error;
  }
}

export {
  DynamoDBError,
  CODES
};
