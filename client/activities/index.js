import service from './service';

const upload = (activityForm) => {
  console.log('activityClient')
  return service.uploadActivity(activityForm);
}

export default {
  upload
};
