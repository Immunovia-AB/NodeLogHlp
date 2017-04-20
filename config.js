var fs = require('fs');

var confMap = {
    'AWS_DEFAULT_REGION': 'region',
    'LOGLEVEL': 'logLevel',
    'LOG_TO_CMD': 'logToCmd',
    'LOG_TO_DYNAMODB': 'logToDynamoDB'
};

var defaults = {
    'LOGLEVEL': 'INFO',
    'LOG_TO_CMD': "false",
    'LOG_TO_DYNAMODB': "true",
};

function getConfigVariable(name, configFile) {

    if (typeof process.env[name] != 'undefined') {
        return process.env[name];
    }

    if (configFile) {
        if (typeof configFile[name] != 'undefined') {
            return configFile[name];
        }
        else if (typeof configFile[confMap[name]] != 'undefined') {
            return configFile[confMap[name]];
        }
    }

    if (typeof defaults[name] != 'undefined') {
        console.log("Config for option " + name + " not found. Using default value " + defaults[name]);
        return defaults[name];
    }

    throw {
        name: "ConfigError",
        message: "Missing config for option  " + name + ".",
    };
}

exports.set = function(app, table, path) {
    global.Appl = app;
    global.Table = table;

    var config;

    try {
        config = JSON.parse(fs.readFileSync(path + '/config.json'));
    }
    catch (err) {
        if (err.code == "ENOENT") {
            console.log("No config file found.");
            return false;
        }
        else {
            throw err;
        }
    }

    global.Region           = getConfigVariable('AWS_DEFAULT_REGION', config);
    global.LogLevel         = getConfigVariable('LOGLEVEL', config);
    global.LogToCmd         = getConfigVariable('LOG_TO_CMD', config);
    global.LogToDynamoDB    = getConfigVariable('LOG_TO_DYNAMODB', config);
    return true;
};
