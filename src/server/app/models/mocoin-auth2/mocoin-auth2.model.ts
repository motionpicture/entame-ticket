import * as mocoin from '@mocoin/api-nodejs-client';
import debug = require('debug');
const log = debug('sskts-frontend:MocoinAuth2Model');
/**
 * 認証セッション
 * @interface IMocoinAuth2Session
 */
export interface IMocoinAuth2Session {
    /**
     * 状態
     */
    state: string;
    /**
     * スコープ
     */
    scopes: string[];
    /**
     * 資格情報
     */
    credentials?: any;
    /**
     * コード検証
     */
    codeVerifier?: string;
}

/**
 * 認証モデル
 * @class MocoinAuth2Model
 */
export class MocoinAuth2Model {
    /**
     * 状態（固定値）
     */
    private static STATE = 'STATE';
    /**
     * 検証コード（固定値）
     */
    private static CODE_VERIFIER = 'CODE_VERIFIER';
    /**
     * 状態
     */
    public state: string;
    /**
     * スコープ
     */
    public scopes: string[];
    /**
     * 資格情報
     */
    public credentials?: any;
    /**
     * コード検証
     */
    public codeVerifier?: string;

    /**
     * @constructor
     * @param {any} session
     */
    constructor(session?: any) {
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
    public create(): mocoin.auth.OAuth2 {
        const auth = new mocoin.auth.OAuth2({
            domain: (<string>process.env.MOCOIN_OAUTH2_SERVER_DOMAIN),
            clientId: (<string>process.env.MOCOIN_CLIENT_ID_OAUTH2),
            clientSecret: (<string>process.env.MOCOIN_CLIENT_SECRET_OAUTH2),
            redirectUri: (<string>process.env.MOCOIN_AUTH_REDIRECT_URI),
            logoutUri: (<string>process.env.MOCOIN_AUTH_LOGUOT_URI),
            state: this.state,
            scopes: <any>this.scopes.join(' ')
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
    public save(session: Express.Session): void {
        const authSession: IMocoinAuth2Session = {
            state: this.state,
            scopes: this.scopes,
            credentials: this.credentials,
            codeVerifier: this.codeVerifier
        };
        session.mocoin = authSession;
    }
}
