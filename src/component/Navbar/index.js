import React, { Component } from 'react'
import Button from '../Button'
import { 
    Link, 
} from 'react-router-dom'; 

// Navbar for the whole app
// Made using bootstrap https://getbootstrap.com/docs/5.0/components/navbar/
export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          menu: false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    // Toggle hamburger menu
    toggleMenu(){
        this.setState({ menu: !this.state.menu })
    }

    render() {
        // Class name for menu
        const show = (this.state.menu) ? "show" : "" ;
        return (
            <nav className="navbar navbar-expand-md">
                <div className="container-fluid">
                    <Link to = '/' className="navbar-brand" href="/">Stream<b>Flix</b></Link>
                    <button className="navbar-toggler" type="button" onClick={this.toggleMenu}>
                        <span className="navbar-toggler-icon hamburger"></span>
                    </button>
                    <div className={"collapse navbar-collapse " + show}>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item d-flex align-items-center">
                                <p className='nav-link'>Saldo Anda <b>Rp{this.props.balance}</b></p>
                            </li>
                            <li className="nav-item d-flex">
                                <Link to="/keranjang" className="nav-link">
                                    <Button className="my-auto" variant="blue">
                                        <i className="fas fa-shopping-cart"></i>
                                    </Button>
                                </Link>
                                <Link to="/koleksi" className="nav-link ms-auto">
                                    <Button className="my-auto" variant="white">
                                        Film Saya
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
