winston = require("winston");

var myCustomLevels = { levels: { ERROR: 0, INFO: 1, WARNING: 2, DEBUG: 3 } };
const file = new (winston.Logger)({
  transports: [
    new (require('winston-daily-rotate-file'))({
      filename: process.env.LOGPATH + '/-ies.json',
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      level: 'DEBUG'
    })
  ],
  levels: myCustomLevels.levels
});

module.exports=file;
