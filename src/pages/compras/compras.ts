import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Promocao } from '../../model/promocao';
import * as moment from 'moment';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Usuario } from '../../model/usuario';

/**
 * Generated class for the ComprasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-compras',
  templateUrl: 'compras.html',
})
export class ComprasPage {
  promocao: Promocao;
  formGroup: FormGroup;
  myDate = moment().format();
  pagamento:string;
  firestore = firebase.firestore();
  uid:string;
  usuario : Usuario[]=[];
  email: string;
  saldos: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder : FormBuilder,public firebaseauth: AngularFireAuth,) {
      this.promocao = this.navParams.get('promocao');
      
      this.firebaseauth.authState.subscribe( user =>{
        if(user){ this.uid = user.uid; 
            this.email = user.email;
          this.form();
          console.log(this.uid);}
        else{this.uid = "false"}
      });
  }
  ionViewDidLoad() {
    this.exibir();
  }

  form(){
    this.formGroup = this.formBuilder.group({ 
      dataCampra: [this.myDate,[Validators.required]],
      idUsuario: [this.uid,[Validators.required]],
      idPacote:  ['',[Validators.required]],
      formapagemento: ['',[Validators.required]]
    });
    this.saldos = this.formBuilder.group({
      saldo: ['',[Validators.required]],
      prata: ['',[Validators.required]]
    });
  }
  efetuar(){
  
    this.formGroup.value.idPacote = this.promocao.id;
    this.formGroup.value.formapagemento = this.pagamento;
    console.log(this.pagamento);
    this.firestore.collection("historicoCompra").add(
      this.formGroup.value).then(ref =>{


        this.saldos.value.saldo = parseInt(this.usuario[0].saldo) + parseInt( this.promocao.saldo);
        this.saldos.value.prata = parseInt(this.usuario[0].prata) + parseInt(this.promocao.prata);

        var ref = this.firestore.collection("usuario").doc(this.usuario[0].id);
        ref.update(this.saldos.value).then(()=> {
      });
      this.navCtrl.setRoot('LojaPage');
        console.log("Cadastrado com Susexo");
      }).catch(err =>{
        console.log(err.mensage);
      });
  }

  exibir(){
    var saldoNav =firebase.firestore().collection('usuario').where("email","==",this.email);
    saldoNav.get().then(query=> {
     query.forEach(doc =>{
     let saldo = new Usuario();
     saldo.id = doc.id;
     saldo.setDados(doc.data()); 
     this.usuario.push(saldo);
     });
     console.log(this.usuario)
   })
  }

}
