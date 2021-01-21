import classes from './Cast.module.css'

const Loader = (props) => {
    return (
        <div className='col-2 mb-4'>
            <div className={classes.cast}>
                {
                    props.profile_path?
                    <img src = {'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + props.profile_path} alt={props.name} className='w-100'></img>
                    : <div className={classes.noPicture}>
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