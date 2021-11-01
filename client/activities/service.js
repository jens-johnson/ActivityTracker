import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import AWSClient from '../aws';
import { v4 as uuidV4 } from 'uuid';
import { AWS_DYNAMODB_ACTIVITIES_TABLE as activitiesTable, AWS_DYNAMO_DB_ACTIVITY_OPTIONS_TABLE as activityOptionsTable } from '@env';

const activitiesTableDynamoDbClient = AWSClient.dynamoDb(activitiesTable);
const activityOptionsTableDynamoDbClient = AWSClient.dynamoDb(activityOptionsTable);

const toMilliseconds = duration => ((((duration.hours * 60) + duration.minutes) * 60) + duration.seconds) * 1000;

const toLabel = string => string.charAt(0).toUpperCase() + string.substr(1).toLowerCase()
  .replace(/_/g, ' ')
  .replace(/and/g, '&');

const fromLabel = string => string.toUpperCase()
  .replace(/ /g, '_')
  .replace(/&/g, 'AND');


const toActivityItem = (activity) => {
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
    activity.liftingGroup = toLabel(activity.liftingGroup);
  } else {
    delete activity.liftingGroup;
  }
  return {
    ...activity,
    id: uuidV4(),
    activity: fromLabel(activity.activity),
    date: new Date(activity.date).valueOf()
  }
}

const toActivityOptionsItems = (items) => {
  return items.map(item => ({
    ...item,
    ...(item.groups) && { groups: item.groups.values.map(group => toLabel(group)) },
    label: toLabel(item.label),
  }));
}

const listActivityOptions = () => {
  return Promise.resolve()
    .then(activityOptionsTableDynamoDbClient.getAllItems)
    .then(toActivityOptionsItems);
}

const uploadActivity = (activity) => {
  return Promise.resolve(activity)
    .then(toActivityItem)
    .then(activitiesTableDynamoDbClient.putItem);
}

export default {
  uploadActivity,
  listActivityOptions
};
