import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { User } from '../../models/user';
import { AngularFireAuth } from "angularfire2/auth";



/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  
  user = {} as User;
  imageURI:any;
  imageFileName:any;

  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController, 
  
    public navParams: NavParams) {
  }

  async registro(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);
      this.navCtrl.push(LoginPage);
    }
    catch (e) {
      console.error(e);
    }
  }


}