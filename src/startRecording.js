import MongoOplog from 'mongo-oplog';
import log from './util/log';
import record from './util/record';

export default () => {
  const oplog = MongoOplog(process.env.MONGO_OPLOG_SERVER);
  oplog.tail();

  oplog.on('op', (data) => {
    log({
      event: 'op',
      data,
    });
    record(data);
  });

  oplog.on('insert', (doc) => {
    log({
      event: 'insert',
      data: doc,
    });
    record({
      event: 'insert',
      data: doc,
    });
  });

  oplog.on('update', (doc) => {
    log({
      event: 'update',
      data: doc,
    });
    record({
      event: 'update',
      data: doc,
    });
  });

  oplog.on('delete', (doc) => {
    log({
      event: 'delete',
      data: doc,
    });
    record(doc);
  });

  oplog.on('error', (error) => {
    log({
      event: 'error',
      data: error,
    });
    record(error);
  });

  oplog.on('end', () => {
    log({
      event: 'end',
      data: 'Stream ended',
    });
  });
};
