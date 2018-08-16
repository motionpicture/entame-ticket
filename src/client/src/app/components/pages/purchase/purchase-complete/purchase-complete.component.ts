import { Component, OnInit } from '@angular/core';
import { MocoinService } from '../../../../services/mocoin/mocoin.service';

@Component({
    selector: 'app-purchase-complete',
    templateUrl: './purchase-complete.component.html',
    styleUrls: ['./purchase-complete.component.scss']
})
export class PurchaseCompleteComponent implements OnInit {

    constructor(
        private mocoin: MocoinService
    ) { }

    public ngOnInit() {
    }

    public async signOut() {
        try {
            await this.mocoin.signOut();
        } catch (err) {
            console.error(err);
        }
    }

}
