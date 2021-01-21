import React, { Component } from 'react'
import Button from '../Button'
import { 
    BrowserRouter as Router, 
    Route, 
    Link, 
    Switch 
} from 'react-router-dom'; 

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          menu: false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu(){
        this.setState({ menu: !this.state.menu })
    }

    render() {
        const show = (this.state.menu) ? "show" : "" ;
        return (
            <nav className="navbar navbar-expand-sm">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Stream<b>Flix</b></a>
                    <button className="navbar-toggler" type="button" onClick={this.toggleMenu}>
                        <span className="navbar-toggler-icon hamburger"></span>
                    </button>
                    <div className={"collapse navbar-collapse " + show}>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Film Indonesia</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item me-3">
                                <p className="align-middle">Saldo Anda: <b>{this.props.balance}</b></p>
                            </li>
                            <li className="nav-item">
                                <Link to="cart" className="nav-link">
                                    <Button className="my-auto" variant="blue">
                                        Lihat Keranjang
                                    </Button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
