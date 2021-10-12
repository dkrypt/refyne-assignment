const fs = require('fs');

const logger = require('../middleware/logger');

const createDir = (path) => {
    if (fs.existsSync(path)) {
        logger.info(`Directory : ${path}, already exists.`)
    } else {
        fs.mkdirSync(path, {recursive: true});
        logger.info('Successfully created directory : '+path);
    }
}


module.exports = () => {
    createDir('./work');
    createDir('./data');
};
