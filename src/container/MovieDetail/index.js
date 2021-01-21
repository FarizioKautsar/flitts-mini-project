import React, { Component } from 'react'
import classes from './MovieDetail.module.css'
import Backdrop from '../../component/Backdrop'

export default class MovieDetail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div >
                <div className={classes.poster + ' col'}>
                    <img src = {this.props.poster_link} className='w-100'></img>
                    <div className={classes.movieDesc}>
                        <p className={classes.title}>{this.props.title}</p>
                        <p className={classes.year}>{this.props.year}</p>
                        <p className={classes.price}>Rp{this.props.price}</p>
                    </div>
                </div>
                <div className={classes.movieDetail + ' col-8'}>
                    <h4>Overview</h4>
                    <p className={classes.year}>{this.props.overview}</p>
                    <h4>Casts</h4>
                    <p className={classes.year}>{this.props.overview}</p>
                </div>
            </div>
        )
    }
}
