import classes from './Button.module.css'

const Button = (props) => {
    const {onClick, children, variant, className, style} = props
    return (
        <div className = {[classes.button, classes[variant], className].join(' ')} onClick={onClick} style={style}>
            {children}
        </div>
    )
}

export default Button
