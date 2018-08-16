import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@mocoin/api-javascript-client';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { MocoinService } from '../../../../services/mocoin/mocoin.service';
import { AlertModalComponent } from '../../../parts/alert-modal/alert-modal.component';

@Component({
    selector: 'app-purchase-confirm',
    templateUrl: './purchase-confirm.component.html',
    styleUrls: ['./purchase-confirm.component.scss']
})
export class PurchaseConfirmComponent implements OnInit {

    public isLoading: boolean;
    public disabled: boolean;
    public startDate: string;

    constructor(
        private router: Router,
        private mocoin: MocoinService,
        private modal: NgbModal
    ) { }

    public ngOnInit() {
        this.disabled = false;
        this.isLoading = false;
        this.startDate = moment().format('YYYYY/MM/DD HH:mm');
    }

    public async onSubmit() {
        this.isLoading = true;
        this.disabled = true;
        try {
            await this.process();
            this.router.navigate(['/purchase/complete']);
        } catch (err) {
            this.openAlert({
                title: 'エラー',
                body: err.message
            });
            console.error(err);
        }
        this.isLoading = false;
        this.disabled = false;
    }

    private async process() {
        await this.mocoin.getServices();
        // 取引に使用する口座を決定する
        console.log('口座を検索しています...');
        let coinAccounts = await this.mocoin.person.searchCoinAccounts({
            personId: 'me'
        });
        coinAccounts = coinAccounts.filter((a) => a.status === factory.pecorino.accountStatusType.Opened);
        if (coinAccounts.length === 0) {
            throw new Error('コイン口座が存在しません。');
        }
        const coinAccount = coinAccounts[0];
        console.log('コイン口座', coinAccount.accountNumber, 'からコインを出金します...');

        console.log('取引を開始します...');
        const transaction = await this.mocoin.transaction.withdrawCoin.start({
            expires: moment().add(30, 'minutes').toDate(),
            agent: {
                typeOf: factory.personType.Person,
                name: <string>this.mocoin.userName
            },
            recipient: {
                typeOf: factory.personType.Person,
                name: 'モーションピクチャー'
            },
            amount: 1800,
            notes: 'モーションピクチャー注文取引',
            fromLocation: {
                typeOf: factory.ownershipInfo.AccountGoodType.Account,
                accountType: coinAccount.accountType,
                accountNumber: coinAccount.accountNumber
            }
        });
        console.log('取引を開始しました。');

        console.log('取引を確定します...');
        await this.mocoin.transaction.withdrawCoin.confirm(transaction);
        console.log('取引確定です。');
    }

    private openAlert(args: {
        title: string;
        body: string;
    }) {
        const modalRef = this.modal.open(AlertModalComponent, {
            centered: true
        });
        modalRef.componentInstance.title = args.title;
        modalRef.componentInstance.body = args.body;
    }

}
