import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private router:Router, private cookieService: CookieService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean 
    {
      if (localStorage.getItem('login') !== "200") {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
  
}
