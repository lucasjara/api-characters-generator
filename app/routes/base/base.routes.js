const express = require( 'express');

class BaseRoutes{

    //router;
    
    constructor(){
        this.router = express.Router();
        this.routerV_0_1 = express.Router();
    }

}

module.exports = BaseRoutes;