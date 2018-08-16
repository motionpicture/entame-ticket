import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as mocoin from '@mocoin/api-javascript-client';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MocoinService {

    public auth: mocoin.IImplicitGrantClient;
    public userName?: string;
    public person: mocoin.service.Person;
    public transaction: {
        transferCoin: mocoin.service.transaction.TransferCoin;
        buyCoin: mocoin.service.transaction.BuyCoin;
        withdrawCoin: mocoin.service.transaction.WithdrawCoin;
    };

    constructor(
        private http: HttpClient
    ) { }

    /**
     * getServices
     */
    public async getServices(): Promise<void> {
        try {
            const option = await this.createOption();
            this.person = new mocoin.service.Person(option);
            this.transaction = {
                transferCoin: new mocoin.service.transaction.TransferCoin(option),
                buyCoin: new mocoin.service.transaction.BuyCoin(option),
                withdrawCoin: new mocoin.service.transaction.WithdrawCoin(option)
            };
            console.log(this);
        } catch (err) {
            console.log(err);

            throw new Error('getServices is failed');
        }
    }

    /**
     * サインイン
     */
    public async signIn() {
        const url = '/api/authorize/mocoin/signIn';
        const result = await this.http.get<any>(url, {}).toPromise();
        console.log(result.url);
        location.href = result.url;
    }

    /**
     * サインアップ
     */
    public async signUp() {
        const url = '/api/authorize/signIn';
        const result = await this.http.get<any>(url, {}).toPromise();
        console.log(result.url);
        const signupUrl = (<string>result.url).replace(/\/authorize/, '/signup');
        location.href = signupUrl;
    }

    /**
     * サインアウト
     */
    public async signOut() {
        const url = '/api/authorize/mocoin/signOut';
        const result = await this.http.get<any>(url, {}).toPromise();
        console.log(result.url);
        location.href = result.url;
    }

    /**
     * @method createOption
     */
    public async createOption() {
        await this.authorize();

        return {
            endpoint: environment.MOCOIN_API_ENDPOINT,
            auth: this.auth
        };
    }

    /**
     * @method authorize
     */
    public async authorize() {
        const url = '/api/authorize/mocoin/getCredentials';
        const options = {
            headers: new HttpHeaders({
                'Pragma': 'no-cache',
                'Cache-Control': 'no-cache',
                'If-Modified-Since': new Date(0).toUTCString()
            })
        };
        const result = await this.http.get<{
            credentials: {
                accessToken: string;
            };
            userName?: string;
        }>(url, options).toPromise();
        const option = {
            domain: '',
            clientId: '',
            redirectUri: '',
            logoutUri: '',
            responseType: '',
            scope: '',
            state: '',
            nonce: null,
            tokenIssuer: ''
        };
        this.auth = mocoin.createAuthInstance(option);
        console.log(result);
        this.auth.setCredentials(result.credentials);
        this.userName = result.userName;
    }
}
