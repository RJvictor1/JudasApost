import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as moment from 'moment'; 
import { Usuario } from '../../model/usuario';
import firebase from 'firebase';
import { Categoria } from '../../model/categoria';

/**
 * Generated class for the CapostaCashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-caposta-cash',
  templateUrl: 'caposta-cash.html',
})
export class CapostaCashPage {
  formGroup : FormGroup;
  myDate = moment (). format ();
  uid: string;
  resposta1 : string;
  resposta2 : string;
  resposta3 : string=null;
  resposta4 : string=null;
  resposta5 : string=null;
  resposta6 : string=null;
  resposta7 : string=null;
  resposta8 : string=null;
  resposta9 : string=null;
  resposta10 : string=null;
  
  firestore = firebase.firestore();
  usuario : Usuario[] = [];
  card:string="simples";
  t:boolean= true;
  imgCard:string="assets/imgs/j.png";
  imgCard2:string="assets/imgs/j.png";
  respost:string="simples";
  teste:string='5';
  categoria : Categoria[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder : FormBuilder,
    public firebaseauth: AngularFireAuth) {
      this.firebaseauth.authState.subscribe( user =>{
        if(user){ this.uid = user.email 
         this.form();
          console.log(this.uid);}
        else{this.uid = "false"}
      });
  }
  ionViewDidLoad(){
    this.exibir();
    this.cateList();
  }

  stilozo(){
    this.t= !this.t;
  }

  form(){
    this.formGroup = this.formBuilder.group({
      categoria: ['',[Validators.required]],
      descricaoAposta: ['',[Validators.required, Validators.minLength(4)]],
      resposta1: ['',[Validators.required, Validators.minLength(1)]],
      resposta2: ['',[Validators.required, Validators.minLength(1)]],
      resposta3: ['',[Validators.required, Validators.minLength(1)]],
      resposta4: ['',[Validators.required, Validators.minLength(1)]],
      resposta5: ['',[Validators.required, Validators.minLength(1)]],
      resposta6: ['',[Validators.required, Validators.minLength(1)]],
      resposta7: ['',[Validators.required, Validators.minLength(1)]],
      resposta8: ['',[Validators.required, Validators.minLength(1)]],
      resposta9: ['',[Validators.required, Validators.minLength(1)]],
      resposta10: ['',[Validators.required, Validators.minLength(1)]],
      v1: ['',[Validators.required, Validators.minLength(1)]],
      v2: ['',[Validators.required, Validators.minLength(1)]],
      v3: ['',[Validators.required, Validators.minLength(1)]],
      v4: ['',[Validators.required, Validators.minLength(1)]],
      v5: ['',[Validators.required, Validators.minLength(1)]],
      v6: ['',[Validators.required, Validators.minLength(1)]],
      v7: ['',[Validators.required, Validators.minLength(1)]],
      v8: ['',[Validators.required, Validators.minLength(1)]],
      v9: ['',[Validators.required, Validators.minLength(1)]],
      v10: ['',[Validators.required, Validators.minLength(1)]],
      vFixo: ['',[Validators.required, Validators.minLength(1)]],
      dataTermino: ['',[Validators.required]],
      email: [this.uid,[Validators.required]],
      dataCriado: [this.myDate,[Validators.required]],
      status: ['true',[Validators.required]],
      nome: ['',[Validators.required]],
      imagem1: ['',[Validators.required]],
      imagem2: ['',[Validators.required]],
      imagem3: ['',[Validators.required]],
      cardT: ['',[Validators.required]],
      cardR: ['',[Validators.required]]

   
    });


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

  nulos(){
    if(this.teste == '2'){
      this.formGroup.value.resposta3 = null ;
      this.formGroup.value.resposta4 = null ;
      this.formGroup.value.resposta5 = null ;
      this.formGroup.value.resposta6 = null ;
      this.formGroup.value.resposta7 = null ;
      this.formGroup.value.resposta8 = null ;
      this.formGroup.value.resposta9 = null ;
      this.formGroup.value.resposta10 = null ;
    }else if(this.teste == '3'){
      this.formGroup.value.resposta4 = null ;
      this.formGroup.value.resposta5 = null ;
      this.formGroup.value.resposta6 = null ;
      this.formGroup.value.resposta7 = null ;
      this.formGroup.value.resposta8 = null ;
      this.formGroup.value.resposta9 = null ;
      this.formGroup.value.resposta10 = null ;
    }else if(this.teste == '4'){
      this.formGroup.value.resposta5 = null ;
      this.formGroup.value.resposta6 = null ;
      this.formGroup.value.resposta7 = null ;
      this.formGroup.value.resposta8 = null ;
      this.formGroup.value.resposta9 = null ;
      this.formGroup.value.resposta10 = null ;
    }else if(this.teste == '5'){
      this.formGroup.value.resposta6 = null ;
      this.formGroup.value.resposta7 = null ;
      this.formGroup.value.resposta8 = null ;
      this.formGroup.value.resposta9 = null ;
      this.formGroup.value.resposta10 = null ;
    }else if(this.teste == '6'){
      this.formGroup.value.resposta7 = null ;
      this.formGroup.value.resposta8 = null ;
      this.formGroup.value.resposta9 = null ;
      this.formGroup.value.resposta10 = null ;
    }else if(this.teste == '7'){
      this.formGroup.value.resposta8 = null ;
      this.formGroup.value.resposta9 = null ;
      this.formGroup.value.resposta10 = null ;
    }else if(this.teste == '8'){
      this.formGroup.value.resposta9 = null ;
      this.formGroup.value.resposta10 = null ;
    }else if(this.teste == '9'){
      this.formGroup.value.resposta10 = null ;
    }
    console.log( this.formGroup.value);
    if(this.respost =='valor'){
      this.formGroup.value.vFixo = null ;
    }
  }

  add(){
    this.nulos();
    this.formGroup.value.cardT = this.card;
    this.formGroup.value.cardR = this.respost;
    console.log(this.formGroup.value);
    //Tenta cadastrar a mensagem
    this.firestore.collection("CriarApostaCash").add(
      this.formGroup.value).then(ref =>{
        console.log("Cadastrado com Susexo");
        this.navCtrl.setRoot('CapostaCashPage');
      }).catch(err =>{
        console.log(err.mensage);
      });
  }

  cateList(){
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
 
}
