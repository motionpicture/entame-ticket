/**
 * NgModule
 */

// tslint:disable:no-submodule-imports max-line-length
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { AuthIndexComponent } from './components/pages/auth/auth-index/auth-index.component';
import { AuthSigninComponent } from './components/pages/auth/auth-signin/auth-signin.component';
import { AuthSignoutComponent } from './components/pages/auth/auth-signout/auth-signout.component';
import { NotfoundComponent } from './components/pages/notfound/notfound.component';
import { PurchaseBaseComponent } from './components/pages/purchase/purchase-base/purchase-base.component';
import { PurchaseCompleteComponent } from './components/pages/purchase/purchase-complete/purchase-complete.component';
import { PurchaseConfirmComponent } from './components/pages/purchase/purchase-confirm/purchase-confirm.component';
import { AlertModalComponent } from './components/parts/alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './components/parts/confirm-modal/confirm-modal.component';
import { FooterComponent } from './components/parts/footer/footer.component';
import { HeaderComponent } from './components/parts/header/header.component';
import { LoadingComponent } from './components/parts/loading/loading.component';
import { PurchaseContentsComponent } from './components/parts/purchase-contents/purchase-contents.component';


// tslint:disable-next-line:no-stateless-class
@NgModule({
    declarations: [
        AppComponent,
        AuthSigninComponent,
        AuthSignoutComponent,
        PurchaseBaseComponent,
        PurchaseConfirmComponent,
        PurchaseCompleteComponent,
        NotfoundComponent,
        AuthIndexComponent,
        HeaderComponent,
        FooterComponent,
        PurchaseContentsComponent,
        AlertModalComponent,
        LoadingComponent,
        ConfirmModalComponent
    ],
    entryComponents: [
        AlertModalComponent,
        ConfirmModalComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        SwiperModule,
        NgbModule.forRoot()
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
