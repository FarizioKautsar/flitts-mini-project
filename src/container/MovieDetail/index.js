import React, { Component } from 'react'
import classes from './MovieDetail.module.css'
import Backdrop from '../../component/Backdrop'
import { useParams } from 'react-router-dom';
import { APIConfig } from '../../api/APIConfig';

export default class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            movie: {},
        }
        console.log(this.props.match.params.slug)
    }

    
    async loadMovie(id) {
        // this.setState({loading: true})
        try {
            const {data} = await APIConfig.get('/movie/' + id)
            console.log(data)
            this.setState({isLoading: false, movie: data})
        } catch (error) {
            alert("Terjadi kesalahan saat memuat film.")
            console.log(error)
        }
    }

    componentDidMount() {
        let slug = this.props.match.params.slug
        let movieId = slug.substr(0, slug.indexOf('-'))
        this.loadMovie(movieId)
    }

    render() {
        // alert("movie detail")
        const movie = this.state.movie
        console.log(movie)
        return (
            <div className='row'>
                <div className={classes.poster + ' col'}>
                    <img src = {'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + movie.poster_path} className='w-100'></img>
                    <div className={classes.movieDesc}>
                        <p className={classes.title}>{movie.title}</p>
                        <p className={classes.year}>{movie.year}</p>
                        <p className={classes.price}>Rp{movie.price}</p>
                    </div>
                </div>
                <div className={classes.movieDetail + ' col-8'}>
                    <h4>Overview</h4>
                    <p className={classes.year}>{movie.overview}</p>
                    <h4>Casts</h4>
                    <p className={classes.year}>{movie.overview}</p>
                </div>
            </div>
        )
    }
}
