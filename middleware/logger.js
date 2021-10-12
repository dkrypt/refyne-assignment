
const LEVELS = {
    info: 'INFO',
    debug: 'DEBUG',
    error: 'ERROR'
}
const getCurrentTimestamp = () => {
    const now = new Date();
    return `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`;
}
const printLog = (level, msg) => {
    switch (level) {
        case LEVELS.info:
            console.log(`${getCurrentTimestamp()} INFO : ${msg}`);
            break;
        case LEVELS.debug:
            console.log(`${getCurrentTimestamp()} DEBUG: ${msg}`);
            break;
        case LEVELS.error:
            console.log(`${getCurrentTimestamp()} ERROR: ${msg}`);
            break;
        default:
            console.log(`${getCurrentTimestamp()} INFO: ${msg}`);
            break;
    }
}

function logger(){};
logger.prototype.info = (msg) => printLog(LEVELS.info, msg);
logger.prototype.debug = (msg) => printLog(LEVELS.debug, msg);
logger.prototype.error = (msg) => printLog(LEVELS.error, msg);

module.exports = new logger();
