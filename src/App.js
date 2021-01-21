import React, { Component } from 'react'
import './App.css';
import {APIConfig} from './api/APIConfig'
import Navbar from './component/Navbar';
import MovieList from './container/MovieList';
import Cart from './container/Cart'
import Loader from './component/Loader'
import Button from './component/Button'
import { 
  BrowserRouter as Router, 
  Route, 
  Switch,
} from 'react-router-dom'; 
import MovieDetail from './container/MovieDetail';
import InfiniteScroll from 'react-infinite-scroller';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: JSON.parse(localStorage.getItem('movies')) || [],
      balance: 100000 - JSON.parse(localStorage.getItem('amountPaid')),
      subtotal: JSON.parse(localStorage.getItem('subtotal')) || 0,
      amountPaid: JSON.parse(localStorage.getItem('amountPaid')) || 0,
      cart: JSON.parse(localStorage.getItem('cart')) || [],
      owned: JSON.parse(localStorage.getItem('owned')) || [],
      isLoading: true,
      page: 1,
    }
    this.addToCart = this.addToCart.bind(this)
    this.removeFromCart = this.removeFromCart.bind(this)
    this.checkout = this.checkout.bind(this)
    this.loadMovies = this.loadMovies.bind(this)
    this.loadMore = this.loadMore.bind(this)
    this.handleLoadMore = this.handleLoadMore.bind(this)
    this.loadMovies()
  }

  addToCart(movie, price) {
    if(!this.state.cart.some(c => c.movie.id === movie.id)) {
      var cartItem = {}
      cartItem.movie = movie
      cartItem.price = price
      const newCart = this.state.cart.concat(cartItem)
      const subtotal = this.state.subtotal + price
      console.log(subtotal)
      localStorage.setItem('subtotal', subtotal)
      localStorage.setItem('cart', JSON.stringify(newCart))
      this.setState({
        subtotal: JSON.parse(localStorage.getItem('subtotal')),
        cart: JSON.parse(localStorage.getItem('cart')),
      })
    }
  }

  removeFromCart(movie, price) {
    const index = this.state.cart.findIndex(c => c.movie.id === movie.id)
    const newCart = this.state.cart
    newCart.splice(index, 1)
    const subtotal = this.state.subtotal - price
    localStorage.setItem('subtotal', subtotal)
    localStorage.setItem('cart', JSON.stringify(newCart))
    this.setState({
      subtotal: JSON.parse(localStorage.getItem('subtotal')),
      cart: JSON.parse(localStorage.getItem('cart')),
    })
  }

  checkout() {
    const movies = this.state.cart.map(c => c.movie)
    const amountPaid = this.state.subtotal + this.state.amountPaid
    const balance = this.state.balance - amountPaid
    if (balance < 0) {

    }
    this.setState({
      owned: this.state.owned.concat(movies), 
      cart: [], 
      amountPaid: amountPaid, 
      subtotal: 0,
      balance: balance,
    })
    localStorage.setItem('owned', JSON.stringify(movies))
    localStorage.setItem('cart', [])
    localStorage.setItem('amountPaid', amountPaid)
    localStorage.setItem('subtotal', 0)
  }

  async loadMovies() {
    try {
      const {data} = await APIConfig.get('/discover/movie')
      this.setState({
        isLoading: false, 
        movies: data.results,
        page: this.state.page + 1,
      })
      localStorage.setItem('movies', JSON.stringify(this.state.movies))
    } catch (error) {
      alert("Terjadi kesalahan saat memuat film.")
      console.log(error)
    }
  }

  async loadMore() {
    console.log('load more')
    try {
      const {data} = await APIConfig.get('/discover/movie',
      {
        params: {
          page: this.state.page
        }
      })
      this.setState({
        isLoading: false, 
        movies: this.state.movies.concat(data.results), 
        page: this.state.page + 1,
      })
      localStorage.setItem('movies', JSON.stringify(this.state.movies))
    } catch (error) {
        alert("Terjadi kesalahan saat memuat film.")
        console.log(error)
    }
  }

  handleLoadMore() {
    this.loadMore()
  }

  render() {
    return (
      <Router>
        <Navbar balance = {this.state.balance}/>
        <div className="container py-5 mt-5">
          <Switch> 
            <Route exact path='/'>
              <h2>Now Showing in Indonesia</h2>
              {
                this.state.isLoading? <Loader/> :
                <div id="scrollableDiv">
                  <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadMore}
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
            <Route exact path='/cart/' >
              <Cart 
                cart = {this.state.cart}
                checkout = {this.checkout}
                subtotal = {this.state.subtotal}
                balance = {this.state.balance}
                removeFromCart = {this.removeFromCart}
              ></Cart>
            </Route>
            <Route exact path='/your-movies'>
              <h2>Koleksi Anda</h2>
              <MovieList 
                movies = {this.state.owned}
                cart = {this.state.cart} 
                owned = {this.state.owned} >
              </MovieList>
            </Route> 
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
