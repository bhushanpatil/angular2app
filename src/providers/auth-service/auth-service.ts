import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {CONFIG} from '../../app/app.config'
import { Storage } from '@ionic/storage';


let apiUrl = CONFIG.APIHOST;


/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http) {
   // console.log('Hello AuthServiceProvider Provider');
  }

  checkIfLoggedin ()
  {
  	//check if user is logged in 
  	let userData = JSON.parse(localStorage.getItem('userData'));

  	console.log(userData);

  	if(userData == null || !userData.hasOwnProperty("token"))
  	{
  		localStorage.removeItem('userData');
  		return false;  		
  	}
   	return true;
  


  }

  logout()
  {
  	localStorage.removeItem('userData');
  }

  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded', 'x-user-type': "teacher"});

      let body = `phone=${credentials.phone}&password=${credentials.password}`;

      this.http.post(apiUrl + type, body, {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err.json());
        });
    });

  }

}
