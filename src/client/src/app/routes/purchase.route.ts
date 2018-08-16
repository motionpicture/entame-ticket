import { PurchaseBaseComponent } from '../components/pages/purchase/purchase-base/purchase-base.component';
import { PurchaseCompleteComponent } from '../components/pages/purchase/purchase-complete/purchase-complete.component';
import { PurchaseConfirmComponent } from '../components/pages/purchase/purchase-confirm/purchase-confirm.component';

/**
 * 購入ルーティング
 */
export const route = {
    path: 'purchase',
    component: PurchaseBaseComponent,
    canActivate: [],
    children: [
        { path: 'confirm', component: PurchaseConfirmComponent },
        { path: 'complete', component: PurchaseCompleteComponent }
    ]
};
