import React, { Component } from 'react'
import classes from './CartItem.module.css'
import MovieListClasses from '../MovieListItem/MovieListItem.module.css'
import { Link } from 'react-router-dom';
import Button from '../Button';

export default class CartItem extends Component {
    constructor(props) {
        super(props);
        this.slug = this.slug.bind(this)
        this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this)
    }

    slug(id, movie) {
        let titleSlug = movie.replace(/\s+/g, '-').toLowerCase();
        return (id+'-'+titleSlug)
    }

    handleRemoveFromCart() {
        this.props.removeFromCart(this.props.movie, this.props.price)
    }

    render() {
        const movie = this.props.movie
        return (
            <div className={classes.cartItem}>
                <Link 
                    to = {this.slug(movie.id, movie.title)} 
                    className='row'
                    style={{textDecoration: 'none'}}>
                    <div className='col-2'>
                        <img src = {'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + movie.poster_path} alt={movie.title}></img>
                    </div>
                    <div className='col-6 ms-3'>
                        <p className={MovieListClasses.title}>{movie.title}</p>
                        <p className={MovieListClasses.year}>{movie.release_date}</p>
                        <p className={MovieListClasses.price}>Rp{this.props.price}</p>
                    </div>
                </Link>
                <Button className={classes.removeButton} variant='red' onClick={this.handleRemoveFromCart}>Remove</Button>
            </div>
        )
    }
}
