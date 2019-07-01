import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Categoria } from '../../model/categoria';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Usuario } from '../../model/usuario';

/**
 * Generated class for the CashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cash',
  templateUrl: 'cash.html',
})
export class CashPage {
  categoria : Categoria[] = [];
  firestore = firebase.firestore();
  usuario : Usuario[]=[];
  uid:string;

  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
     public navParams: NavParams,
    public firebaseauth: AngularFireAuth,
    public storage: AngularFireStorage) {
      this.menuCtrl.enable(true);
      this.firebaseauth.authState.subscribe( user =>{
        if(user){ this.uid = user.email
          this.exibir();
          console.log(this.uid.toUpperCase());}
        else{this.uid = "false"}
      });
  }

  ionViewDidLoad() {
   this.getList();
  }

  getList(){
    var categoriaRef = firebase.firestore().collection('Categoria');
    categoriaRef.get().then(query=> {
      query.forEach(doc =>{
      let categorias = new Categoria();
      categorias.id = doc.id;
      categorias.setDados(doc.data()); 

      this.categoria.push(categorias);
      });
    })
  }

  exibir(){
    var saldoNav =firebase.firestore().collection('usuario').where("email","==",this.uid);
    saldoNav.get().then(query=> {
     query.forEach(doc =>{
     let saldo = new Usuario();
     saldo.id = doc.id;
     saldo.setDados(doc.data()); 
     this.usuario.push(saldo);
     });
     console.log(this.usuario)
   });
  }

  criar(){
    this.navCtrl.setRoot('CapostaCashPage');
  }

  detalhar(categoria : Categoria){
    //ir para pagina
    this.navCtrl.setRoot('CardUniversalPage',{'categoria': categoria});
  }

}
