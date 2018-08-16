import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MocoinService } from '../../../services/mocoin/mocoin.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public isLoading: boolean;

    constructor(
        private mocoin: MocoinService,
        private modal: NgbModal
    ) { }

    public ngOnInit() {
        this.isLoading = false;
    }

    public confirm() {
        this.openConfirm({
            title: '確認',
            body: 'ログアウトしますか？',
            done: async () => {
                this.isLoading = true;
                try {
                    await this.mocoin.getServices();
                    await this.mocoin.signOut();
                } catch (err) {
                    console.error(err);
                    this.isLoading = false;
                }
            }

        });
    }

    private openConfirm(args: {
        title: string;
        body: string;
        done: Function
    }) {
        const modalRef = this.modal.open(ConfirmModalComponent, {
            centered: true
        });
        modalRef.result.then(async () => {
            await args.done();
        }).catch(() => {

        });

        modalRef.componentInstance.title = args.title;
        modalRef.componentInstance.body = args.body;
    }
}
