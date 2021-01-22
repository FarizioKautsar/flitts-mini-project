import React, { Component } from 'react'
import MovieListItem from '../../component/MovieListItem';
import Loader from '../../component/Loader';

// Container for MovieListItem
// Lists movies
export default class MovieList extends Component {
    constructor(props) {
        super(props);
        this.calculatePrice = this.calculatePrice.bind(this)
    }

    // Calculate price based on average vote
    // Generate to all item list
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

    render() {
        return (
            <div>
                {/* Title of current List */}
                <h2>{this.props.children}</h2>
                <div className="row my-5">
                    {
                        // Lists all movies from props
                        this.props.movies.map((movie) => (
                            <MovieListItem
                                key = {movie.id}
                                movie = {movie}
                                price = {this.calculatePrice(movie.vote_average)}
                                inCart = {this.props.cart.some(c => c.movie.id === movie.id)? true : false}
                                isOwned = {this.props.owned.some(m => m.id === movie.id)? true : false}
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
