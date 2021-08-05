import React from 'react';
import { Text, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import dbClient from '../utilities/aws/dbClient';

export default function HomeScreen({ navigation }) {
  const [tableInformation, setTableInformation] = useState(null);
  const dbClientFun = new dbClient();

  async function buttonHandler() {
    const totalNumberOfActivities = await dbClientFun.getTotalNumberOfActivities();
    setTableInformation(totalNumberOfActivities);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>
      <StatusBar style="auto" />
      <Button
        backroundColor="#68a0cf"
        title="Get total number of activities"
        onPress={buttonHandler}
      />
      <Text>{ tableInformation ? tableInformation : '' }</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
