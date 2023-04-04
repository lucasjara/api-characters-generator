'use strict'

const cors = require('cors');
const express = require('express');
const http = require('http');
const utilities = require('../commons/utilities');

//Routers
const loginRoutes = require('../routes/login/login.router');

//Server listener port socket connection
let _httpServer;

const DEFAULT_INIT_URL_API = "/api";
const DEFAULT_INIT_URL_API_VERSION = "/api/v{0}";

class ApiService{
    constructor(){
        
        let url_this_server =  process.env.SERVER_ENDPOINT + process.env.API_PORT + DEFAULT_INIT_URL_API;

        //Routes and Controllers instance
        this._loginRoutes  = new loginRoutes();
        
        this.api = express();
        this.bodyParser = require('body-parser');
        this._setConfigApi();
        this._definitionsUrlListenersApi(); 
    }
    
    /**
     * Set initial configurations 
     * express using bodyParser for communication 
     */
    _setConfigApi(){
        try {            
            // Add middleware for parsing URL encoded bodies (which are usually sent by browser)
            this.api.use(cors());
            
            //setup bodyParser default communication obj
            this.api.use(this.bodyParser.json());
            this.api.use(this.bodyParser.urlencoded({
                extended: true
            }));
        } 
        catch (error) {
            console.warn('💥 Error Configuration Express BodyParse JSON: '+error); 
        }

        this.api.listen(process.env.API_PORT).on('listening', () => {
            console.log(`📡  Api listener http on port: ${process.env.API_PORT}`);
        });
    }
    
    /**
     * Definition URLs listeners Api 
     */
    _definitionsUrlListenersApi(){
        // default route
        this.api.get(DEFAULT_INIT_URL_API, function (req, res) {return res.send("<div><h1> Js APIs </h1></div>");});

        this.api.use(DEFAULT_INIT_URL_API, this._loginRoutes.router);

    }
}

module.exports = ApiService;