import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router, private cookieService: CookieService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean 
    {
      // if (this.cookieService.check('name')) {
      //   return true;
      // }
      // this.router.navigate(['/login'])
      // return false;
      const isAuthenticated = this.cookieService.check('name');
      if (!isAuthenticated) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
  
}
