import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from './game';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MavenService {






  private localhost = 'http://127.0.0.1:3000/api';
  private gamesApiUrl = this.localhost + '/getGameSessions';
  private zipCodeQueryApiUrl = this.localhost + '/getCitiesWithinZipCodeRadius';
  private stateCodeQueryApiUrl = this.localhost + '/getCitiesWithinState';

  getGames(): Observable<Game[]> {

    return this.http.get<Game[]>(this.gamesApiUrl)
      .pipe(
        catchError(this.handleError<Game[]>('getGames', []))
      );
  }

  getCitiesWithinZipCodeRadius(zipCode: String, kmRadius: String): Observable<any> {

    return this.http.post<any>(this.zipCodeQueryApiUrl, { 'zipCode' : zipCode, 'kmRadius' : kmRadius })
      .pipe(
        catchError(this.handleError('getCitiesWithinZipCodeRadius'))
      );
  }

  getCitiesWithinState(stateCode: String): Observable<any> {
    return this.http.post<any>(this.stateCodeQueryApiUrl, { 'stateCode' : stateCode })
      .pipe(
        catchError(this.handleError('getCitiesWithinZipCodeRadius'))
      );

  }
  

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}



  constructor(
    private http: HttpClient
    ) { }
}
