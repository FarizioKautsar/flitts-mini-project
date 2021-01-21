import React, { Component } from 'react'
import Button from '../../component/Button';
import CartItem from '../../component/CartItem'
import { Link } from 'react-router-dom';

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: this.props.cart,
            isEmpty: this.props.cart.length==0? true : false,
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
                    this.state.cart.map((movie) => (
                        <div>
                            <CartItem movie = {movie}/>
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
                    <Button variant = 'green' className = 'ms-auto' onClick = {this.handleCheckout}>
                        Check Out
                    </Button>
                }
            </div>
        )
    }
}
