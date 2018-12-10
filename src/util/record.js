import HoseBridge from './HoseBridge';
import log from './log';

const firehose = new HoseBridge({
  name: process.env.DELIVERY_STREAM,
});

// Send a single record to Kinesis Firehose...
export default dataToSave => firehose.putRecord(dataToSave)
  .then(response => log({
    event: 'success',
    data: response,
  }))
  .catch(err => log({
    event: 'error',
    data: err,
  }));
