'use strict'
const { Pool, Client } = require('pg');

class PostgreSqlConnection{

    /**
     * Constructor define connection type
     * @param {*} connectionType Client / Pool
     * @example new PostgreSqlConnection(PostgreSqlConnection.CONNECTION_TYPES.POOL);
     * @example new PostgreSqlConnection(PostgreSqlConnection.CONNECTION_TYPES.CLIENT);
     */
    constructor(connectionType){
        /**
        * Constant definition 
        * options connections
        */
        this.CONNECTION_TYPES = {
           POOL:1,
           CLIENT:2
        };

        this._propertyConnection = {
            user: process.env.DB_PSQL_USER,
            host: process.env.DB_PSQL_HOST,
            database: process.env.DB_PSQL_NAME_DB,
            password: process.env.DB_PSQL_PASSW,
            port:  process.env.DB_PSQL_PORT,
        };

        this._connectionType = connectionType;

        if(connectionType == PostgreSqlConnection.CONNECTION_TYPES.CLIENT){
            this.connection  = this._createConnectionClient();
        }
        else if(connectionType == PostgreSqlConnection.CONNECTION_TYPES.POOL){
            this.connection  = this._createConnectionPool();
        }
        else{
            this._consoleErrorNotInitializeConnectionType();
        }
    }

    /**
     * Execute query
     * @param {*} sql 
     */
    executeQuery(sql){
        if(this._connectionType){

            this.connection.query(sql, (err, res) => {
                if(err){
                    console.log('💥  Error execute query BD Postgre : ' + JSON.stringify(err));
                    return null; 
                }
                //this.connection.end();
                return res;
            });

        }else{
            this._consoleErrorNotInitializeConnectionType();
        }
    }
    
    /**
     * Create Connection Client Type
     */
    _createConnectionClient(){
        const client = new Client(this._propertyConnection);
        client.connect((err) => {
            if(!!err){
                this._consoleErrorCreateConnection();
            }else{
                this._consoleLogCreateConnectionSuccess();
            }
        });
        return client;
    }
    
    /**
     * Create Connection Pool Type
     */
    _createConnectionPool(){
        
        const pool = new Pool(this._propertyConnection);
        pool.connect((err) => {
            if(!!err){
                this._consoleErrorCreateConnection();
            }else{
                this._consoleLogCreateConnectionSuccess();
            }
        });
        return pool;
    }


    //#==========================
    //# Moderation section
    //#==========================
    _consoleErrorNotInitializeConnectionType(){
        console.warn('💥  Error initialize connection Postgre : Type connection not information on constructor');
    }

    _consoleErrorCreateConnection(){
        console.warn("💥  Error create connection Postgre : " + JSON.stringify(err));
    }

    _consoleLogCreateConnectionSuccess(){
        console.log("🗄️  Create connection Postgre");
    }
}

module.exports = PostgreSqlConnection;