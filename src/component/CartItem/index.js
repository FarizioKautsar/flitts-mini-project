import React, { Component } from 'react'
import classes from './CartItem.module.css'
import MovieListClasses from '../MovieListItem/MovieListItem.module.css'

export default class CartItem extends Component {
    render() {
        const movie = this.props.movie
        return (
            <div className={classes.cartItem + ' row'}>
                <div className='col-1' style={{paddingLeft: 0, paddingRight: 0, }}>
                    <img src = {'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + movie.poster_path} alt={movie.title}></img>
                </div>
                <div className='col ms-3'>
                    <p className={MovieListClasses.title}>{movie.title}</p>
                    <p className={MovieListClasses.price}>{movie.price}</p>
                </div>
            </div>
        )
    }
}
