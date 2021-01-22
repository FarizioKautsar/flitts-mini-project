import React, { Component } from 'react'
import classes from './MovieListItem.module.css'
import { Link } from 'react-router-dom';
import Button from '../../component/Button'
import Rating from '../../component/Rating'

// List item for movies, shown in MovieList
export default class MovieListItem extends Component {
    constructor(props) {
        super(props);
        this.handleAddToCart = this.handleAddToCart.bind(this)
        this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this)
        this.slug = this.slug.bind(this)
    }
    
    // Generate link to a movie
    slug(id, movie) {
        let titleSlug = movie.replace(/\s+/g, '-').toLowerCase();
        return (id+'-'+titleSlug)
    }

    // Propagate to App.js's addToCart func
    // Add movie and price to App's cart state
    // Add price to App's subtotal state
    handleAddToCart(e) {
        this.props.addToCart(this.props.movie, this.props.price)
    }

    // Propagate to App.js's removeFromCart func
    // Removes movie and price from App's cart state
    // Subtract price from App's subtotal state
    handleRemoveFromCart(e) {
        this.props.removeFromCart(this.props.movie, this.props.price)
    }

    render() {
        const movie = this.props.movie
        return (
            // Breakpoints for each screen sizes
            <div className='col-md-2 col-sm-4 col-6 mb-4'>
                <div className = {classes.movieListItem}>
                    <Link to = {this.slug(movie.id, movie.title)} style={{textDecoration: 'none'}}>
                        {
                            // Show owned label
                            this.props.isOwned &&
                            <div className={`${classes.label} ${classes.owned}`}>
                                Di Koleksi
                            </div>
                        }
                        <img 
                            src = {'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + movie.poster_path} 
                            alt={movie.title} 
                            className='w-100'></img>
                        <div className = {classes.movieDesc}> 
                            {/* <div className={classes.fade}></div> */}
                            <p className={classes.title}>{movie.title}</p>
                            {
                                movie.release_date?
                                <p className={classes.year}>{movie.release_date.substr(0,4)}</p>
                                : null
                            }
                            <p className={classes.price}>Rp{this.props.price}</p>
                            <Rating>
                                {movie.vote_average}
                            </Rating>
                        </div>
                    </Link>
                    {
                        // If movie is not owned, show button
                        !this.props.isOwned && this.props.mod !== "noButton" &&
                        <div>
                            {this.props.inCart && 
                            <Button
                                className = {`${classes.movieItemButton} ${classes.inCartButton}`}
                                variant = 'white'>
                                <div>
                                    <i className="fas fa-shopping-cart"></i>
                                    <strong> ✔</strong>
                                </div>
                            </Button>}
                            <Button
                                className = {`${classes.movieItemButton} ${classes.cartButton}`}
                                variant={this.props.inCart? 'red' : 'green'} 
                                onClick = {this.props.inCart? this.handleRemoveFromCart : this.handleAddToCart}>
                                {
                                    this.props.inCart?
                                    <div>
                                        <i className="fas fa-cart-arrow-down"></i>
                                        <strong> ✖</strong>
                                    </div>
                                    : 
                                    <div>
                                        <i className="fas fa-cart-plus"></i>
                                        <strong> +</strong>
                                    </div>
                                }
                            </Button>
                        </div>
                    }
                    {/* <p className={classes.overview}>{movie.overview}</p> */}
                </div>
            </div>
        )
    }
}
