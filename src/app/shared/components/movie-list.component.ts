import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movies-interface';
import { MovieService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {

  movies$: Observable<Movie[]> = new Observable<Movie[]>();
  selectedMovie: Movie | undefined;

  constructor(public movieService: MovieService) {}

  ngOnInit() {
    this.movies$ = this.movieService.getMovies();
  }

  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
  }

}
