import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Query } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroe.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${ this.baseUrl }/heroes`);
  }

  getHeroeById( id: string) {
    return this.http.get<Heroe>(`${ this.baseUrl }/heroes/${ id }`);
  }

  getsuggestions( query: string ): Observable<Heroe[]> {
    let params = new HttpParams();
    params = params.set("q", query);
    params = params.set("_limit", 5 );
    return this.http.get<Heroe[]>(`${ this.baseUrl }/heroes`, {params}    );
  }

  addHeroe( heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(`${ this.baseUrl }/heroes`, heroe );
  }

  updateHeroe( heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(`${ this.baseUrl }/heroes/${ heroe.id }`, heroe );
  }

  deleteHeroe( id: string ): Observable<any> {
    return this.http.delete<any>(`${ this.baseUrl }/heroes/${ id }` );
  }
}
