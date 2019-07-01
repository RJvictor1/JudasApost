import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import firebase from 'firebase';
import { Usuario } from '../../model/usuario';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { Promocao } from '../../model/promocao';

/**
 * Generated class for the LojaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loja',
  templateUrl: 'loja.html',
})
export class LojaPage{
  firestore = firebase.firestore();
  usuario : Usuario[]=[];
  uid:string;
  promocao: Promocao[]=[];
  


  constructor(public menuCtrl: MenuController,public navCtrl: NavController, public navParams: NavParams,public firebaseauth: AngularFireAuth,
    public storage: AngularFireStorage) {
      this.menuCtrl.enable(true);
      this.firebaseauth.authState.subscribe( user =>{
        if(user){ this.uid = user.email
          console.log(this.uid);}
        else{this.uid = "false"}
      });
  }

  
  getList(){
    var promocaoRef = firebase.firestore().collection('promocao');
    promocaoRef.get().then(query=> {
      query.forEach(doc =>{
      let promo = new Promocao();
      promo.id = doc.id;
      promo.setDados(doc.data()); 

      this.promocao.push(promo);
      });
    })
  }

  ionViewDidLoad() {
    this.getList();
   }
 informacao(promocao : Promocao){

  var saldoNav =firebase.firestore().collection('usuario').where("email","==",this.uid);
  saldoNav.get().then(query=> {
   query.forEach(doc =>{
   let saldo = new Usuario();
   saldo.id = doc.id;
   saldo.setDados(doc.data()); 
   this.usuario.push(saldo);
   });
   console.log(this.usuario[0].saldo);
   if(this.usuario[0].saldo <= '0'){
    this.navCtrl.push('InformacaoPage',{'promocao': promocao});}else{
      this.navCtrl.push('ComprasPage',{'promocao': promocao});
    }
 });

 
 }

}
