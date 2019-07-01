import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EnderecoService } from '../../services/endereco.service';
import { Usuario } from '../../model/usuario';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Promocao } from '../../model/promocao';

/**
 * Generated class for the InformacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-informacao',
  templateUrl: 'informacao.html',
})
export class InformacaoPage {
  firestore = firebase.firestore();
  usuario : Usuario[]=[];
  uid:string;
  formGroup : FormGroup;
  promocao: Promocao;
  //@ViewChild('cep') cep; // <--

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public enderecoServ : EnderecoService,public firebaseauth: AngularFireAuth,
    public formBuilder : FormBuilder) {

      this.firebaseauth.authState.subscribe( user =>{
        if(user){ this.uid = user.email
          console.log(this.uid);}
        else{this.uid = "false"}
      });

      this.promocao = this.navParams.get('promocao');

      this.formGroup = this.formBuilder.group({
        logradouro : ['',[Validators.required, Validators.minLength(1)]],
        bairro : ['',[Validators.required, Validators.minLength(1)]],
        localidade : ['',[Validators.required, Validators.minLength(1)]],
        uf : ['',[Validators.required, Validators.minLength(1)]],
        cep:['',[Validators.required, Validators.minLength(1)]],
        nome:['',[Validators.required, Validators.minLength(1)]],
        telefone:['',[Validators.required, Validators.minLength(1)]],
        cpf:['',[Validators.required, Validators.minLength(1)]],
        rg:['',[Validators.required, Validators.minLength(1)]]
      });
  }
 

  pegarUsuario(){
    var saldoNav =firebase.firestore().collection('usuario').where("email","==",this.uid);
    saldoNav.get().then(query=> {
     query.forEach(doc =>{
     let saldo = new Usuario();
     saldo.id = doc.id;
     saldo.setDados(doc.data()); 
     this.usuario.push(saldo);
     });
     this.atualizar();
     console.log("ta pegando");
   });
   console.log("ta pegando");
  }

  atualizar(){
    var ref = this.firestore.collection("usuario").doc(this.usuario[0].id);
            ref.update(this.formGroup.value).then(()=> {
              console.log(this.promocao);
              this.navCtrl.push('ComprasPage',{'promocao': this.promocao});
           });
  }



}
