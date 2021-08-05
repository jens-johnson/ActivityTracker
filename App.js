import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import { DynamoDBClient, DescribeTableCommand, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import dbClient from './utilities/aws/dbClient';

const AWS_REGION = 'us-west-2';
const AWS_COGNITO_IDENTITY_POOL_ID = 'us-west-2:cf72d581-435b-4f78-84b2-d28c62cfdad2';
const AWS_TABLE_NAME = 'activities';

export default function App() {
  const [tableInformation, setTableInformation] = useState(null);
  //const client = initClient();
  const dbClientFun = new dbClient();

  /*
  async function getTableInformation() {
    console.log('CALLED')
    try {
      const params = {
        TableName: AWS_TABLE_NAME
      }
      const data = await client.send(new DescribeTableCommand(params));
      console.log('Success', data.Table.ItemCount)
      setTableInformation(data);
    } catch (err) {
      console.log('Failure', err)
      setTableInformation('poop');
    }
  }
  */

  async function buttonHandler() {
    const totalNumberOfActivities = await dbClientFun.getTotalNumberOfActivities();
    setTableInformation(totalNumberOfActivities);
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button
        backroundColor="#68a0cf"
        title="Get total number of activities"
        onPress={buttonHandler}
      />
      <Text>{ tableInformation ? tableInformation : '' }</Text>
    </View>
  );
}

function initClient() {
  const params = {
    region: AWS_REGION,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: AWS_REGION }),
      identityPoolId: AWS_COGNITO_IDENTITY_POOL_ID,
    })
  };

  const client = new DynamoDBClient(params);
  return client;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
