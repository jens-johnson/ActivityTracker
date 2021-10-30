import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import AWSClient from '../aws';
import { v4 as uuidV4 } from 'uuid';
import { AWS_DYNAMODB_ACTIVITIES_TABLE as table } from '@env';

const dynamoDbClient = AWSClient.dynamoDb(table);

function toMilliseconds(duration) {
  return ((((duration.hours * 60) + duration.minutes) * 60) + duration.seconds) * 1000;
}

function toConstantCase(string) {
  return string.toUpperCase()
    .replace(/ /g, '_')
    .replace(/&/g, 'AND');
}

function toActivityItem(activity) {
  if (activity.duration && Object.values(activity.duration).every(v => v > 0)) {
    activity.duration = toMilliseconds(activity.duration);
  } else {
    delete activity.duration;
  }
  if (activity.distance  && !isNaN(Number(activity.distance))) {
    activity.distance = Number(activity.distance)
  } else {
    delete activity.distance;
  }
  if (activity.liftingGroup && activity.liftingGroup !== '') {
    activity.liftingGroup = toConstantCase(activity.liftingGroup);
  } else {
    delete activity.liftingGroup;
  }
  return {
    ...activity,
    id: uuidV4(),
    activity: toConstantCase(activity.activity),
    date: new Date(activity.date).valueOf()
  }
}

function uploadActivity(activity) {
  return Promise.resolve(activity)
    .then(toActivityItem)
    .then(dynamoDbClient.putItem)
    .catch(e => {
      console.log(e, 'error man!')
    })
}

export default {
  uploadActivity
};
