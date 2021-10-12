const {v4: uuid} = require('uuid');
const {nanoid} = require('nanoid');
const fs = require('fs');

const logger = require('../middleware/logger');

module.exports = () => {
    if (fs.existsSync('./data/credentials')) {
        logger.info('Credentials exist already');
    } else {
        logger.info('Creating initial admin user');
        const userId = uuid().toString();
        const pwd = nanoid();
        logger.info('Password : '+pwd);
        const passwordBase64 = Buffer.alloc(pwd.length,pwd).toString('base64');
        fs.writeFileSync('./data/credentials', `${userId}\n${passwordBase64}`);
        logger.info('Wrote initial admin identity to ./data/credentials');
    }
};