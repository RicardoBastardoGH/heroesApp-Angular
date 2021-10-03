import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  
  constructor(private authService: AuthService,
              private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if( this.authService.activeUser.id ) {
        return true;
      }
      console.log('Bloqueado por el AuthGuard - Can Activate');
      return false;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {
    
      return this.authService.verifyAuth()
        .pipe(
          tap( isAthenticated => {
            if ( !isAthenticated ) {
              this.router.navigate(['./auth/login']);
            }
          })
        );
      
      // if( this.authService.activeUser.id ) {
      //   return true;
      // }
      // console.log('Bloqueado por el AuthGuard - Can Load');
      // return false;
  }
}
