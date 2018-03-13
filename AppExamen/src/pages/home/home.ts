import { Component } from '@angular/core';
import { NavController,AlertController,ActionSheetController } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { LoginPage } from '../login/login';

declare var contador:number;
declare var contador1:number;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  comments: AngularFireList<any>;
  commentsRef:any;
  currentUser:any;
   contador =0;
   contador1 =0;
  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public afDatabase: AngularFireDatabase,
    public afAuth: AngularFireAuth) {

      this.commentsRef = afDatabase.list('comments');
    this.comments = this.commentsRef.valueChanges();
    

    afAuth.authState.subscribe(user => {
      if (!user) {
        this.currentUser = null;
        return;
      }
      this.currentUser = {uid:user.uid, photoURL: user.photoURL};
      
    });

  }

  agregarComentario(){
    let prompt = this.alertCtrl.create({
      title:'Comentario',
      message:"introduzca el texto",
      inputs: [
        {
        name:'title',
        placeholder: 'texto'
      },
      ],
      buttons: [
        {
          text:'Cancelar',
          handler: data => {
            console.log('click en Cancelar');
          }
        },
        {
          text:'Publicar',
          handler: data => {
            const newcommentRef = this.commentsRef.push({});

            newcommentRef.set({
              id: newcommentRef.key,
              title: data.title,
              uid: this.currentUser.uid
            });
          }
        }
      ]
    });
    prompt.present();

  }

 

  showOptions(commentId,commentTitle){
    let actionSheet = this.actionSheetCtrl.create(
      {
        title:'Que quieres hacer?',
        buttons: [
          {
            text:'Borrar comentario',
            role: 'destructive',
            handler: () => {
              this.removeComentario(commentId);
            }
          },{
            text: 'Actualizar Comentario',
            handler: () => {
              this.actualizarComentario(commentId,commentTitle);
            }
          },{
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('click en Cancelar');
            }
          }

        ]
      }
    );
    actionSheet.present();

  }
removeComentario(commentId: string){
  this.commentsRef.remove(commentId);
}

actualizarComentario(commentId: string, commentTitle){
  let prompt = this.alertCtrl.create({
    title: 'Comentario',
    message: "Actualizar el comentario",
    inputs: [
      {
        name:'title',
        placeholder: 'Title',
        value: commentTitle
      },
    ],
    buttons: [
      {
        text: 'Cancelar',
        handler: data => {
          console.log('Click en cancelar');
        }
      },
      {
        text: 'Publicar',
        handler: data => {
          this.commentsRef.update(commentId,{
            title:data.title,
            lastUpdateBy: this.currentUser.uid
          });
        }
      }
    ]
  });
  prompt.present();
}

logout(){
  this.navCtrl.push(LoginPage);
}


likes(){
 console.log( this.contador +=1);
 
}


dislikes(){
  console.log( this.contador1 +=1);
}



}
