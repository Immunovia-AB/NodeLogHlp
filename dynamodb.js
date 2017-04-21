var winston = require('winston');

var myCustomLevels = { levels: { ERROR: 0, INFO: 1, WARNING: 2, DEBUG: 3 } };

var dynamo = new (winston.Logger)({
  levels: myCustomLevels.levels,
  level: 'DEBUG'
});

if (global.LogToDynamoDB === "true") {
    require(__dirname + '/winston-dynamodb').DynamoDB;

    var AWS = require('aws-sdk');
    try {
      var sync = true;
      AWS.config = new AWS.Config({ region: global.Region });
      AWS.config.getCredentials(function(err) {
        if (err) console.log(err.stack);
        else {
          global.AccessKeyId = AWS.config.credentials.accessKeyId;
          global.SecretAccessKey = AWS.config.credentials.secretAccessKey;
          global.Credentials = AWS.config.credentials;
        }
        sync = false;
      });
      while(sync) {require('deasync').sleep(100);}
    } catch(e) {
      console.log("Can't set config. Error: " + e);
    }

    var options = {
      accessKeyId: global.AccessKeyId,
      secretAccessKey: global.SecretAccessKey,
      credentials: global.Credentials,
      region: global.Region,
      tableName: global.Table,
      level: global.LogLevel
    };
    
    dynamo.add(winston.transports.DynamoDB, options);
}

if (global.LogToCmd === "true") {
    dynamo.add(winston.transports.Console);
    dynamo.DEBUG("Added console transport!", { 'Appl': global.Appl});
}

try {
  dynamo.DEBUG('Logger instantiated', { 'Appl': global.Appl });
} catch(e) {
  console.log("Can't instantiate Logger. Error: " + e);
}

module.exports=dynamo;
