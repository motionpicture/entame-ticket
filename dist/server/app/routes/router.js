"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const authorize_controller_1 = require("../controllers/authorize/authorize.controller");
const authorize_1 = require("./authorize");
exports.default = (app) => {
    app.use((_req, res, next) => {
        res.locals.NODE_ENV = process.env.NODE_ENV;
        next();
    });
    app.use('/api/authorize', authorize_1.default);
    app.get('/mocoin/signIn', authorize_controller_1.mocoinSignInRedirect);
    app.get('/mocoin/signOut', authorize_controller_1.mocoinSignOutRedirect);
    app.get('*', (_req, res, _next) => {
        const fileName = 'index.html';
        res.sendFile(path.resolve(`${__dirname}/../../../client/${process.env.NODE_ENV}/${fileName}`));
    });
};
