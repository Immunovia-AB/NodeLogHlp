var winston = require('winston');
require('winston-dynamodb').DynamoDB;

var aws = require('aws-sdk');
aws.config = new aws.Config();
aws.config.accessKeyId = global.AccessKeyId;
aws.config.secretAccessKey = global.SecretAccessKey;
aws.config.region = global.Region;

var options = {
  accessKeyId: global.AccessKeyId,
  secretAccessKey: global.SecretAccessKey,
  region: global.Region,
  useEnvironment: false,
  tableName: global.Table,
  level: global.LogLevel
};

var myCustomLevels = { levels: { ERROR: 0, INFO: 1, WARNING: 2, DEBUG: 3 } };

var dynamo = new (winston.Logger)({
  levels: myCustomLevels.levels,
  level: 'DEBUG',
  transports: [new winston.transports.DynamoDB(options)]
});

if (global.LogToCmd == true) {
    dynamo.add(winston.transports.Console);
}

dynamo.DEBUG('Logger instantiated', { 'Appl': global.Appl });

module.exports=dynamo;
