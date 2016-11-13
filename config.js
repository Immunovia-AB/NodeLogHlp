exports.set = function(app, table, path) {
    global.Appl = app;
    global.Table = table;
    if (process.env.AWS_REGION) {    
        global.AccessKeyId = process.env.AWS_ACCESS_KEY;
        global.SecretAccessKey = process.env.AWS_SECRET_KEY;
        global.Region = process.env.AWS_REGION;
        global.LogLevel = process.env.LOGLEVEL;
    } else {
        var fs = require("fs");
        var file = fs.readFileSync(path + "/config.json");
        var config = JSON.parse(file);
        global.AccessKeyId = config.accessKeyId;
        global.SecretAccessKey = config.secretAccessKey;
        global.Region = config.region;
        global.LogLevel = config.logLevel;
    }
}