const API_HOST = 'localhost';
const DB_HOST = 'localhost';

module.exports =  {
    port: 4001,
    devPort: 4011,
    apiServer: 'http://'+API_HOST+':4000/api/',
    dbServer: 'mongodb://'+DB_HOST+'/task',
}
