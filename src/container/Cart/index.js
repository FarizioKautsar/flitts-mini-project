import React, { Component } from 'react'
import Button from '../../component/Button';
import CartItem from '../../component/CartItem'

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: this.props.cart,
        }
    }

    render() {
        // console.log(this.state.cart)
        return (
            <div>
                <h3>Your Cart</h3>
                {
                    this.state.cart.map((movie) => (
                        <div>
                            <CartItem movie = {movie}/>
                        </div>
                    ))
                }
                <Button variant = 'green' className = 'ms-auto' onClick = {this.props.checkout}>
                    Check Out
                </Button>
            </div>
        )
    }
}
