var dynamo = require('./../nodeloghlp/dynamodb');

exports.info = function(str, uid, extra) {
  try {
    if (extra)
      dynamo.INFO(str, { 'Appl': global.Appl, 'User': uid, 'Data': extra });
    else if (uid)
      dynamo.INFO(str, { 'Appl': global.Appl, 'User': uid });
    else
      dynamo.INFO(str, { 'Appl': global.Appl});
  } catch(e) {
    console.log("Can't log " + str + ". Error: " + e.message);
  }
}

exports.debug = function(str, uid, extra) {
  try {
    if (extra)
      dynamo.DEBUG(str, { 'Appl': global.Appl, 'User': uid, 'Data': extra });
    else if (uid)
      dynamo.DEBUG(str, { 'Appl': global.Appl, 'User': uid });
    else
      dynamo.DEBUG(str, { 'Appl': global.Appl});
  } catch(e) {
    console.log("Can't log " + str + ". Error: " + e.message);
  }
}

exports.warning = function(str, uid, extra) {
  try {
    if (extra)
      dynamo.WARNING(str, { 'Appl': global.Appl, 'User': uid, 'Data': extra });
    else if (uid)
      dynamo.WARNING(str, { 'Appl': global.Appl, 'User': uid });
    else
      dynamo.WARNING(str, { 'Appl': global.Appl});
  } catch(e) {
    console.log("Can't log " + str + ". Error: " + e.message);
  }
}

exports.error = function(str, uid, extra) {
  try {
    if (extra)
      dynamo.ERROR(str, { 'Appl': global.Appl, 'User': uid, 'Data': extra });
    else if (uid)
      dynamo.ERROR(str, { 'Appl': global.Appl, 'User': uid });
    else
      dynamo.ERROR(str, { 'Appl': global.Appl});
  } catch(e) {
    console.log("Can't log " + str + ". Error: " + e.message);
  }
}

exports.changelevel = function(level, uid) {
  try {
    dynamo.transports.dynamodb.level = level;
    dynamo.log(info, "Log level changed to " + level, { 'Appl': global.Appl, 'User': uid });
    return true;
  } catch(e) {
    dynamo.log(error, "Can't change log level to " + level + ". Error: " + e.message);
    return false;
  }
}