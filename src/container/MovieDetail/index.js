import React, { Component } from 'react'
import classes from './MovieDetail.module.css'
import MovieListClasses from '../../component/MovieListItem/MovieListItem.module.css'
import { APIConfig } from '../../api/APIConfig';
import Cast from '../../component/Cast'
import Button from '../../component/Button'
import {Link} from 'react-router-dom'

export default class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isLoadingCast: true,
            movie: {},
            price: 0,
            casts: [],
            inCart: false,
            isOwned: false,
        }
        this.handleAddToCart = this.handleAddToCart.bind(this)
        this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this)
        this.calculatePrice = this.calculatePrice.bind(this)
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

    async loadMovie(id) {
        try {
            const {data} = await APIConfig.get('/movie/' + id)
            this.setState({isLoading: false, movie: data})
            this.setState({
                price: this.calculatePrice(this.state.movie.vote_average),
                inCart: this.props.cart.some(c => c.movie.id === this.state.movie.id)? true : false,
                isOwned: this.props.owned.some(m => m.id === this.state.movie.id)? true : false,
            })
            console.log(this.props.cart)
            this.loadCredits(id)
        } catch (error) {
            alert("Terjadi kesalahan saat memuat film.")
            console.log(error)
        }
    }

    async loadCredits(id) {
        try {
            const {data} = await APIConfig.get('/movie/' + id + '/credits')
            this.setState({isLoadingCast: false, casts: data.cast})
        } catch (error) {
            alert("Terjadi kesalahan saat memuat credit film.")
            console.log(error)
        }
    }

    componentDidMount() {
        const slug = this.props.match.params.slug
        const movieId = slug.substr(0, slug.indexOf('-'))
        this.loadMovie(movieId)
    }

    handleAddToCart(e) {
        this.setState({inCart: true})
        this.props.addToCart(this.state.movie, this.state.price)
    }

    handleRemoveFromCart(e) {
        console.log('movie detail remove from cart')
        this.setState({inCart: false})
        this.props.removeFromCart(this.state.movie, this.state.price)
    }

    render() {
        const movie = this.state.movie
        const casts = this.state.casts
        return (
            <div className='row'>
                <div className={classes.poster + ' col'}>
                    <img src = {'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + movie.poster_path} alt={movie.title} className='w-100'></img>
                    <div className={MovieListClasses.movieDesc}>
                        <p className={MovieListClasses.title}>{movie.title}</p>
                        <p className={MovieListClasses.year}>{movie.release_date}</p>
                        <p className={MovieListClasses.year}>{movie.runtime + ' minutes'}</p>
                        <p className={MovieListClasses.price}>Rp{this.state.price}</p>
                        {
                            !this.state.isOwned?
                            <Button 
                                variant={this.state.inCart? 'red' : 'green'} 
                                className='w-100 mt-3'
                                onClick = {this.state.inCart? this.handleRemoveFromCart : this.handleAddToCart}>
                                {
                                    this.state.inCart?
                                    'Hapus dari Keranjang'
                                    : 
                                    'Tambah ke Keranjang' 
                                }
                            </Button>
                            : 
                            <Button variant = 'blue' className='w-100 mt-3'>
                                Tonton
                            </Button>
                        }
                    </div>
                </div>
                <div className={classes.movieDetail + ' col-9'}>
                    <h4>Overview</h4>
                    <p className={classes.year}>{movie.overview}</p>
                    <h4>Casts</h4>
                    <div className='row'>
                        {
                            casts.map((cast) => (
                                <Cast name={cast.name} profile_path={cast.profile_path}></Cast>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}
