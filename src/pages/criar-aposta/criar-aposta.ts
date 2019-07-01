import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import * as moment from 'moment'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import firebase from 'firebase';
import { CriarAposta } from '../../model/criarAposta';
import { Usuario } from '../../model/usuario';

/**
 * Generated class for the CriarApostaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-criar-aposta',
  templateUrl: 'criar-aposta.html',
})
export class CriarApostaPage {
  uid:string;
  pratas : FormGroup;
  firestore = firebase.firestore();
  formGroup : FormGroup;
  criarAposta : CriarAposta[] = [];
  usuario : Usuario[] = [];
  resposta1 : string;
  resposta2 : string;
  resposta3 : string=null;
  myDate = moment (). format ();
  pepperoni: boolean=true;
 
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public toastCtrl : ToastController,
    public formBuilder : FormBuilder,
    public firebaseauth: AngularFireAuth,
    public storage: AngularFireStorage) {


      this.firebaseauth.authState.subscribe( user =>{
        if(user){ this.uid = user.email 
         this.form();
          console.log(this.uid);}
        else{this.uid = "false"}
      });


  }
  ionViewDidLoad(){
    this.exibir();
  }
  voltar(){
    this.navCtrl.setRoot('PrataPage');
  }
  Change() {
    this.pepperoni = !this.pepperoni;
    console.log(this.pepperoni);
    if(this.pepperoni == false){
     this.resposta3=null;
     console.log(this.resposta3);
    }
}
  exibir(){
    var nomeCard =firebase.firestore().collection('usuario').where("email","==",this.uid);
    nomeCard.get().then(query=> {
     query.forEach(doc =>{
     let p = new Usuario();
     p.id = doc.id;
     p.setDados(doc.data()); 
     this.usuario.push(p);
     });
     console.log(this.usuario)
   })
  }
  form(){
    this.formGroup = this.formBuilder.group({
      descricaoAposta: ['',[Validators.required, Validators.minLength(4)]],
      resposta1: ['',[Validators.required, Validators.minLength(1)]],
      resposta2: ['',[Validators.required, Validators.minLength(1)]],
      resposta3: ['',[Validators.required, Validators.minLength(1)]],
      respostaCorreta: ['',[Validators.required]],
      dataTermino: ['',[Validators.required]],
      email: [this.uid,[Validators.required]],
      dataCriado: [this.myDate,[Validators.required]],
      status: ['true',[Validators.required]],
      nome: ['',[Validators.required]],
   
    });

      this.pratas = this.formBuilder.group({
        prata: ['',[Validators.required]]
      })

  }

  add(){

    //Tenta cadastrar a mensagem
    this.firestore.collection("CriarAposta").add(
      this.formGroup.value).then(ref =>{
        console.log("Cadastrado com Susexo");
        console.log(this.pratas.value.prata);
        this.msgSucesso();
      }).catch(err =>{
        console.log(err.mensage);
      });
      this.pratas.value.prata = parseInt(this.usuario[0].prata) - 10;

      var ref = this.firestore.collection("usuario").doc(this.usuario[0].id);
      ref.update(this.pratas.value).then(()=> {
     });
  }

  msgSucesso() {
    const toast = this.toastCtrl.create({
      message: 'Criado com sucesso',
      duration: 3000
    });
    toast.present();
    
    console.log( 'susexo');
    this.navCtrl.setRoot('PrataPage');
  }
  
}
