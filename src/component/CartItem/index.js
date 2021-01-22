import React, { Component } from 'react'
import classes from './CartItem.module.css'
import MovieListClasses from '../MovieListItem/MovieListItem.module.css'
import { Link } from 'react-router-dom'
import Button from '../Button'
import CurrencyFormat from 'react-currency-format';

// Item list for Cart
export default class CartItem extends Component {
    constructor(props) {
        super(props);
        this.slug = this.slug.bind(this)
        this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this)
    }

    // Generate link to a movie
    slug(id, movie) {
        let titleSlug = movie.replace(/\s+/g, '-').toLowerCase();
        return (id+'-'+titleSlug)
    }

    // Removes movie from cart and subtract subtotal
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
                    <div className='col-md-2 col-3'>
                        <img src = {'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + movie.poster_path} alt={movie.title}></img>
                    </div>
                    <div className='col-8'>
                        <p className={MovieListClasses.title}>{movie.title}</p>
                        {
                            movie.release_date?
                            <p className={MovieListClasses.year}>{movie.release_date.substr(0,4)}</p>
                            : null
                        }
                        <p className={MovieListClasses.price}>
                            <CurrencyFormat 
                                value={this.props.price} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                prefix={'Rp'}/>
                        </p>
                    </div>
                </Link>
                <Button className={classes.removeButton} variant='red' onClick={this.handleRemoveFromCart}>
                <strong> ✖</strong>
                </Button>
            </div>
        )
    }
}
