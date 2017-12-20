winston = require("winston");

var myCustomLevels = { levels: { ERROR: 0, INFO: 1, WARNING: 2, DEBUG: 3 } };

const logFormatter = function(options) {
  return '"' + options.timestamp() + '";"' + options.level + '";"' + (options.message ? options.message : '');
};

const timestamp = function() {
  const d = new Date();
  const h = (d.getHours() < 10) ? '0' + d.getHours() : d.getHours();
  const m = (d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes();
  const s = (d.getSeconds() < 10) ? '0' + d.getSeconds() : d.getSeconds();
  return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + h + ':' + m + ':' + s;
}; 

const file = new (winston.Logger)({
  transports: [
    new (require('winston-daily-rotate-file'))({
      filename: process.env.LOGPATH + '/-ieslog.csv',
      datePattern: 'yyyy-MM-dd',
      timestamp: timestamp,
      formatter: logFormatter,
      prepend: true,
      level: 'DEBUG',
      json: false           
    })
  ],
  levels: myCustomLevels.levels
});

module.exports=file;
