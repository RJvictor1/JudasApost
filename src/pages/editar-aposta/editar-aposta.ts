import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CriarApostaCash } from '../../model/criarApostaCash';
import firebase from 'firebase';
import { Categoria } from '../../model/categoria';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as moment from 'moment'; 

/**
 * Generated class for the EditarApostaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-aposta',
  templateUrl: 'editar-aposta.html',
})
export class EditarApostaPage {
  formGroup : FormGroup;
  firestore = firebase.firestore();
  myDate = moment (). format ();
  categoria : Categoria[] = [];
  apostas: CriarApostaCash;
  card:string="simples";
  t:boolean= true;
  imgCard:string="assets/imgs/j.png";
  imgCard2:string="assets/imgs/j.png";
  respost:string="simples";
  teste:string='5';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder : FormBuilder,
    public toastCtrl : ToastController,
    public firebaseauth: AngularFireAuth) {
    this.apostas = this.navParams.get('apostas');
    this.imgCard = this.apostas.imagem1;
    this.imgCard2 = this.apostas.imagem2;
    this.card= this.apostas.cardT;
    this.respost=this.apostas.cardR;
    this.form();
  }

  ionViewDidLoad() {
    console.log(this.apostas);
    this.cateList();
    console.log(this.apostas.descricaoAposta);
  }
  stilozo(){
    this.t= !this.t;
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

  form(){
    this.formGroup = this.formBuilder.group({
      categoria: [this.apostas.categoria,[Validators.required]],
      descricaoAposta: [this.apostas.descricaoAposta,[Validators.required, Validators.minLength(4)]],
      resposta1: [this.apostas.resposta1,[Validators.required, Validators.minLength(1)]],
      resposta2: [this.apostas.resposta2,[Validators.required, Validators.minLength(1)]],
      resposta3: [this.apostas.resposta3,[Validators.required, Validators.minLength(1)]],
      resposta4: [this.apostas.resposta4,[Validators.required, Validators.minLength(1)]],
      resposta5: [this.apostas.resposta5,[Validators.required, Validators.minLength(1)]],
      resposta6: [this.apostas.resposta6,[Validators.required, Validators.minLength(1)]],
      resposta7: [this.apostas.resposta7,[Validators.required, Validators.minLength(1)]],
      resposta8: [this.apostas.resposta8,[Validators.required, Validators.minLength(1)]],
      resposta9: [this.apostas.resposta9,[Validators.required, Validators.minLength(1)]],
      resposta10: [this.apostas.resposta10,[Validators.required, Validators.minLength(1)]],
      v1: [this.apostas.v1,[Validators.required, Validators.minLength(1)]],
      v2: [this.apostas.v2,[Validators.required, Validators.minLength(1)]],
      v3: [this.apostas.v3,[Validators.required, Validators.minLength(1)]],
      v4: [this.apostas.v4,[Validators.required, Validators.minLength(1)]],
      v5: [this.apostas.v5,[Validators.required, Validators.minLength(1)]],
      v6: [this.apostas.v6,[Validators.required, Validators.minLength(1)]],
      v7: [this.apostas.v7,[Validators.required, Validators.minLength(1)]],
      v8: [this.apostas.v8,[Validators.required, Validators.minLength(1)]],
      v9: [this.apostas.v9,[Validators.required, Validators.minLength(1)]],
      v10: [this.apostas.v10,[Validators.required, Validators.minLength(1)]],
      vFixo: [this.apostas.vFixo,[Validators.required, Validators.minLength(1)]],
      dataTermino: [this.apostas.dataTermino,[Validators.required]],
      email: [this.apostas.email,[Validators.required]],
      dataCriado: [this.myDate,[Validators.required]],
      status: ['true',[Validators.required]],
      nome: [this.apostas.nome,[Validators.required]],
      imagem1: [this.apostas.imagem1,[Validators.required]],
      imagem2: [this.apostas.imagem2,[Validators.required]],
      imagem3: [this.apostas.imagem3,[Validators.required]],
      cardT: [this.apostas.cardT,[Validators.required]],
      cardR: [this.apostas.cardR,[Validators.required]]

   
    });


  }

  atualizar(){
    this.nulos();
    this.formGroup.value.cardT = this.card;
    this.formGroup.value.cardR = this.respost;
    var ref = this.firestore.collection("CriarApostaCash").doc(this.apostas.id);
    ref.update(this.formGroup.value).then(()=> {
      this.msgSucesso();
    })
    .catch(function(error){
      console.error("Error", error);
    });
    
  }
  msgSucesso() {
    const toast = this.toastCtrl.create({
      message: 'Atualizado com sucesso',
      duration: 3000
    });
    toast.present();
    
    console.log( 'susexo');
    this.navCtrl.setRoot('CashPage');
  }
}
