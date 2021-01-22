import classes from './Loader.module.css'

// Simple spinning Loader, optional loading caption
const Loader = (props) => {
    return (
        <div className={classes.background}>
            <div>
                <div className={classes.loader}>
                </div>
                {props.children}
            </div>
        </div>
    )
}

export default Loader