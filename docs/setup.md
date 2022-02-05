# Setup

**Last Updated**: 2022-01-25

---

## Infrastructure

The following infrastructure was deployed in order to run the application.

### AWS

#### Cognito

The AWS config uses a Cognito identity pool to authenticate.

A Cognito identity pool in the same region as the other US resources is used for the application to authenticate (`AWS_COGNITO_IDENTITY_POOL_ID` is the environment variable that configures this).

#### DynamoDB

DynamoDB tables for `activity` and `activityOption` items hold the data for these respective entities. Their table names are stored in the environment variables `AWS_DYNAMODB_ACTIVITIES_TABLE` and `AWS_DYNAMO_DB_ACTIVITY_OPTIONS_TABLE`, respectively.

## Environment Variables

The following environment variables need to be configured in a `.env` file:

- `AWS_REGION`: The AWS region of the associated AWS account 
- `AWS_COGNITO_IDENTITY_POOL_ID`: The Cognito identity pool ID used to authenticate with AWS 
- `AWS_DYNAMODB_ACTIVITIES_TABLE`: The name of the Dynamo DB table that holds the recorded activities 
- `AWS_DYNAMO_DB_ACTIVITY_OPTIONS_TABLE`: The name of the Dynamo DB table that holds the activity options

## Local Development

To develop this application locally, I essentially followed the following steps:
 1. Deploy infrastructure (see the [infrastructure](#infrastructure) section for details)
 2. Load environment variables (see the [environment variables](#environment-variables) section for details)
 3. Run a fresh install
    ```shell
    npm i
    ```
 4. Run the respective script in `package.json`, i.e.:
    ```shell
    npm run ios
    ```