import React, { Component } from 'react'
import {APIConfig} from '../../api/APIConfig'
import MovieListItem from '../../component/MovieListItem';
import Loader from '../../component/Loader';

export default class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            isLoading: true,
            searchMovie: "",
        }
        this.calculatePrice = this.calculatePrice.bind(this)
    }

    async loadMovies() {
        try {
            const {data} = await APIConfig.get('/discover/movie')
            this.setState({isLoading: false, movies: data.results})
        } catch (error) {
            alert("Terjadi kesalahan saat memuat film.")
            console.log(error)
        }
    }

    componentDidMount() {
        this.loadMovies()
        console.log("MovieList mount")
        console.log(this.props.cart)
    }

    calculatePrice(rating) {
        console.log(rating)
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

    render() {
        return (
            <div>
                <h3>Showing Now in Indonesia</h3>
                {
                    this.state.isLoading && <Loader/>
                }
                <div className="row my-5">
                    {
                        this.state.movies.map((movie) => (
                            <MovieListItem
                                key = {movie.id}
                                movie = {movie}
                                price = {this.calculatePrice(movie.vote_average)}
                                inCart = {this.props.cart.some(m => m.id === movie.id)? true : false}
                                addToCart = {this.props.addToCart}
                                removeFromCart = {this.props.removeFromCart}
                            />
                        ))
                    }
                </div>
            </div>
        )
    }
}
