'use strict'

const cors = require('cors');
const express = require('express');
const http = require('http');
const fs = require("fs");
const utilities = require('../commons/utilities');

//Routers
const loginRoutes = require('../routes/login/login.router');

//Server listener port socket connection
let _httpServer;

const DEFAULT_INIT_URL_API = "/api";
const DEFAULT_INIT_URL_API_VERSION = "/api/v{0}";

//import { Configuration, OpenAIApi } from require("openai");

const Configuration = require('openai').Configuration;
const OpenAIApi = require('openai').OpenAIApi;


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
    async _definitionsUrlListenersApi(){
        // default route
        this.api.get(DEFAULT_INIT_URL_API, function (req, res) {return res.send("<div><h1> Js APIs </h1></div>");});
        this.api.use(DEFAULT_INIT_URL_API, this._loginRoutes.router);
        // --- list Data Json ---
        this.api.get('/listData', async function (req, res) {
            await esperada(res);
         });
         async function esperada(res){
            var contenido ="";

            fs.readFile( __dirname + "/../resources/" + "data.json", 'utf8', function (err, datas) {
                var data = JSON.parse(datas);
                var array = [];
                for (let i = 0; i < 3; i++) {
                    let value = utilities.GetRandomInt(4)+1;
                    array[i]=value;
                }
                var type = data.type[array[0]].name;
                var skill = data.skills[array[1]].name;
                var history = data.history[array[2]].name;
                
                contenido ="Crea una historia de un "+type+" con "+skill+" inspirada en "+history+" en 200 caracteres"; 
                return res.send(SendContent(contenido));
            });
         }
         async function SendContent(contenido){
            const configuration = new Configuration({
                organization: "API_ORG",
                apiKey: "API_KEY",
            });
            
            let openai = new OpenAIApi(configuration);
            //const responses = await openai.listEngines();
            
            const axios = require('axios');
            const OPENAI_API_KEY = 'API_KEY';

            const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
            };

            const data = {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                role: 'user',
                content: contenido
                }
            ],
            temperature: 0.7
            };
            console.log(data);
            axios.post('https://api.openai.com/v1/chat/completions', data, { headers })
            .then(response => {
                console.log("1");
                return response.data.choices[0].message.content;
            })
            .catch(error => {
                console.log("2");
                return error;
            });
         }
    }
    
}

module.exports = ApiService;