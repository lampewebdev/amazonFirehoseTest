import AWS from 'aws-sdk';
import firehoser from 'firehoser';
require('dotenv').config()

AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey
});
 
let firehose = new firehoser.DeliveryStream('my_delivery_stream_name');
 
// Send a single record to Kinesis Firehose...
firehose.putRecord('value1|value2|value3');