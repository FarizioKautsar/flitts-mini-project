import React, { Component } from 'react'
import classes from './MovieDetail.module.css'
import MovieListClasses from '../../component/MovieListItem/MovieListItem.module.css'
import { APIConfig } from '../../api/APIConfig';
import Cast from '../../component/Cast'
import Button from '../../component/Button'
import Loader from '../../component/Loader';
import Rating from '../../component/Rating';

// Movie detail for a movie
// Can be accessed from MovieList, Cart, or URL
export default class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isLoadingCast: true,
            movie: {},
            casts: [],
            inCart: false,
            isOwned: false,
        }
        this.handleAddToCart = this.handleAddToCart.bind(this)
        this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this)
        this.calculatePrice = this.calculatePrice.bind(this)
        // Get slug for current movie
        const slug = this.props.match.params.slug
        // Get Movie ID from slug
        const movieId = slug.substr(0, slug.indexOf('-'))
        // Get movie data from movieId
        this.loadMovie(movieId)
    }
    
    // Calculate price based on average vote
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

    // Asynchronous load movie information
    async loadMovie(id) {
        try {
            // ie. https://api.themoviedb.org/3/movie/123456
            const {data} = await APIConfig.get('/movie/' + id)
            // Change state to movie's data
            this.setState({
                isLoading: false,
                movie: data,
                inCart: this.props.cart.some(c => c.movie.id === this.state.movie.id)? true : false,
                isOwned: this.props.owned.some(m => m.id === this.state.movie.id)? true : false,
            })
            // After the movie loads, load the credits (Casts)
            this.loadCredits(id)
        } catch (error) {
            alert("Terjadi kesalahan saat memuat film.")
            console.log(error)
        }
    }

    // Asynchronous load movie's credit information
    async loadCredits(id) {
        try {
            // ie. https://api.themoviedb.org/3/movie/123456/credits
            const {data} = await APIConfig.get('/movie/' + id + '/credits')
            // Change casts state to data
            this.setState({
                isLoadingCast: false, 
                casts: data.cast
            })
        } catch (error) {
            alert("Terjadi kesalahan saat memuat credit film.")
            console.log(error)
        }
    }

    // Propagate to App's addToCart
    // Change movie as in cart
    handleAddToCart(e) {
        this.setState({inCart: true})
        this.props.addToCart(this.state.movie, this.state.price)
    }

    // Propagate to App's removeFromCart
    // Change movie as not in cart
    handleRemoveFromCart(e) {
        this.setState({inCart: false})
        this.props.removeFromCart(this.state.movie, this.state.price)
    }

    render() {
        const movie = this.state.movie
        const casts = this.state.casts
        return (
            <div className='row'>
                {/* Sticky info about movie */}
                <div className='col-md-3 mb-5'>
                    <div className={classes.poster}>
                        {
                            this.state.isLoading?
                            <Loader className='mt-5'/>
                            :
                            <div>
                                <img src = {'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + movie.poster_path} alt={movie.title} className='w-100'></img>
                                <div className={MovieListClasses.movieDesc}>
                                    <p className={MovieListClasses.title}>{movie.title}</p>
                                    {
                                        movie.release_date?
                                        <p className={MovieListClasses.year}>{movie.release_date.substr(0,4)}</p>
                                        : null
                                    }
                                    <p className={MovieListClasses.year}>{movie.runtime + ' menit'}</p>
                                    <p className={`${MovieListClasses.price} mt-2`}>Rp{this.calculatePrice(movie.vote_average)}</p>
                                    {
                                        // If not owned, show button to add/remove to/from cart
                                        !this.state.isOwned?
                                        <Button 
                                            variant={this.state.inCart? 'red' : 'green'} 
                                            className='w-100 mt-3'
                                            // If movie not in cart, provide button to add to cart and vice versa
                                            onClick = {this.state.inCart? this.handleRemoveFromCart : this.handleAddToCart}>
                                            {
                                                this.state.inCart?
                                                'Hapus dari Keranjang'
                                                : 
                                                'Tambah ke Keranjang' 
                                            }
                                        </Button>
                                        : 
                                        // Fake button to watch the movie
                                        <Button variant = 'blue' className='w-100 mt-3'>
                                            Tonton
                                        </Button>
                                    }
                                    <Rating>
                                        {movie.vote_average}
                                    </Rating>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                
                {/* Movie Detail */}
                <div className={classes.movieDetail + ' col'}>
                    {
                        this.state.isLoadingCast? 
                        <Loader>Memuat Detail</Loader>
                        :
                        <div>
                            <h4>Gambaran</h4>
                            <p className={classes.year}>{movie.overview}</p>
                            <h4>Pemeran</h4>
                            <div className='row'>
                                {
                                    casts.map((cast) => (
                                        <Cast name={cast.name} profile_path={cast.profile_path}></Cast>
                                    ))
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
