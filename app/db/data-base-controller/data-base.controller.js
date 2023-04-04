'use strict'

const PostgreSqlConnection = require('../connections/postgresql.connection');
const MySqlConnection = require('../connections/mysql.connection');

const DB_TYPES = {
    MYSQL   :  'mysql',
    POSTGRE : 'postgre'
}
/**
 * Instance connection db
 */
let interrelation;

/**
 * Init instance connection
 */
const int = ()=>{
    const dbType = process.env.DB_DEFINITION_TYPE;

    if(dbType === DB_TYPES.MYSQL){
        interrelation = new MySqlConnection();
    }
    else if(dbType === DB_TYPES.POSTGRE){
        interrelation = new PostgreSqlConnection(PostgreSqlConnection.CONNECTION_TYPES.CLIENT);
    }
}   

/**
 * Default Executing query
 * @param {*} query 
 */
const executeQuery = async (query) => {
    return await interrelation.executeQuery(query);
}

module.exports = {
    int,
    executeQuery,
};