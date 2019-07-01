import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import firebase from 'firebase';
import { RespostaAposta } from '../../model/respostaAposta';
import { Usuario } from '../../model/usuario';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CriarApostaCash } from '../../model/criarApostaCash';

/**
 * Generated class for the LucrosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lucros',
  templateUrl: 'lucros.html',
})
export class LucrosPage {
  judas: string = "prata";
  firestore = firebase.firestore();
  respostaAposta: RespostaAposta[]=[];
  respostaApostac: RespostaAposta[]=[];
  historico: RespostaAposta[]=[];
  aposta: CriarApostaCash[]=[];
  id: string;
  uid: string;
  usuario: Usuario[]=[];
  pratas: FormGroup;
  saldos: FormGroup;
  false: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public firebaseauth: AngularFireAuth,public toastCtrl : ToastController,
    public storage: AngularFireStorage,public formBuilder : FormBuilder) {

      this.firebaseauth.authState.subscribe( user =>{
        if(user){ this.id = user.uid
          this.uid = user.email
          console.log(this.id);}
        else{this.id = "false" }
      });
      this.form();
  }

  ionViewDidLoad() {
   this.getList();
   this.getList2();
   this.getList3();
   this.exibir();
  }
  resgatar(i){
    this.pratas.value.prata = parseInt(this.usuario[0].prata) + 20;
    var ref = this.firestore.collection("usuario").doc(this.usuario[0].id);
      ref.update(this.pratas.value).then(()=> {
       this.usuario[0].prata = this.pratas.value.prata;
        console.log(this.usuario[0].prata);
     });

     var rref = this.firestore.collection("RespostaAposta").doc(this.respostaAposta[i].id);
       rref.update(this.false.value).then(()=> {
        this.navCtrl.setRoot("LucrosPage");
      });
     
  }

  resgatar2(i){
    console.log(this.respostaApostac[i].idAposta);

   var respostaRef = firebase.firestore().collection('CriarApostaCash');

    respostaRef.get().then(query=> {
      query.forEach(doc =>{
      let res = new CriarApostaCash();
      res.id = doc.id;
      res.setDados(doc.data()); 
      this.aposta.push(res);
      });
      
      for(var v=0; v<this.aposta.length;v++){
          if(this.aposta[v].id == this.respostaApostac[i].idAposta){
            
            if(this.aposta[v].cardR != "valor"){
              var s =  parseFloat(this.aposta[v].vFixo) * parseFloat(this.respostaApostac[i].valorApostado);
            }else{ 
              if(this.respostaApostac[i].resposta == "resposta1"){
               s =  parseFloat(this.aposta[v].v1) * parseFloat(this.respostaApostac[i].valorApostado);
             }else if(this.respostaApostac[i].resposta == "resposta2"){
               s =  parseFloat(this.aposta[v].v2) * parseFloat(this.respostaApostac[i].valorApostado);
             }else if(this.respostaApostac[i].resposta == "resposta3"){
               s =  parseFloat(this.aposta[v].v3) * parseFloat(this.respostaApostac[i].valorApostado);
             }else if(this.respostaApostac[i].resposta == "resposta4"){
               s =  parseFloat(this.aposta[v].v4) * parseFloat(this.respostaApostac[i].valorApostado);
             }else if(this.respostaApostac[i].resposta == "resposta5"){
               s =  parseFloat(this.aposta[v].v5) * parseFloat(this.respostaApostac[i].valorApostado);
             }

            }
            this.saldos.value.saldo = parseFloat(this.usuario[0].saldo) + s;

            var ref = this.firestore.collection("usuario").doc(this.usuario[0].id);
              ref.update(this.saldos.value).then(()=> {
              this.usuario[0].saldo = this.saldos.value.saldo;
            });

            var rref = this.firestore.collection("RespostaAposta").doc(this.respostaApostac[i].id);
              rref.update(this.false.value).then(()=> {
               this.msgSucesso(s);
              });
            this.aposta=[];
          }

           
          }
      });

  }
  msgSucesso(i) {
    const toast = this.toastCtrl.create({
      message: 'Resgatado R$'+ i,
      duration: 3000
    });
    toast.present();
    
    console.log( 'susexo');
    this.navCtrl.setRoot("LucrosPage");
  }

  form(){
    this.pratas = this.formBuilder.group({
      prata: ['',[Validators.required]]
    });
    this.false = this.formBuilder.group({
      premio: ['false',[Validators.required]]
    });

    this.saldos=this.formBuilder.group({
      saldo: ['',[Validators.required]]
    });
  }

  getList(){
    var respostaRef = firebase.firestore().collection('RespostaAposta').where("idUsuario","==",this.id).where("premio","==","true").where("cash","==","false");
    respostaRef.get().then(query=> {
      query.forEach(doc =>{
      let respota = new RespostaAposta();
      respota.id = doc.id;
      respota.setDados(doc.data()); 

      this.respostaAposta.push(respota);
      });

    })
  }

  getList2(){
    var respostaRef = firebase.firestore().collection('RespostaAposta').where("idUsuario","==",this.id).where("premio","==","true").where("cash","==","true");
    respostaRef.get().then(query=> {
      query.forEach(doc =>{
      let respot = new RespostaAposta();
      respot.id = doc.id;
      respot.setDados(doc.data()); 

      this.respostaApostac.push(respot);
      });
      console.log(this.respostaApostac);
    })
  }

  getList3(){
    var respostaRef = firebase.firestore().collection('RespostaAposta').where("idUsuario","==",this.id);
    respostaRef.get().then(query=> {
      query.forEach(doc =>{
      let respo = new RespostaAposta();
      respo.id = doc.id;
      respo.setDados(doc.data()); 

      this.historico.push(respo);
      });
      console.log(this.historico);
    })
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
}
