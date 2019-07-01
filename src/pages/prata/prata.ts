import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import firebase from 'firebase';
import { CriarAposta } from '../../model/criarAposta';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Usuario } from '../../model/usuario';
import { RespostaAposta } from '../../model/respostaAposta';

/**
 * Generated class for the PrataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prata',
  templateUrl: 'prata.html',
})
export class PrataPage {
  resposta : FormGroup;
  information: any[];
  firestore = firebase.firestore();
  uid:string;
  id:string;
  pratas: FormGroup;
  usuario : Usuario[] = [];
  apostas : CriarAposta [] = [];
  nAtualiza = 0;
  formGroup : FormGroup;
  myDate = moment().format();
  respostaAposta: RespostaAposta[]=[];
  atuaRespo: FormGroup;
  veric: RespostaAposta[]=[];
  loadedCountryList: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public firebaseauth: AngularFireAuth,
    public toastCtrl : ToastController,
  public storage: AngularFireStorage,public formBuilder : FormBuilder,private alertCtrl: AlertController) {

    this.firebaseauth.authState.subscribe( user =>{
      if(user){ this.uid = user.email
        this.id = user.uid
        console.log(this.uid);}
      else{this.uid = "false"}
    });
    this.information= this.apostas;
    this.loadedCountryList = this.apostas;
    this.form();
  }
  initializeItems(){
    this.information = this.loadedCountryList;
  }
  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();
    
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.information = this.information.filter((v) => {
      if(v.descricaoAposta && q) {
        if (v.descricaoAposta.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.information.length);

  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Regras',
      subTitle: '<p>Somente e possivel aposta 1 vez em cada aposta.</p> <p>A recopensa e entregue apos o fim da data da aposta.</p> <p> não a cancelamento ou devoluções.</p> <p>O icone de trofeu indica o valor da aposta.</p> ',
      buttons: ['Fechar']
		});
		alert.present();
  }
  avisoAlert() {
    let alert = this.alertCtrl.create({
      title: 'AVISO!',
      subTitle: 'Você ja fez essa aposta!',
      buttons: ['Fechar']
    });
    alert.present();
  }

toggleSection(i){
  this.information[i].open = !this.information[i].open
}


  ionViewDidLoad() {
    this.getList();
    this.exibir();
  }
  FormataHora(){
    for(var i=0; i < this.apostas.length; i++){
      var tempo = new Date(this.apostas[i].dataTermino) ;
      var month = tempo.getMonth().toString();
      var date = tempo.getDate().toString();
      var hora= tempo.getHours().toString();
      var minu= tempo.getMinutes().toString();
      var monthArray = ['Janeiro', 'Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
      this.information[i].dataTermino = date+" "+monthArray[month]+" "+hora+":"+minu;
      console.log(this.information[i].dataTermino);

    }
  }
  dis(i){
    console.log("vai funfar filhão"+i);
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
     console.log(this.usuario);
   })
  }
  getList(){
    var apostaRef = firebase.firestore().collection('CriarAposta').where("status","==","true");
    apostaRef.get().then(query=> {
      query.forEach(doc =>{
      let aposta = new CriarAposta();
      aposta.id = doc.id;
      aposta.setDados(doc.data()); 

      this.apostas.push(aposta);
      });
      this.atualizar();
      this.FormataHora();
    });
  }

  avisoAlert2() {
    let alert = this.alertCtrl.create({
      title: 'AVISO',
      subTitle: 'Você esta pobre!',
      buttons: ['Fechar']
    });
    alert.present();
  }

  form(){
   this.formGroup = this.formBuilder.group({
      status : ["false", [Validators.required]]
    });
    this.resposta = this.formBuilder.group({
      premio: ['false',[Validators.required]],
      idAposta: ['',[Validators.required]],
      idUsuario: ['',[Validators.required]],
      resposta: ['',[Validators.required]],
     cash: ['false',[Validators.required]],
      tempoResposta: [this.myDate,[Validators.required]]
    });

    this.pratas = this.formBuilder.group({
      prata: ['',[Validators.required]]
    });

    this.atuaRespo = this.formBuilder.group({
      premio: ['true',[Validators.required]]
    });
  }

  atualizar(){
    for(var i=0; i < this.apostas.length; i++){
      if(this.apostas[i].dataTermino < this.myDate){
        var ref = this.firestore.collection("CriarAposta").doc(this.apostas[i].id);
        ref.update(this.formGroup.value).then(()=> {
        });
       this.nAtualiza++;

       this.getAposta(this.apostas[i].id, this.apostas[i].respostaCorreta);

      }
    }
    if (this.nAtualiza>0) {
      this.navCtrl.setRoot('PrataPage');

    }
  }

  getAposta(i, j){
    var respostaRef = firebase.firestore().collection('RespostaAposta').where("idAposta","==",i).where("resposta","==",j);
    respostaRef.get().then(query=> {
      query.forEach(doc =>{
      let respota = new RespostaAposta();
      respota.id = doc.id;
      respota.setDados(doc.data()); 
      this.respostaAposta.push(respota);
      });
      for(var v=0; v < this.respostaAposta.length; v++){
        console.log(this.respostaAposta.length)
        var ref = this.firestore.collection("RespostaAposta").doc(this.respostaAposta[v].id);
            ref.update(this.atuaRespo.value).then(()=> {
              console.log("suxesso");
            });
        }
    });

  }
  

  criar(){
    this.navCtrl.setRoot('CriarApostaPage');
  }

  presentConfirm(i) {
    let alert = this.alertCtrl.create({
      title: 'Confirmar Aposta',
      message: 'Deseja fazer essa aposta? isso gastara 10 pratas',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.Resposta(i);
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

  Resposta(a){
    this.veric=[];
    var respostaRef = firebase.firestore().collection('RespostaAposta').where("idAposta","==",this.apostas[a].id).where("idUsuario","==",this.id);
    respostaRef.get().then(query=> {
      query.forEach(doc =>{
      let verificar = new RespostaAposta();
      verificar.id = doc.id;
      verificar.setDados(doc.data()); 
      this.veric.push(verificar);
      });
        console.log(this.veric.length);
        if(this.veric.length > 0){
          console.log('voce ja fez uma aposta');
          this.avisoAlert();
        }

        if(this.veric.length == 0){
          if(this.usuario[0].prata >= '10'){
          this.resposta.value.idAposta = this.apostas[a].id;
          this.resposta.value.idUsuario = this.id;
          console.log(this.id);
          this.firestore.collection("RespostaAposta").add(
            this.resposta.value).then(ref =>{
              //sucesso
              console.log("Cadastrado com Susexo");
            }).catch(err =>{
              console.log(err.mensage);
            });
            this.pratas.value.prata = parseInt(this.usuario[0].prata) - 10;
      
            var ref = this.firestore.collection("usuario").doc(this.usuario[0].id);
            ref.update(this.pratas.value).then(()=> {
              this.usuario[0].prata = this.pratas.value.prata;
              console.log(this.usuario[0].prata);
           });
           this.msgSucesso();
           
          }else{ this.avisoAlert2();}
        }

        
    });

    }

    msgSucesso() {
      const toast = this.toastCtrl.create({
        message: 'Apostado com sucesso',
        duration: 3000
      });
      toast.present();
      
      console.log( 'susexo');
      this.navCtrl.setRoot('PrataPage');
    }
}
