/**
 * authorize
 */
import * as debug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { MocoinAuth2Model } from '../../models/mocoin-auth2/mocoin-auth2.model';
import { errorProsess } from '../base/base.controller';
const log = debug('frontend:authorize');

/**
 * 認証情報取得
 */
export async function getMocoinCredentials(req: Request, res: Response) {
    log('getMocoinCredentials');
    try {
        let authModel;
        authModel = new MocoinAuth2Model((<Express.Session>req.session).mocoin);
        const options = {
            endpoint: (<string>process.env.MOCOIN_API_ENDPOINT),
            auth: authModel.create()
        };
        const accessToken = await options.auth.getAccessToken();
        const credentials = {
            accessToken: accessToken
        };

        const userName = options.auth.verifyIdToken(<any>{}).getUsername();
        res.json({
            credentials: credentials,
            userName: userName
        });
    } catch (err) {
        errorProsess(res, err);
    }
}

/**
 * エンタメコイン サインイン処理
 * @param {Request} req
 * @param {Response} res
 */
export async function mocoinSignIn(req: Request, res: Response) {
    log('mocoinSignIn');
    if (req.session === undefined) {
        throw new Error('session is undefined');
    }
    delete req.session.mocoin;
    const authModel = new MocoinAuth2Model(req.session.mocoin);
    const auth = authModel.create();
    const authUrl = auth.generateAuthUrl({
        scopes: authModel.scopes,
        state: authModel.state,
        codeVerifier: authModel.codeVerifier
    });
    delete req.session.mocoin;
    res.json({
        url: authUrl
    });
}

/**
 * エンタメコイン サインインリダイレクト処理
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function mocoinSignInRedirect(req: Request, res: Response, next: NextFunction) {
    log('mocoinSignInRedirect');
    try {
        if (req.session === undefined) {
            throw new Error('session is undefined');
        }
        const authModel = new MocoinAuth2Model(req.session.mocoin);
        if (req.query.state !== authModel.state) {
            throw (new Error(`state not matched ${req.query.state} !== ${authModel.state}`));
        }
        const auth = authModel.create();
        const credentials = await auth.getToken(
            req.query.code,
            <string>authModel.codeVerifier
        );
        // log('credentials published', credentials);

        authModel.credentials = credentials;
        authModel.save(req.session);

        auth.setCredentials(credentials);
        res.redirect('/#/auth/signin');
    } catch (err) {
        next(err);
    }
}


/**
 * エンタメコイン サインアウト処理
 * @param {Request} req
 * @param {Response} res
 */
export async function mocoinSignOut(req: Request, res: Response) {
    log('mocoinSignOut');
    const authModel = new MocoinAuth2Model((<Express.Session>req.session).mocoin);
    const auth = authModel.create();
    const logoutUrl = auth.generateLogoutUrl();
    log('logoutUrl:', logoutUrl);
    res.json({
        url: logoutUrl
    });
}

/**
 * エンタメコイン サインアウトリダイレクト処理
 * @param {Request} req
 * @param {Response} res
 */
export async function mocoinSignOutRedirect(req: Request, res: Response) {
    log('mocoinSignOutRedirect');
    delete (<Express.Session>req.session).mocoin;
    res.redirect('/#/auth/signout');
}
