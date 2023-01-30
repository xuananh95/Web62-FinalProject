/**
 * Handling error to stop app from crashing
 */
const fs = require("fs");

const errorHandle = (err, req, res, next) => {
    res.status(res.statusCode);
    const date = new Date();

    // logs format: Date - Time - Error - Path
    const content = `${date.getFullYear()}-${
        date.getMonth() + 1
    }-${date.getDate()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - Error: ${
        err.message
    } - Path: ${req.originalUrl} \n`;
    try {
        if (!fs.existsSync(__dirname + "/../logs")){
            fs.mkdirSync(__dirname + "/../logs")
        }
        fs.appendFileSync(__dirname + "/../logs/errorLogs.txt", content);
    } catch (error) {
        console.log(error);
    }
    res.json({
        statusCode: res.statusCode,
        message: err.message,
        data: null,
    });
};

module.exports = {
    errorHandle,
};
