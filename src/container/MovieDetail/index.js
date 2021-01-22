import React, { Component } from 'react'
import classes from './MovieDetail.module.css'
import MovieListClasses from '../../component/MovieListItem/MovieListItem.module.css'
import { APIConfig } from '../../api/APIConfig';
import Cast from '../../component/Cast'
import Button from '../../component/Button'
import Loader from '../../component/Loader';
import Rating from '../../component/Rating';
import MovieList from '../MovieList';

// Movie detail for a movie
// Can be accessed from MovieList, Cart, or URL
export default class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {},
            casts: [],
            similar: [],
            recommendations: [],
            isLoading: true,
            isLoadingCast: true,
            isLoadingSimilar: true,
            isLoadingRecommendations: true,
            inCart: false,
            isOwned: false,
        }
        this.handleAddToCart = this.handleAddToCart.bind(this)
        this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this)
        this.calculatePrice = this.calculatePrice.bind(this)
    }
    
    // Do right after component mounts
    componentDidMount() {
        // Get slug for current movie
        const slug = this.props.match.params.slug
        // Get Movie ID from slug
        const movieId = slug.substr(0, slug.indexOf('-'))
        // Get movie data from movieId
        this.loadMovie(movieId)
    }

    // Do if component receive new props (from links)
    componentWillReceiveProps(newProps) {
        // Get slug for current movie
        const slug = newProps.match.params.slug
        // Get Movie ID from slug
        const movieId = slug.substr(0, slug.indexOf('-'))
        if (!this.state.movie.id == parseInt(movieId)) {
            this.setState({
                isLoading: true,
                isLoadingCast: true,
                isLoadingSimilar: true,
                isLoadingRecommendations: true,
            })
        }
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
                price: this.calculatePrice(data.vote_average),
                inCart: this.props.cart.some(c => c.movie.id == id)? true : false,
                isOwned: this.props.owned.some(m => m.id == id)? true : false,
            })
            // After the movie loads, load the credits (Casts)
            this.loadCredits(id)
            this.loadSimilar(id)
            this.loadRecommendations(id)
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

    // Asynchronous load movie's similar movies
    async loadSimilar(id) {
        try {
            // ie. https://api.themoviedb.org/3/movie/123456/credits
            const {data} = await APIConfig.get('/movie/' + id + '/similar')
            // Change casts state to data
            this.setState({
                isLoadingSimilar: false, 
                similar: data.results
            })
        } catch (error) {
            alert("Terjadi kesalahan saat memuat credit film.")
            console.log(error)
        }
    }

    // Asynchronous load movie's recommended movies
    async loadRecommendations(id) {
        try {
            // ie. https://api.themoviedb.org/3/movie/123456/recommendations
            const {data} = await APIConfig.get('/movie/' + id + '/recommendations')
            // Change casts state to data
            this.setState({
                isLoadingRecommendations: false, 
                recommendations: data.results
            })
        } catch (error) {
            alert("Terjadi kesalahan saat memuat credit film.")
            console.log(error)
        }
    }

    // Propagate to App's addToCart
    // Change movie as in cart
    handleAddToCart(e) {
        this.props.addToCart(this.state.movie, this.state.price)
        this.setState({inCart: true})
    }

    // Propagate to App's removeFromCart
    // Change movie as not in cart
    handleRemoveFromCart(e) {
        this.props.removeFromCart(this.state.movie, this.state.price)
        this.setState({inCart: false})
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
                                    {
                                        this.state.movie.runtime>0 &&
                                        <p className={MovieListClasses.year}>{movie.runtime + ' menit'}</p>
                                    }
                                    <p className={`${MovieListClasses.price} mt-2`}>Rp{this.state.price}</p>
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
                        <Loader>Memuat Pemeran</Loader>
                        :
                        <div>
                            <h4>Sinopsis</h4>
                            <p className={classes.year}>{movie.overview}</p>
                            {
                                this.state.casts.length>0 &&
                                <div>
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
                    }
                    {
                        this.state.isLoadingSimilar? 
                        <Loader>Memuat Film Serupa</Loader>
                        :
                        this.state.similar.length>0 &&
                        <MovieList
                            addToCart = {this.props.addToCart}
                            removeFromCart = {this.props.removeFromCart}
                            movies = {this.state.similar}
                            cart = {this.props.cart}
                            owned = {this.props.owned}
                        >Film Serupa</MovieList>
                    }
                    {
                        this.state.isLoadingRecommendations? 
                        <Loader>Memuat Rekomendasi Film</Loader>
                        :
                        this.state.recommendations.length>0 &&
                        <MovieList
                            addToCart = {this.props.addToCart}
                            removeFromCart = {this.props.removeFromCart}
                            movies = {this.state.recommendations}
                            cart = {this.props.cart}
                            owned = {this.props.owned}
                        >Rekomendasi Film</MovieList>
                    }
                </div>
            </div>
        )
    }
}
