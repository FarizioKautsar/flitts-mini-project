import classes from './Button.module.css'

// Button with 4 variants: white, blue, green, red
const Button = (props) => {
    const {onClick, children, variant, className, style} = props
    return (
        <div 
        className = {`${classes.button} ${classes[variant]} ${className}`} 
        onClick={onClick} style={style}>
            {/* Content inside Button wrapper */}
            {children}
        </div>
    )
}

export default Button
