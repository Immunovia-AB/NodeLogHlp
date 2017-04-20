var dynamo = require('./../nodeloghlp/dynamodb');

exports.info = function(str, uid, extra) {
  try {
    if (!str)
      return false;
    if (extra)
      dynamo.INFO(str, { 'Appl': global.Appl, 'User': uid, 'Data': extra });
    else if (uid)
      dynamo.INFO(str, { 'Appl': global.Appl, 'User': uid });
    else
      dynamo.INFO(str, { 'Appl': global.Appl});
    return true;
  } catch(e) {
    console.log("Can't log " + str + ". Error: " + e.message);
    return false;
  }
}

exports.debug = function(str, uid, extra) {
  try {
    if (!str)
      return false;
    if (extra)
      dynamo.DEBUG(str, { 'Appl': global.Appl, 'User': uid, 'Data': extra });
    else if (uid)
      dynamo.DEBUG(str, { 'Appl': global.Appl, 'User': uid });
    else
      dynamo.DEBUG(str, { 'Appl': global.Appl});
    return true;
  } catch(e) {
    console.log("Can't log " + str + ". Error: " + e.message);
    return false;
  }
}

exports.warning = function(str, uid, extra) {
  try {
    if (!str)
      return false;
    if (extra)
      dynamo.WARNING(str, { 'Appl': global.Appl, 'User': uid, 'Data': extra });
    else if (uid)
      dynamo.WARNING(str, { 'Appl': global.Appl, 'User': uid });
    else
      dynamo.WARNING(str, { 'Appl': global.Appl});
    return true;
  } catch(e) {
    console.log("Can't log " + str + ". Error: " + e.message);
    return false;
  }
}

exports.error = function(str, uid, extra) {
  try {
    if (!str)
      return false;
    if (extra)
      dynamo.ERROR(str, { 'Appl': global.Appl, 'User': uid, 'Data': extra });
    else if (uid)
      dynamo.ERROR(str, { 'Appl': global.Appl, 'User': uid });
    else
      dynamo.ERROR(str, { 'Appl': global.Appl});
    return true;
  } catch(e) {
    console.log("Can't log " + str + ". Error: " + e.message);
    return false;
  }
}

exports.changelevel = function(level, uid) {
  try {
    if(!dynamo.levels.hasOwnProperty(level)) return false;
    dynamo.transports.dynamodb.level = level;
    dynamo.INFO("Log level changed to " + level, { 'Appl': global.Appl, 'User': uid });
    return true;
  } catch(e) {
    console.log("Can't change log level to " + level + ". Error: " + e.message);
    return false;
  }
}