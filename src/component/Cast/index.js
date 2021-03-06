import classes from './Cast.module.css'

// Item list for casts displayed in MovieDetail
const Loader = (props) => {
    return (
        <div className='col-xl-2 col-md-3 col-sm-4 col-6 mb-4'>
            <div className={classes.cast}>
                {
                    // Does it has a link to a profile picture
                    props.profile_path?
                    <img src = {'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + props.profile_path} alt={props.name} className='w-100'></img>
                    : <div className={classes.noPicture}>
                        <i className="fas fa-times-circle mb-2"></i>
                        Picture Unavailable
                    </div>
                }
                <div className={classes.castDesc}>
                    <p>{props.name}</p>
                </div>
            </div>
        </div>
    )
}

export default Loader