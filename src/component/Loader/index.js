import classes from './Loader.module.css'

// Simple spinning Loader, optional loading caption
const Loader = (props) => {
    return (
        <div className={classes.background}>
            <div>
                <div className='d-flex justify-content-center'>
                    <div className={`${classes.loader} ${props.className}`} style = {props.style}>
                    </div>
                </div>
                <br/>
                {props.children}
            </div>
        </div>
    )
}

export default Loader