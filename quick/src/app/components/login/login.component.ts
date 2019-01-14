import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Http, Headers, RequestOptions } from '@angular/http';

import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: "login",
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  //loading = false;
  //submitted = false;
  //returnUrl: string;
  //isModal= true;
  //resultsLength = 0;
  //isLoadingResults = true;
  //isRateLimitReached = false;
  username:String;
  password:String;
  
  constructor(
    private http: Http,
    public snackBar: MatSnackBar,
  ) 
  { }

  ngOnInit() { } 
  
  login() :  void {
    //const href = 'http://crm.gsp01.it/rest.svc/';
    //const href = 'http://localhost:1608/rest.svc/';
    //const url  = `${href}Login`;
  
    var data = {
        UserName: 'admin',
        Password: 'CrOpera@2018',
        Version: '6.0',
        MobileClient: false
    };

    let headers = new Headers({ 'content-type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });  
   
    //this.http.options('https://localhost:1608/Rest.svc/Login', options).subscribe();
    //this.http.post('https://localhost:44386/api/values', JSON.stringify(data), options).subscribe(  
    //  res => console.log(res.json())); 
    this.http.get('https://localhost:44386/api/values').subscribe( res => console.log(res.json())); 
  }
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 2000, });
  }

}