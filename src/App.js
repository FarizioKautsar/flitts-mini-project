import React, { Component } from 'react'
import './App.css';
import {APIConfig} from './api/APIConfig'
import Navbar from './component/Navbar';
import MovieList from './container/MovieList';
import Cart from './container/Cart'
import Loader from './component/Loader'
import { 
BrowserRouter as Router, 
Route, 
Switch,
} from 'react-router-dom'; 
import MovieDetail from './container/MovieDetail';
import InfiniteScroll from 'react-infinite-scroller';
import Button from './component/Button';

// Base App for the whole application
export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
		movies: [],
		balance: JSON.parse(localStorage.getItem('balance')) || 100000,
		subtotal: JSON.parse(localStorage.getItem('subtotal')) || 0,
		cart: JSON.parse(localStorage.getItem('cart')) || [],
		owned: JSON.parse(localStorage.getItem('owned')) || [],
		search: '',
		page: 1,
		}
		this.baseState = this.state
		this.addToCart = this.addToCart.bind(this)
		this.removeFromCart = this.removeFromCart.bind(this)
		this.checkout = this.checkout.bind(this)
		this.loadMovies = this.loadMovies.bind(this)
		this.sellAll = this.sellAll.bind(this)
		this.loadMovies()
	}

	// Add movie to cart state
	// Add price to subtotal state 
	addToCart(movie, price) {
		// If movie is not already in cart
		if(!this.state.cart.some(c => c.movie.id === movie.id)) {
			// Generate new JS object which maps movie with its price
			var cartItem = {}
			cartItem.movie = movie
			cartItem.price = price
			// Add item to cart
			const newCart = this.state.cart.concat(cartItem)
			const subtotal = this.state.subtotal + price
			this.setState({
				subtotal: subtotal,
				cart: newCart,
			})
			// Save to localStorage
			localStorage.setItem('subtotal', subtotal)
			localStorage.setItem('cart', JSON.stringify(newCart))
		}
	}

	// Add movie to cart state
	// Add price to subtotal state 
	removeFromCart(movie, price) {
		// Find movie's index in cart
		const index = this.state.cart.findIndex(c => c.movie.id === movie.id)
		const newCart = this.state.cart
		// Remove object number index from cart
		newCart.splice(index, 1)
		const subtotal = this.state.subtotal - price
		this.setState({
			subtotal: subtotal,
			cart: newCart,
		})
		// Save to localStorage
		localStorage.setItem('subtotal', subtotal)
		localStorage.setItem('cart', JSON.stringify(newCart))
	}

	// Checksout cart
	// Empty cart, reset subtotal, update balance
	checkout() {
		// Add movie from cart to owned
		const owned = this.state.owned.concat(this.state.cart.map(c => c.movie))
		// Update balance
		const balance = this.state.balance - this.state.subtotal
		this.setState({
			owned: owned, 
			cart: [], 
			subtotal: 0,
			balance: balance,
		})
		// Save to local storage
		localStorage.setItem('owned', JSON.stringify(owned))
		localStorage.setItem('cart', JSON.stringify([]))
		localStorage.setItem('balance', balance)
		localStorage.setItem('subtotal', 0)
	}

	// Reset application
	sellAll() {
		this.setState(this.baseState)
		localStorage.clear()
	}

	// Asynchronous load all movies (20 at a time)
	async loadMovies() {
		try {
		const {data} = await APIConfig.get('/discover/movie',
		{params: {page: this.state.page}})
		// Add fetched movie to movies
		// Next page
		this.setState({
			movies: this.state.movies.concat(data.results), 
			page: this.state.page + 1,
		})
		console.log(this.state.page)
		} catch (error) {
			alert("Terjadi kesalahan saat memuat film.")
			console.log(error)
		}
	}

	render() {
		return (
		<Router>
			{/* Navbar that shows balance */}
			<Navbar balance = {this.state.balance} onChange={this.handleSearch}/>
			<div className="container py-5 mt-5">
				{/* Switch component depending on URL */}
				<Switch> 
					{/* Home */}
					<Route exact path='/'>
						<h2>Tayang di Indonesia</h2>
						{
							this.state.isLoading? <Loader/> :
							<div id="scrollableDiv">
							<InfiniteScroll
								loadMore={this.loadMovies}
								hasMore={true}
								loader={<Loader></Loader>}
							>
								<MovieList 
								addToCart = {this.addToCart}
								removeFromCart = {this.removeFromCart}
								cart = {this.state.cart}
								owned = {this.state.owned}
								movies = {this.state.movies}>
								</MovieList>
							</InfiniteScroll>
							</div>
						}
					</Route> 

					{/* Cart */}
					<Route exact path='/keranjang/' >
						<Cart 
							cart = {this.state.cart}
							checkout = {this.checkout}
							subtotal = {this.state.subtotal}
							balance = {this.state.balance}
							removeFromCart = {this.removeFromCart}
						></Cart>
					</Route>

					{/* Your Collection */}
					<Route exact path='/koleksi'>
						<h2>Koleksi Saya</h2>
						<Button variant='blue' onClick={this.sellAll}> 
							Jual Semua
						</Button>
						<MovieList 
							movies = {this.state.owned}
							cart = {this.state.cart} 
							owned = {this.state.owned} >
						</MovieList>
					</Route> 

					{/* Dynamic movie URL */}
					<Route exact path='/:slug' 
					render={(props) => 
						<MovieDetail  
						addToCart = {this.addToCart}
						removeFromCart = {this.removeFromCart}
						cart = {this.state.cart} 
						owned = {this.state.owned} 
						{...props}
					/>}>
					</Route>
				</Switch>           
			</div>
		</Router>
		);
	}
}
