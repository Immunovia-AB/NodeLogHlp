var fs = require('fs');

var confMap = {
    'AWS_DEFAULT_REGION': 'region',
    'AWS_ACCESS_KEY': 'accessKeyId',
    'AWS_SECRET_ACCESS_KEY': 'secretAccessKey',
    'LOGLEVEL': 'logLevel',
    'LOG_TO_CMD': 'logToCmd'
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

    throw {
        name: "ConfigError",
        message: "Missing config for variable " + name + ".",
    }
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
        }
        else {
            throw err;
        }
    }

    global.AccessKeyId = getConfigVariable('AWS_ACCESS_KEY', config);
    global.SecretAccessKey = getConfigVariable('AWS_SECRET_ACCESS_KEY', config);
    global.Region = getConfigVariable('AWS_DEFAULT_REGION', config);
    global.LogLevel = getConfigVariable('LOGLEVEL', config);
    global.LogToCmd = getConfigVariable('LOG_TO_CMD', config);
}
