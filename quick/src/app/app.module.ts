import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from "@angular/router";
import { HttpModule } from '@angular/http';
import { FormsModule} from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";

import { AppComponent } from './components/app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app.material.module';
import { AppErrorHandler } from './app-error.handler';

import { HomeComponent } from "./components/home/home.component";
import { CustomersComponent } from "./components/customers/customers.component";
import { ProductsComponent } from "./components/products/products.component";
import { QualityComponent } from "./components/quality/quality.component";
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from "./components/not-found/not-found.component";


import { AppTranslationService, TranslateLanguageLoader } from './services/app-translation.service';
import { ConfigurationService } from './services/configuration.service';
import { AlertService } from './services/alert.service';
import { LocalStoreManager } from './services/local-store-manager.service';
import { EndpointFactory } from './services/endpoint-factory.service';
import { NotificationService } from './services/notification.service';
import { NotificationEndpoint } from './services/notification-endpoint.service';
import { AccountService } from './services/account.service';
import { AccountEndpoint } from './services/account-endpoint.service';
import { AppTitleService } from './services/app-title.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomersComponent,
    ProductsComponent,
    QualityComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRoutingModule,
    FormsModule,  
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateLanguageLoader
      }
    }),
  ],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl },
    { provide: ErrorHandler, useClass: AppErrorHandler },
    AppTranslationService,
    ConfigurationService,
    AlertService,
    ConfigurationService,
    AppTitleService,
    AppTranslationService,
    NotificationService,
    NotificationEndpoint,
    AccountService,
    AccountEndpoint,
    LocalStoreManager,
    EndpointFactory
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
