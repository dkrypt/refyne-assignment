if (process.env.NODE_ENV === 'development') {
    try {
        require('dotenv').config();
    } catch (error) {
        console.log('Error occurred during parsing ".env" file for development.', error);        
    }
}

const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const configureRoutes = require('./startup/routes');
const configureInitialAdmin = require('./startup/initialAdmin');
const configureApp = require('./startup/initApp');
const logger = require('./middleware/logger');

configureApp();
const PORT = config.get('server.port');

const mongoConnectString = `mongodb+srv://${config.get('mongo.client_id')}:${config.get('mongo.client_secret')}@dkrypt-cluster.munpz.mongodb.net/${config.get('mongo.dbName')}?retryWrites=true&w=majority`;
const app = express();
app.use(express.json());
configureRoutes(app);
configureInitialAdmin();
app.get('*', (req, res) => res.send('Welcome to Refyne Car Rental APIs'));
(async () => {
    // console.time('mongo');
    await mongoose.connect(mongoConnectString);
    // console.timeEnd('mongo');
    logger.info('Connected to Mongo.')
    app.listen(PORT, () => logger.info(`Server running. Port : ${PORT}`));
})();

