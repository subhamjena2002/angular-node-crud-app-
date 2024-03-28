import { Injectable } from '@angular/core';
import { CanActivate ,Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  login:any
  constructor(private router : Router){}
  canActivate(): boolean {
    if (typeof sessionStorage !== 'undefined') {
      this.login= sessionStorage.getItem('isLoggedin')
    }
    if (this.login === 'true') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
