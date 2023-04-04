const BaseRoutes = require('../base/base.routes');
const LoginController = require('../../controllers/agreement-account/login.controller');

class loginRoutes extends BaseRoutes{

    constructor(){
        super();
        this.loginController = new LoginController();
        this._definitionRoutes();
    }
    _definitionRoutes(){
        this.router.post("/login", this.loginController.login.bind(this.loginController));
        this.router.post("/login/createusr", this.loginController.createUsr.bind(this.loginController));
    }
}

module.exports = loginRoutes;