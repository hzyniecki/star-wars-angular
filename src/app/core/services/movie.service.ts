import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Movie } from 'src/app/shared/interfaces/movies-interface';
import { environment } from 'src/environments/environment';
import { MoviesApiResponse } from 'src/app/shared/interfaces/movies-response.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = environment.starWarsApi;
  private movies$!: Observable<Movie[]>;
  public loading: boolean = true;

  constructor(private http: HttpClient) {}

  public getMovies(): Observable<Movie[]> {
    if (!this.movies$) {
      console.log( this.loading)
      this.movies$ = this.http.get<MoviesApiResponse>(this.apiUrl).pipe(
        map((response) =>  response.results),
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError(() => new Error('Something went wrong'));
        })
      );
      this.movies$.subscribe(() => {this.loading = false},
    )}
    return this.movies$;

  }

}
