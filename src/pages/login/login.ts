import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../../pages/home/home';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

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

  responseData : any;
  error : {
  	status : true
  };


  userData = {"phone": "","password": ""};

  constructor(public navCtrl: NavController, public navParams: NavParams,  public authService:AuthServiceProvider, public alertCtrl:AlertController, public toastCtrl:ToastController) {

  		if(authService.checkIfLoggedin())
  		{
  			this.navCtrl.setRoot(HomePage);
  		}

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
  	 
     this.authService.postData(this.userData,'auth/login').then((result) => {
      this.responseData = result;
      //console.log(this.responseData);
      localStorage.setItem('userData', JSON.stringify(this.responseData.data));
      //this.storage.set('userDetails', JSON.stringify(this.responseData));

      this.toastCtrl.create({
		    message: 'Loggedin successfully',
		    duration: 1000,
		    position: 'bottom'
		  });
      this.navCtrl.setRoot(HomePage);

    }, (err) => {
    	//console.log("===>",err);

    	if(err.message == "invalid_credentials")
    	{
    		err.message = "Login Failed!! Invalid Credentials."
    	}else{
    		err.message = "Login Failed!! Something went wrong."
    	}

    	this.error = err;

    	
		    let alert = this.alertCtrl.create({
		      title: 'Login Failed!',
		      subTitle: err.message+' Please check your username and password!',
		      buttons: ['OK']
		    });
		    alert.present();
		  


      // Error log
    });

  }

  register(){
  	this.navCtrl.push(HomePage);
  }

}
