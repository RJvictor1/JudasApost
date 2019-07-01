import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { CriarApostaCash } from '../../model/criarApostaCash';
import * as moment from 'moment';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Categoria } from '../../model/categoria';
import { RespostaAposta } from '../../model/respostaAposta';
import { Usuario } from '../../model/usuario';



@IonicPage()
@Component({
  selector: 'page-card-universal',
  templateUrl: 'card-universal.html',
  
})
export class CardUniversalPage {
  firestore = firebase.firestore();
  apostas : CriarApostaCash [] = [];
  information: any[];
  nAtualiza = 0;
  myDate = moment().format();
  formGroup : FormGroup;
  resposta : FormGroup;
  atuaRespo: FormGroup;
  uid:string;
  id:string;
  categoria : Categoria;
  respostaAposta: RespostaAposta[]=[];
  veric: RespostaAposta[]=[];
  usuario : Usuario[]=[];
  saldos: FormGroup;
  loadedCountryList: any[];
//separar
  x1=0;
  ceparar:string;
  r1: string=null;
  r2:string=null;
  r3:string=null;
  v:string;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl : ToastController,
    public firebaseauth: AngularFireAuth,public formBuilder : FormBuilder,private alertCtrl: AlertController) {
      this.firebaseauth.authState.subscribe( user =>{
        if(user){ this.uid = user.email
          this.id = user.uid
          console.log(this.uid);}
        else{this.uid = "false"}
      });
      this.categoria = this.navParams.get('categoria');
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
    this.exibir();
  }

  editarAposta(apostas : CriarApostaCash){
    console.log("ok")
    this.navCtrl.push('EditarApostaPage', {'apostas': apostas});
  }

  avisoAlert() {
    let alert = this.alertCtrl.create({
      title: 'AVISO',
      subTitle: 'Você ja fez essa aposta!',
      buttons: ['Fechar']
    });
    alert.present();
  }
  avisoAlert2() {
    let alert = this.alertCtrl.create({
      title: 'AVISO',
      subTitle: 'Você esta pobre!',
      buttons: ['Fechar']
    });
    alert.present();
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
   })
  }

  Resposta(a, data){
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
          this. avisoAlert();
          console.log('voce ja fez uma aposta');
        }

        if(this.veric.length == 0){
          if(parseInt(this.usuario[0].saldo) >= data){
          this.resposta.value.valorApostado= data;
          this.resposta.value.idAposta = this.apostas[a].id;
          this.resposta.value.idUsuario = this.id;
          this.resposta.value.resposta1 = this.r1;
          this.resposta.value.resposta2 = this.r2;
          this.resposta.value.resposta3 = this.r3;
          console.log(this.id);
          this.firestore.collection("RespostaAposta").add(
            this.resposta.value).then(ref =>{
              //sucesso
              console.log("Cadastrado com Susexo");
            }).catch(err =>{
              console.log(err.mensage);
            });
            this.saldos.value.saldo = parseInt(this.usuario[0].saldo) - data;
      
            var ref = this.firestore.collection("usuario").doc(this.usuario[0].id);
            ref.update(this.saldos.value).then(()=> {
              this.usuario[0].saldo = this.saldos.value.saldo;
              console.log(this.usuario[0].saldo);
          });
          this.msgSucesso();
          
        }else{  this. avisoAlert2(); }
        }

        
    });

    }

  getList(){
    var apostaRef = firebase.firestore().collection('CriarApostaCash').where("status","==","true").where("categoria","==",this.categoria.categoria);
    apostaRef.get().then(query=> {
      query.forEach(doc =>{
      let aposta = new  CriarApostaCash();
      aposta.id = doc.id;
      aposta.setDados(doc.data()); 

      this.apostas.push(aposta);
      console.log(this.apostas);
      });
      this.atualizar();
      this.FormataHora();
    });
  }
  form(){
    this.formGroup = this.formBuilder.group({
       status : ["espera", [Validators.required]]
     });
     this.resposta = this.formBuilder.group({
      premio: ['false',[Validators.required]],
      idAposta: ['',[Validators.required]],
      idUsuario: ['',[Validators.required]],
      resposta: ['',[Validators.required]],
      resposta1: ['',[Validators.required]],
      resposta2: ['',[Validators.required]],
      resposta3: ['',[Validators.required]],
      tempoResposta: [this.myDate,[Validators.required]],
      valorApostado: ['',[Validators.required]],
    });
    this.saldos = this.formBuilder.group({
      saldo: ['',[Validators.required]]
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

  atualizar(){
    for(var i=0; i < this.apostas.length; i++){
      if(this.apostas[i].dataTermino < this.myDate){
        var ref = this.firestore.collection("CriarApostaCash").doc(this.apostas[i].id);
        ref.update(this.formGroup.value).then(()=> {
        });
       this.nAtualiza++;
      }
    }
    if (this.nAtualiza>0) {
      this.navCtrl.setRoot('CardUniversalPage',{'categoria': this.categoria});

    }
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

  presentAlertRadio(i){
    let alert = this.alertCtrl.create({
      title: 'Escolhar um valor',
      inputs:  [ 
        {
          name: 'radio1',
          type: 'radio',
          label: 'R$ 2,00',
          value: '2.00',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'R$ 5,00',
          value: '5.00'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'R$ 10,00',
          value: '10.00'
        },
        {
          name: 'radio4',
          type: 'radio',
          label: 'R$ 20,00',
          value: '20.00'
        },
        {
          name: 'radio5',
          type: 'radio',
          label: 'R$ 40,00',
          value: '40.00'
        },
        {
          name: 'radio6',
          type: 'radio',
          label: 'R$ 50,00',
          value: '50.00'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {
            this.Resposta(i, data);
            console.log('Radio data:', data);
            console.log('Confirm Ok');
          }
        }
      ]
    });

     alert.present();
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
  msgSucesso() {
    const toast = this.toastCtrl.create({
      message: 'Apostado com sucesso',
      duration: 3000
    });
    toast.present();
    
    console.log( 'susexo');
    this.navCtrl.setRoot('CardUniversalPage',{'categoria': this.categoria});
  }
}
