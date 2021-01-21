import React, { Component } from 'react'

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Stream<b>Flix</b></a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-label="Toggle navigation bar"
                        aria-expanded="false">
                        <span className="navbar-toggler-icon hamburger"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <p>Saldo Anda: {this.props.balance}</p>
                            </li>
                            <li className="nav-item">
                                <a href="logout" className="btn btn-secondary">
                                    Lihat Keranjang
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
