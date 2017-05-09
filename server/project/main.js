import 'babel-polyfill';
import mongoose from 'mongoose';
import Grid  from 'gridfs-stream';

import app from './App';
import config from './config';

// Connect mongoose
if (!config.db) {
    throw new Error('Configuration to MongoDB required');
}
mongoose.Promise = global.Promise; // Use native promises
mongoose.connect(config.db.uri, config.db);
mongoose.gfs = Grid(mongoose.connection.db, mongoose.mongo);

const server = app.listen(config.port, () => {
    const port = server.address().port;
    console.log('Listening at port', port);
});
