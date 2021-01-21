import React, { Component } from 'react'
import Button from '../../component/Button';
import Navbar from '../../component/Navbar';
import MovieList from '../MovieList';

export default class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 100000,
        }
        this.buyMovie = this.buyMovie.bind(this)
    }

    buyMovie(price) {
        this.setState({balance: this.state.balance - price})
    }

    render() {
        return (
            <div>
                <Navbar balance = {this.state.balance}/>
                <div className="container py-5">
                    <h2>Movie List</h2>
                    <Button onclick = {this.handleClick} label = "Button haha" variant = "blue"/>
                    <MovieList buyMovie = {this.buyMovie}/>
                </div>
            </div>
        )
    }
}
