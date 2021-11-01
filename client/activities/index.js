import service from './service';

const listActivityOptions = () => {
  return service.listActivityOptions()
    .catch(_ => []);
};

const upload = (activity) => {
  return service.uploadActivity(activity)
    .catch(error => ({
      message: 'Failed to upload activity',
      errorMessage: error.message || 'Unknown error',
      errorCode: error.code
    }));
};

export default {
  upload,
  listActivityOptions
};
