"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocoin = require("@mocoin/api-nodejs-client");
const debug = require("debug");
const log = debug('sskts-frontend:MocoinAuth2Model');
/**
 * 認証モデル
 * @class MocoinAuth2Model
 */
class MocoinAuth2Model {
    /**
     * @constructor
     * @param {any} session
     */
    constructor(session) {
        log('constructor');
        if (session === undefined) {
            session = {};
        }
        // const resourceServerUrl = <string>process.env.RESOURCE_SERVER_URL;
        this.scopes = [
        // 'phone',
        // 'openid',
        // 'email',
        // 'aws.cognito.signin.user.admin',
        // 'profile',
        // `${resourceServerUrl}/transactions`,
        // `${resourceServerUrl}/events.read-only`,
        // `${resourceServerUrl}/organizations.read-only`,
        // `${resourceServerUrl}/orders.read-only`,
        // `${resourceServerUrl}/places.read-only`,
        // `${resourceServerUrl}/people.contacts`,
        // `${resourceServerUrl}/people.creditCards`,
        // `${resourceServerUrl}/people.ownershipInfos.read-only`
        ];
        this.credentials = session.credentials;
        this.state = MocoinAuth2Model.STATE;
        this.codeVerifier = MocoinAuth2Model.CODE_VERIFIER;
    }
    /**
     * 認証クラス作成
     * @memberof MocoinAuth2Model
     * @method create
     * @returns {mocoin.auth.OAuth2}
     */
    create() {
        const auth = new mocoin.auth.OAuth2({
            domain: process.env.MOCOIN_OAUTH2_SERVER_DOMAIN,
            clientId: process.env.MOCOIN_CLIENT_ID_OAUTH2,
            clientSecret: process.env.MOCOIN_CLIENT_SECRET_OAUTH2,
            redirectUri: process.env.MOCOIN_AUTH_REDIRECT_URI,
            logoutUri: process.env.MOCOIN_AUTH_LOGUOT_URI,
            state: this.state,
            scopes: this.scopes.join(' ')
        });
        if (this.credentials !== undefined) {
            auth.setCredentials(this.credentials);
        }
        return auth;
    }
    /**
     * セッションへ保存
     * @memberof MocoinAuth2Model
     * @method save
     * @returns {Object}
     */
    save(session) {
        const authSession = {
            state: this.state,
            scopes: this.scopes,
            credentials: this.credentials,
            codeVerifier: this.codeVerifier
        };
        session.mocoin = authSession;
    }
}
/**
 * 状態（固定値）
 */
MocoinAuth2Model.STATE = 'STATE';
/**
 * 検証コード（固定値）
 */
MocoinAuth2Model.CODE_VERIFIER = 'CODE_VERIFIER';
exports.MocoinAuth2Model = MocoinAuth2Model;
