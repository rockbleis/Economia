import { Component, ViewChild, OnInit, EventEmitter, Input, Output  } from '@angular/core';
import { IonicPage, NavController, NavParams, NavPush, AlertController } from 'ionic-angular';


import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from '@firebase/util';
import { TabsPage } from '../tabs/tabs';
import { RegistroPage } from '../registro/registro';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';



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
  @ViewChild('email') email;
  @ViewChild('password') password;
  currentUser:any;
  
  

provider = {
		loggedin: false,
		name: '',
		email: '',
		profilePicture: ''
}

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afDatabase: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    public storage: Storage
  
  ) {
 
    afAuth.authState.subscribe(user => {
      if (!user) {
        this.currentUser = null;
        return;
      }
      this.currentUser = {uid:user.uid, photoURL: user.photoURL};
      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((response)=>{
      console.log('resultado login google:', response);
      
    this.navCtrl.push(TabsPage);
      
    });
  }

  loginWithEmail(){
    this.afAuth.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
      .then( response => {
        firebase.auth().setPersistence;
        this.provider.loggedin = true;
       this.provider.name = response.displayName;
        this.provider.email = response.email;
        this.provider.profilePicture = response.photoURL;
        console.log('from Email', response);
        this.showAlert('Success! you\'re logged in by Email');
        this.storage.set('statelogin', 'true');
        this.storage.set('providers',this.provider);
        this.navCtrl.setRoot(HomePage, this.provider);
      })
      .catch( error => {
        console.log('got error',error);
        this.showAlert(error.message);
  });
}
  
  showAlert(message: string) {
    let alert = this.alertCtrl.create({
      title: 'Info',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  } 
  
  
  
  //Inicio Función de Registro
  registro(){
    this.navCtrl.push(RegistroPage);
  
  }

}
