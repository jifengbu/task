const API_HOST = 'localhost';
const DB_HOST = 'localhost';

module.exports =  {
    port: 3001,
    devPort: 3011,
    apiServer: 'http://'+API_HOST+':3000/api/',
    dbServer: 'mongodb://'+DB_HOST+'/task',
}
