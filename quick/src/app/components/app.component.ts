declare var require: any;
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AppTranslationService } from "../services/app-translation.service";
import { Router, NavigationStart } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  appTitle = 'Quick';
  appLogo = require("../assets/images/logo-white.png");

  isAppLoaded: boolean;
  isUserLoggedIn: boolean;

  
  //TABS
  links = [
    {
      'path': '/home', 
      'label': this.translationService.getTranslation("mainMenu.Home")
    },
    {
      'path': '/customers', 
      'label': this.translationService.getTranslation("mainMenu.Customers")
    },
    {
      'path': '/products', 
      'label': this.translationService.getTranslation("mainMenu.Products")
    },
    {
      'path': '/quality', 
      'label': this.translationService.getTranslation("mainMenu.Quality")
    },
    {
      'path': '/login', 
      'label': this.translationService.getTranslation("mainMenu.Login")
    }
  ];
  activeLink = this.links[0];

  //Media Query
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    private translationService: AppTranslationService,
    public router: Router,
    public snackBar: MatSnackBar,
    public login: MatDialog,
    ) 
    {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }
    
    ngOnInit() {
    
    }
    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, { duration: 5000, });
    }
    
    openDialog(): void {
      const dialogRef = this.login.open(LoginComponent, {
        height: '400px',
        width: '600px',
        data: {name: "", animal: ''}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.openSnackBar('The dialog was closed', 'Chiudi') ;
        //this.animal = result;
      });
    }
    
    get canViewHome() {
      return true;
    }
  
    get canViewCustomers() {
      return true;
      //return this.accountService.userHasPermission(Permission.viewUsersPermission); //eg. viewCustomersPermission
    }
}
