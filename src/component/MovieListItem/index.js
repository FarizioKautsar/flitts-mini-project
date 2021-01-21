import React, { Component } from 'react'
import classes from './MovieListItem.module.css'
import {ImageAPI} from '../../api/APIConfig'
import { Link } from 'react-router-dom';

export default class MovieListItem extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.slug = this.slug.bind(this)
    }

    async loadImage(link) {

    }

    handleClick(event) {
        event.preventDefault()
        console.log(event)
    }

    slug(id, movie) {
        let titleSlug = movie.replace(/\s+/g, '-').toLowerCase();
        return (id+'-'+titleSlug)
    }

    render() {
        return (
            <div className='col-sm-4 col-md-2 col-6 mb-4'>
                <Link to = {this.slug(this.props.id, this.props.title)} style={{ textDecoration: 'none' }}>
                    <div className = {classes.movieListItem}>
                        <img src = {this.props.poster_link} className='w-100'></img>
                        <div className = {classes.movieDesc}> 
                            {/* <div className={classes.fade}></div> */}
                            <p className={classes.title}>{this.props.title}</p>
                            <p className={classes.year}>{this.props.year}</p>
                            <p className={classes.price}>Rp{this.props.price}</p>
                            {/* <p className={classes.overview}>{this.props.overview}</p> */}
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}
