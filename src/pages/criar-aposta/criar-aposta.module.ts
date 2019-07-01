import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriarApostaPage } from './criar-aposta';

@NgModule({
  declarations: [
    CriarApostaPage,
  ],
  imports: [
    IonicPageModule.forChild(CriarApostaPage),
  ],
})
export class CriarApostaPageModule {}
