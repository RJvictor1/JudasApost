import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CashPage } from './cash';

@NgModule({
  declarations: [
    CashPage,
  ],
  imports: [
    IonicPageModule.forChild(CashPage),
  ],
})
export class CashPageModule {}
