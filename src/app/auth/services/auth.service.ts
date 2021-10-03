import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../interface/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;
  private _activeUser: User | undefined;

  get activeUser() {
    return { ...this._activeUser }
  }

  constructor(private http: HttpClient) { }

  verifyAuth(): Observable<boolean>  {
    if( !localStorage.getItem('token') ) {
      return of(false) ;
    }

    return this.http.get<User>(`${this.baseUrl}/usuarios/1`)
            .pipe(
              map( user => {
                console.log('map', user);
                this._activeUser = user;
                return true;
              })
            )
  }

  login(){
    return this.http.get<User>(`${this.baseUrl}/usuarios/1`)
              .pipe(
                tap( user => {
                  this._activeUser = user;
                  localStorage.setItem('token', this._activeUser.id );
                })
              )
  }

}
