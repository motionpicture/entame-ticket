/**
 * ルーティング
 */
import * as express from 'express';
import * as path from 'path';
import { mocoinSignInRedirect, mocoinSignOutRedirect } from '../controllers/authorize/authorize.controller';
import authorizeRouter from './authorize';

export default (app: express.Application) => {
    app.use((_req, res, next) => {
        res.locals.NODE_ENV = process.env.NODE_ENV;
        next();
    });

    app.use('/api/authorize', authorizeRouter);
    app.get('/mocoin/signIn', mocoinSignInRedirect);
    app.get('/mocoin/signOut', mocoinSignOutRedirect);

    app.get('*', (_req, res, _next) => {
        const fileName = 'index.html';
        res.sendFile(path.resolve(`${__dirname}/../../../client/${process.env.NODE_ENV}/${fileName}`));
    });
};
