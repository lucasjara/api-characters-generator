'use strict'
const dbController = require('../../db/data-base-controller/data-base.controller');
const Utilities = require('../../commons/utilities');

const QUERY_INSERT_VALIDATE_LOGIN = " select email from cli_client where email = '{0}' and password = '{1}'";
const QUERY_INSERT_VALIDATE_CREATE_USR_EMAIL = " select email from cli_client where email = '{0}'";
const QUERY_INSERT_VALIDATE_CREATE_USR_NDOC  = " select email from cli_client where code = '{0}'";
const QUERY_INSERT_VALIDATE_CREATE_USR = " INSERT INTO cli_client( name, lastname, email, password, code) VALUES "+
                                         " ( '{0}', '{1}', '{2}', '{3}', '{4}')";

const DEFAULT_MSG = {
    msg:{
        code:undefined,
        message:undefined
    }
}

const ERROR_CREATE_USR = {
    EMAIL_ALREADY_EXIST : 10,
    NUMBER_DOC_ALREADY_EXIST : 20
}

class LoginController {
    
    constructor(){}

    login(req, res){
        console.log(req.body.data);
        this._validateLogin(req).then(result => 
        {
            if(result)
            {
                DEFAULT_MSG.msg.code = "200"
                DEFAULT_MSG.msg.message = "login success"
                res.status(200).send(DEFAULT_MSG);
            }
            else
            {
                DEFAULT_MSG.msg.code = "401"
                DEFAULT_MSG.msg.message = "Email or password is incorrect"
                res.status(401).send(DEFAULT_MSG);
            }
        }).catch(error => {
            DEFAULT_MSG.msg.code = "500"
            DEFAULT_MSG.msg.message = "Error server"
            res.status(500).send(DEFAULT_MSG);
        });
    }

    createUsr(req, res){
        console.log(req.body.data);
        this._validateCreateUsr(req).then(result => 
        {
            if(result === ERROR_CREATE_USR.EMAIL_ALREADY_EXIST)
            {
                DEFAULT_MSG.msg.code = "409"
                DEFAULT_MSG.msg.message = "Email already exists!"
                res.status(409).send(DEFAULT_MSG);
                return;
            }
            else if(result === ERROR_CREATE_USR.NUMBER_DOC_ALREADY_EXIST)
            {
                DEFAULT_MSG.msg.code = "409"
                DEFAULT_MSG.msg.message = "Number document already exists!"
                res.status(409).send(DEFAULT_MSG);
                return;
            }

            DEFAULT_MSG.msg.code = "200"
            DEFAULT_MSG.msg.message = "Create usr success"
            res.status(200).send(DEFAULT_MSG);

        }).catch(error => {
            DEFAULT_MSG.msg.code = "500"
            DEFAULT_MSG.msg.message = "Error server"
            res.status(500).send(DEFAULT_MSG);
        });
    }

    async _validateLogin(req){

        const resultInsert = await dbController.executeQuery(
                                    Utilities.stringFormat(QUERY_INSERT_VALIDATE_LOGIN, 
                                    [req.body.data.userlogin.email, req.body.data.userlogin.password]));
        if(!resultInsert || resultInsert.length == 0){
            return Promise.resolve(false);    
        }
        return Promise.resolve(true);
    }

    async _validateCreateUsr(req){
        const resultEmail = await dbController.executeQuery(
            Utilities.stringFormat(QUERY_INSERT_VALIDATE_CREATE_USR_EMAIL, [req.body.data.user.email]));

        const resultDoc = await dbController.executeQuery(
            Utilities.stringFormat(QUERY_INSERT_VALIDATE_CREATE_USR_NDOC, [req.body.data.user.numberDoc]));

        if(resultEmail && resultEmail.length > 0)
        {
            return Promise.resolve(ERROR_CREATE_USR.EMAIL_ALREADY_EXIST);
        }
        else if(resultDoc && resultDoc.length  > 0)
        {
            return Promise.resolve(ERROR_CREATE_USR.NUMBER_DOC_ALREADY_EXIST);
        }

        const resultInsert = await dbController.executeQuery(
            Utilities.stringFormat(QUERY_INSERT_VALIDATE_CREATE_USR, 
                [
                    req.body.data.user.name,
                    req.body.data.user.lastName, 
                    req.body.data.user.email, 
                    req.body.data.user.password, 
                    req.body.data.user.numberDoc 
                ]
            )
        );

        return Promise.resolve();
    }

}

module.exports = LoginController;