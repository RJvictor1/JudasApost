import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';

/**
 * Generated class for the PrimarytabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-primarytabs',
  templateUrl: 'primarytabs.html'
})
export class PrimarytabsPage {
  //responsavel por chamar componente
  cashRoot = 'CashPage'
  prataRoot = 'PrataPage'
  lojaRoot = 'LojaPage'
  lucrosRoot = 'LucrosPage'


  constructor(public navCtrl: NavController,
    public menuCtrl : MenuController) {
    this.menuCtrl.enable(true);
  }

}
