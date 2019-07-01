import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarApostaPage } from './editar-aposta';

@NgModule({
  declarations: [
    EditarApostaPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarApostaPage),
  ],
})
export class EditarApostaPageModule {}
