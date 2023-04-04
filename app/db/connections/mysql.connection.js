'use strict'
const mysql = require('mysql');
const { promisify } = require('util');

class MySqlConnection{
    
    constructor(){
        this.connection  = this._createConnection();
    }

    /**
     * Execute query
     * @param {*} sql 
     */
    async executeQuery(sql){
        const result = await this.connection.query(sql);
        return  result;
    }
    
    /**
     * Create connection 
     * instance
     */
    _createConnection(){
        const connection = mysql.createConnection({
            host: process.env.DB_MYSQL_HOST,
            user: process.env.DB_MYSQL_USER,
            password: process.env.DB_MYSQL_PASSW,
            database: process.env.DB_MYSQL_NAME_DB,
            port: process.env.DB_MYSQL_PORT
        });

        connection.connect(this._checkConnection.bind(this));
        return connection;
    }

    /**
     * Check Error on create 
     * connection instance
     * @param {*} err 
     */
    _checkConnection(err){
        if (err) {
            this._consoleErrorCreateConnection();
        }else{
            this._consoleLogCreateConnectionSuccess();
            this.connection.query = promisify(this.connection.query);
        }
    }

    //#==========================
    //# Moderation section
    //#==========================
    _consoleErrorCreateConnection(){
        console.warn("💥  Error create connection Mysql");
    }

    _consoleLogCreateConnectionSuccess(){
        console.log("🗄️  Create connection Mysql");
    }
}

module.exports = MySqlConnection;