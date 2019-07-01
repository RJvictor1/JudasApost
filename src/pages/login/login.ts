import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, MenuController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../model/usuario';
import { AngularFireStorage } from 'angularfire2/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  uid : string;
  judas: string = "login";
  @ViewChild('usuario') email;
  @ViewChild('senha') senha;

  firestore = firebase.firestore();
  formGroup : FormGroup;
  usuario : Usuario[] = [];
  senha1:string;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilder : FormBuilder,
     public firebaseauth : AngularFireAuth,
     public toastCtrl : ToastController,
     public storage: AngularFireStorage,
     public menuCtrl: MenuController) {

      this.firebaseauth.authState.subscribe( user =>{
        if(user){ this.uid = user.uid 
          this.navCtrl.setRoot('PrimarytabsPage');
        }
        else{this.uid = "false"}
      });
      
      this.form();
  }

  ionViewDidLoad(){
    this.menuCtrl.enable(false);
  }


  form(){
    this.formGroup = this.formBuilder.group({
      nome: ['',[Validators.required]],
      email: ['',[Validators.required]],
      dataNascimento: ['',[Validators.required]],
      sexo: ['',[Validators.required]],
      prata: ['100',[Validators.required]],
      saldo: ['0',[Validators.required]]
     
    })
  }

  add(){ 
    this.formGroup.value.email = this.formGroup.value.email.toLowerCase();
    this.firebaseauth.auth.createUserWithEmailAndPassword(this.email.value,this.senha.value)
      .then(()=> {
         //Tenta cadastrar a mensagem
    this.firestore.collection("usuario").add(
      this.formGroup.value).then(ref =>{
        //sucesso
        console.log("Cadastrado com Susexo");
      }).catch(err =>{
        console.log(err.mensage);
      }); 
        this.msgSucesso();

      }).catch(()=> {
        this.msgErro();
      })
    
  }

  login(){
    this.firebaseauth.auth.signInWithEmailAndPassword(this.email.value,this.senha.value)
    .then(()=>{
     this.msgSucesso();
      })
    .catch(()=>{
      this.msgErro();
      }
    )
  }

  msgSucesso() {
    const toast = this.toastCtrl.create({
      message: 'Sucesso',
      duration: 3000
    });
    toast.present();
    
    console.log( 'susexo');
    this.navCtrl.setRoot('PrimarytabsPage');
  }

  msgErro() {
    const toast = this.toastCtrl.create({
      message: 'Inválido',
      duration: 3000
    });
    toast.present();
  }

}
