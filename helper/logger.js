const log = (level, module, functionality, functionName, message, errData) => {
  /**
   *  get current log level from db
   *  log 1 = Success response from controller/service
   *  log 2 = error on service level
   *  log 3 = error on controller level
   */
  const logData = { converter: 1 };
  if (errData.stack) {
    errData = errData.stack;
  }
  if (logData) {
    /* eslint-disable no-console */
    console.log({
      level: level,
      message: module + '  |  ' + functionality + '  |  ' + functionName + ':: ' + message + '::   Data:' + JSON.stringify(errData)
    });
  }
};

module.exports = {
  log
};
