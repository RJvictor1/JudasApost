import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PrimarytabsPageModule } from '../pages/primarytabs/primarytabs.module';
import { CashPageModule } from '../pages/cash/cash.module';
import { PrataPageModule } from '../pages/prata/prata.module';
import { LojaPageModule } from '../pages/loja/loja.module';
import { LucrosPageModule } from '../pages/lucros/lucros.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../config/firebase.config';
import { AngularFireStorage } from 'angularfire2/storage';
import { HttpClientModule } from '@angular/common/http';
import { EnderecoService } from '../services/endereco.service';
@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    PrimarytabsPageModule,
    CashPageModule,
    PrataPageModule,
    LojaPageModule,
    LucrosPageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    HttpClientModule
  
   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp


   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    EnderecoService,
    AngularFireStorage
  ]
})
export class AppModule {}
