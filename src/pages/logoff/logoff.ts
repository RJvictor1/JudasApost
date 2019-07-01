import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the LogoffPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logoff',
  templateUrl: 'logoff.html',
})
export class LogoffPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public angularfireauth : AngularFireAuth) {
  }

  ionViewDidLoad() {
    this.angularfireauth.auth.signOut().catch().then();
    this.navCtrl.setRoot("LoginPage");
  }

}
