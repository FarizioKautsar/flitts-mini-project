import React, { Component } from 'react'
import Button from '../../component/Button';
import {APIConfig} from '../../api/APIConfig'
import MovieListItem from '../../component/MovieListItem';
import MovieDetail from '../MovieDetail';

export default class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            movie:{},
            isLoading: true,
            isDetail: false,
            searchMovie: "",
        }
        this.calculatePrice = this.calculatePrice.bind(this)
        this.handleDetail = this.handleDetail.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    async loadMovies() {
        this.setState({loading: true})
        try {
            const {data} = await APIConfig.get('/discover/movie')
            this.setState({loading: false, movies: data.results})
            console.log(this.state.movie)
        } catch (error) {
            alert("Terjadi kesalahan saat memuat film.")
            console.log(error)
        }
    }

    async loadMovieDetail(id) {
        this.setState({detailLoading: true})
        try {
            const {data} = await APIConfig.get('/movie/'+id)
            this.setState({detailLoading: false, movie: data})
            console.log(this.state.movie)
        } catch (error) {
            alert("Terjadi kesalahan saat memuat film.")
            console.log(error)
        }
    }

    componentDidMount() {
        this.loadMovies()
    }

    calculatePrice(rating) {
        if (rating >= 8) {
            return 21250
        } else if (rating >= 6 && rating < 8){
            return 16350
        } else if (rating >= 3 && rating < 6){
            return 8250
        } else {
            return 3500
        }
    }

    handleDetail(movie) {
        this.setState({isDetail: true})
        this.loadMovieDetail(movie.id)
    }

    handleCancel(event) {
        this.setState({isDetail: false})
    }

    render() {
        return (
            <div>
                <h3>Showing Now in Indonesia</h3>
                <div className="row my-5">
                    {
                        this.state.movies.map((movie) => (
                            // !this.state.movieDetail &&
                            <MovieListItem
                                key = {movie.id}
                                id = {movie.id}
                                title = {movie.title}
                                rating = {movie.vote_average}
                                overview = {movie.overview}
                                year = {movie.release_date.substring(0, 4)}
                                poster_link = {'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + movie.poster_path}
                                price = {this.calculatePrice(movie.vote_average)}
                                onClick = {() => this.handleDetail(movie)}
                            />
                            // this.state.movieDetail && 
                            // <MovieDetail/>
                        ))
                    }
                </div>
                {this.state.isDetail?
                    <MovieDetail 
                        backdropClick = {this.handleCancel} 
                        id = {this.state.movie.id}
                        title = {this.state.movie.title}
                        rating = {this.state.movie.vote_average}
                        overview = {this.state.movie.overview}
                        year = {this.state.movie.release_date}
                        runtime = {this.state.movie.runtime}
                        poster_link = {'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + this.state.movie.poster_path}
                        price = {this.calculatePrice(this.state.movie.vote_average)}
                        /> : null
                }
            </div>
        )
    }
}
