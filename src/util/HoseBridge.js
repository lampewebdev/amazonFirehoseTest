import AWS from 'aws-sdk';

class HoseBridge {
  constructor({
    name,
    firehose = null,
  }) {
    this.name = name;
    this.firehose = firehose || new AWS.Firehose({
      params: { DeliveryStreamName: this.name, ExtendedS3DestinationConfiguration: { prefix: 'test' } },
    });
    if (this.firehose.config.credentials === null) {
      throw new Error('AWS credentials not set');
    }
  }

  putRecord(record) {
    const stringifiedRecord = typeof record === 'string' ? record : JSON.stringify(record);
    const params = {
      DeliveryStreamName: this.name,
      Record: {
        Data: Buffer.from(stringifiedRecord),
      },
    };
    return new Promise((resolve, reject) => {
      this.firehose.putRecord(params, (err, response) => {
        if (err) {
          return reject(err);
        }
        return resolve(response);
      });
    });
  }
}

export default HoseBridge;
