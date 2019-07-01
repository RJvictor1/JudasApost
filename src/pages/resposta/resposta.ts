import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { CriarApostaCash } from '../../model/criarApostaCash';
import * as moment from 'moment';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RespostaAposta } from '../../model/respostaAposta';
import { Usuario } from '../../model/usuario';


/**
 * Generated class for the RespostaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resposta',
  templateUrl: 'resposta.html',
})
export class RespostaPage {
  firestore = firebase.firestore();
  apostas : CriarApostaCash [] = [];
  information: any[];
  myDate = moment().format();
  formGroup : FormGroup;
  resposta : FormGroup;
  atuaRespo: FormGroup;
  uid:string;
  id:string;
  respostaAposta: RespostaAposta[]=[];
  veric: RespostaAposta[]=[];
  usuario : Usuario[]=[];
  loadedCountryList: any[];
//separar
  x1=0;
  ceparar:string;
  r1: string=null;
  r2:string=null;
  r3:string=null;
  v:string;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public firebaseauth: AngularFireAuth,public formBuilder : FormBuilder,private alertCtrl: AlertController) {
      this.firebaseauth.authState.subscribe( user =>{
        if(user){ this.uid = user.email
          this.id = user.uid
          this.exibir();
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

  ionViewDidLoad() {
    this.getList();
  }
  aplicar(i){
    if(this.apostas[i].cardR == "checkbox"){
      this.resposta.value.respostaCorreta1 = this.r1;
      this.resposta.value.respostaCorreta2 = this.r2;
      this.resposta.value.respostaCorreta3 = this.r3;
      this.apostas[i].respostaCorreta1 = this.resposta.value.respostaCorreta1;
      this.apostas[i].respostaCorreta2 = this.resposta.value.respostaCorreta2;
      this.apostas[i].respostaCorreta3 = this.resposta.value.respostaCorreta3;

    }else{
    this.apostas[i].respostaCorreta1 = this.resposta.value.respostaCorreta1;}
    
    var ref = this.firestore.collection("CriarApostaCash").doc(this.apostas[i].id);
    ref.update(this.resposta.value).then(()=> {
      console.log("ta pegando aki");
      this.getAposta(this.apostas[i].id, this.apostas[i].respostaCorreta1, this.apostas[i].respostaCorreta2, this.apostas[i].respostaCorreta3, this.apostas[i].cardR);
    });
  }
 

  getList(){

    var apostaRef = firebase.firestore().collection('CriarApostaCash').where("status","==","espera");
    apostaRef.get().then(query=> {
      query.forEach(doc =>{
      let aposta = new  CriarApostaCash();
      aposta.id = doc.id;
      aposta.setDados(doc.data()); 
      this.apostas.push(aposta);
      console.log(this.apostas);
      });
      this.FormataHora();
    });
  }

  exibir(){
    var saldoNav =firebase.firestore().collection('usuario').where("email","==",this.uid);
    saldoNav.get().then(query=> {
     query.forEach(doc =>{
     let saldo = new Usuario();
     saldo.id = doc.id;
     saldo.setDados(doc.data()); 
     this.usuario.push(saldo);
     if(this.usuario[0].admin == "true"){
     }else{ this.navCtrl.setRoot('PrimarytabsPage');}
     });
   })
  }

  form(){
     this.resposta = this.formBuilder.group({
      respostaCorreta1: ['',[Validators.required]],
      respostaCorreta2: ['',[Validators.required]],
      respostaCorreta3: ['',[Validators.required]],
      status : ["false", [Validators.required]]
    });
    this.atuaRespo = this.formBuilder.group({
      premio: ['true',[Validators.required]],
      cash: ['true',[Validators.required]]
    });
    }
    presentAlert() {
      let alert = this.alertCtrl.create({
        title: 'Regras',
        subTitle: '<p>Somente e possivel aposta 1 vez em cada aposta.</p> <p>A recopensa e entregue apos o fim da data da aposta.</p> <p> não a cancelamento ou devoluções.</p> <p>O icone de trofeu indica o valor da aposta.</p> ',
        buttons: ['Fechar']
      });
      alert.present();
    }
    voltar(){
      this.navCtrl.setRoot('CashPage');
    }

  getAposta(i, j, q, e, r){
    if(r != "checkbox"){
    var respostaRef = firebase.firestore().collection('RespostaAposta').where("idAposta","==",i).where("resposta","==",j);
  }else{  
     respostaRef = firebase.firestore().collection('RespostaAposta').where("idAposta","==",i).where("resposta1","==",j).where("resposta2","==",q).where("resposta3","==",e);
  }
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
              this.navCtrl.setRoot('RespostaPage');
            });
        }
    });

  }


//separado
  toggleSection(i){
    this.information[i].open = !this.information[i].open;
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


  Change(w, i){
    console.log(i);
    if(this.ceparar==null){
        this.ceparar= i;
        this.v= i;
        console.log("nulão"+this.v);
    }else if(i != this.ceparar){ this.information[this.v].open = !this.information[this.v].open; this.r1= null; this.r2=null; this.r3=null; this.x1=0; this.v= i; this.ceparar = i;
      console.log("ELSE do NULÂO"+this.v);}

    if(this.x1<3){
      console.log("primeiro IF");
      if(this.r1 == null  && w != this.r2 && w != this.r3 ){
        this.r1 = w;
        this.x1++;
        console.log(this.r1+"primeira Condi");
      }else if(this.r2 == null && w != this.r1 && w != this.r3){
        this.r2 = w;
        this.x1++;
        console.log(this.r2+"segunda condi");
      }else if(this.r3 == null && w != this.r2 && w != this.r1){
          this.r3 = w;
          this.x1++;
          console.log(this.r3+"terceira condi");
      }else
      if(this.x1==2 && w == this.r1){
        this.r1=null;
        this.x1--;
      }else if(this.x1==2 && w == this.r2){
        this.r2=null;
        this.x1--;
      }else if(this.x1==2 && w == this.r3){
        this.r3=null;
        this.x1--;
      }else
      if(this.x1==1 && w == this.r1){
        this.r1=null;
        this.x1--;
      }else if(this.x1==1 && w == this.r2){
        this.r2=null;
        this.x1--;
      }else if(this.x1==1 && w == this.r3){
        this.r3=null;
        this.x1--;
      }

    }else{ console.log("ELSE");
      if(this.x1==3 && w == this.r1){
        this.r1=null;
        this.x1--;
      }else if(this.x1==3 && w == this.r2){
        this.r2=null;
        this.x1--;
      }else if(this.x1==3 && w == this.r3){
        this.r3=null;
        this.x1--;
      }
     
    }

  }

}
