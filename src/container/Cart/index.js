import React, { Component } from 'react'
import Button from '../../component/Button';
import CartItem from '../../component/CartItem'
import { Link } from 'react-router-dom';
import classes from './Cart.module.css';

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkoutSuccess: false,
        }
        this.handleCheckout = this.handleCheckout.bind(this)
    }

    // Empty cart and change state to success
    // Propagate to App's checkout func
    handleCheckout() {
        this.setState({cart: [], checkoutSuccess: true})
        this.props.checkout()
    }

    render() {
        return (
            <div>
                <h2>Your Cart</h2>
                <div className='row'>
                    {
                        // If cart is not empty, show CartItems
                        this.props.cart.length?
                        <div className='col-8'>
                            {
                                this.props.cart.map((cartItem) => (
                                    <CartItem 
                                        movie = {cartItem.movie} 
                                        price = {cartItem.price}
                                        removeFromCart = {this.props.removeFromCart}/>
                                ))
                            }
                        </div>
                        : null
                    }
                    <div className='col'>
                        {
                            // Has Checked Out?
                            this.state.checkoutSuccess? 
                            <div>
                                <h4 className='mt-3'>Checkout berhasil!</h4> 
                                <Link to = '/your-movies'>
                                    <Button variant = 'blue'>
                                        Lihat Film Saya
                                    </Button>
                                </Link>
                            </div>
                            // Has not checked out and cart is empty
                            : !this.props.cart.length?  
                            <div>
                                <h4 className='mt-3'>Sepi ya...</h4> 
                                <Link to = '/'>
                                    <Button variant = 'blue'>
                                        Lihat Film yang Tersedia
                                    </Button>
                                </Link>
                            </div> : 
                            // Cart is not empty
                            <div className = 'row  ms-auto'>
                                <div className='col d-flex'>
                                    <p className={classes.subtotal + ' justify-content-center align-self-center'}>
                                        Subtotal <b>Rp{this.props.subtotal}</b></p>
                                </div>
                                <div className = 'col'>
                                    {
                                        // Insufficient Fund
                                        (this.props.balance - this.props.subtotal) < 0? 
                                        <Button variant = 'red' className = 'ms-auto'>
                                            Saldo Tidak Cukup
                                        </Button>
                                        :
                                        <Button variant = 'green' className = 'ms-auto' onClick = {this.handleCheckout}>
                                            Check Out
                                        </Button>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
