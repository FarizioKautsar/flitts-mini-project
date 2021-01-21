import React, { Component } from 'react'
import classes from './MovieListItem.module.css'
import { Link } from 'react-router-dom';
import Button from '../../component/Button'

export default class MovieListItem extends Component {
    constructor(props) {
        super(props);
        this.handleAddToCart = this.handleAddToCart.bind(this)
        this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this)
        this.slug = this.slug.bind(this)
    }
    
    async loadImage(link) {

    }

    slug(id, movie) {
        let titleSlug = movie.replace(/\s+/g, '-').toLowerCase();
        return (id+'-'+titleSlug)
    }

    handleAddToCart(e) {
        this.props.addToCart(this.props.movie, this.props.price)
    }

    handleRemoveFromCart(e) {
        this.props.removeFromCart(this.props.movie, this.props.price)
    }

    render() {
        const movie = this.props.movie
        return (
            <div className='col-sm-4 col-md-2 col-6 mb-4'>
                <div className = {classes.movieListItem}>
                    <Link to = {{pathname: this.slug(movie.id, movie.title)}} style={{ textDecoration: 'none' }}>
                        <img src = {'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + movie.poster_path} alt={movie.title} className='w-100'></img>
                        <div className = {classes.movieDesc}> 
                            {/* <div className={classes.fade}></div> */}
                            <p className={classes.title}>{movie.title}</p>
                            <p className={classes.year}>{movie.release_date}</p>
                            <p className={classes.price}>Rp{this.props.price}</p>
                        </div>
                    </Link>
                    <Button variant={this.props.inCart? 'red' : 'green'} onClick = {this.props.inCart? this.handleRemoveFromCart : this.handleAddToCart}>
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
                    {/* <p className={classes.overview}>{movie.overview}</p> */}
                </div>
            </div>
        )
    }
}
