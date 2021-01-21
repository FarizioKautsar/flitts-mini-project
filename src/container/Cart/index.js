import React, { Component } from 'react'
import Button from '../../component/Button';
import CartItem from '../../component/CartItem'
import { Link } from 'react-router-dom';
import classes from './Cart.module.css';

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: this.props.cart,
            subtotal: this.props.subtotal,
            isEmpty: this.props.cart.length === 0? true : false,
            checkoutSuccess: false,
        }
        this.handleCheckout = this.handleCheckout.bind(this)
    }

    handleCheckout() {
        this.setState({cart: [], checkoutSuccess: true})
        this.props.checkout()
    }

    render() {
        return (
            <div>
                <h2>Your Cart</h2>
                {
                    this.state.cart.map((cartItem) => (
                        <div>
                            <CartItem movie = {cartItem.movie} price = {cartItem.price}/>
                        </div>
                    ))
                }
                {
                    this.state.checkoutSuccess? 
                    <div>
                        <h4 className='mt-3'>Checkout berhasil!</h4> 
                        <Link to = '/'>
                            <Button variant = 'blue'>
                                Lihat Film Saya
                            </Button>
                        </Link>
                    </div>
                    : this.state.isEmpty? 
                    <div>
                        <h4 className='mt-3'>Sepi ya...</h4> 
                        <Link to = '/'>
                            <Button variant = 'blue'>
                                Lihat Film yang Tersedia
                            </Button>
                        </Link>
                    </div> :  
                    <div className = 'row w-25 ms-auto'>
                        <div className='col d-flex'>
                            <p className={classes.subtotal + ' justify-content-center align-self-center'}>Subtotal <b>{this.state.subtotal}</b></p>
                        </div>
                        <div className = 'col'>
                            <Button variant = 'green' className = 'ms-auto' onClick = {this.handleCheckout}>
                                Check Out
                            </Button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
