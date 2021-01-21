import React, { Component } from 'react'
import './App.css';
import Button from './component/Button';
import Navbar from './component/Navbar';
import MovieList from './container/MovieList';
import Cart from './container/Cart'

import { 
  BrowserRouter as Router, 
  Route, 
  Switch,
} from 'react-router-dom'; 
import MovieDetail from './container/MovieDetail';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 100000 - JSON.parse(localStorage.getItem('amountPaid')),
      subtotal: JSON.parse(localStorage.getItem('subtotal')) || 0,
      amountPaid: JSON.parse(localStorage.getItem('amountPaid')) || 0,
      cart: JSON.parse(localStorage.getItem('cart')) || [],
      owned: JSON.parse(localStorage.getItem('owned')) || [],
    }
    this.addToCart = this.addToCart.bind(this)
    this.removeFromCart = this.removeFromCart.bind(this)
    this.checkout = this.checkout.bind(this)
  }

  addToCart(movie, price) {
    if(!this.state.cart.some(m => m.id === movie.id)) {
      const newCart = this.state.cart.concat(movie)
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
    const index = this.state.cart.findIndex(m => m.id === movie.id)
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
    const cart = this.state.cart
    const subtotal = this.state.subtotal
    const balance = this.state.balance - subtotal
    this.setState({
      owned: cart, 
      cart: [], 
      amountPaid: subtotal, 
      subtotal: 0,
      balance: balance,
    })
    localStorage.setItem('owned', localStorage.getItem('cart'))
    localStorage.setItem('cart', [])
    localStorage.setItem('amountPaid', localStorage.getItem('subtotal'))
    localStorage.setItem('subtotal', 0)
  }

  render() {
    return (
      <Router>
        <Navbar balance = {this.state.balance}/>
        <div className="container py-5 mt-5">
          <Switch> 
            <Route exact path='/'>
              <MovieList 
                addToCart = {this.addToCart}
                removeFromCart = {this.removeFromCart}
                cart = {this.state.cart}
                owned = {this.state.owned}/>
            </Route> 
            <Route exact path='/cart/' >
              <Cart 
                cart = {this.state.cart}
                checkout = {this.checkout}
              ></Cart>
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
