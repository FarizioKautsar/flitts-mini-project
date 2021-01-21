import classes from './Button.module.css'

const Button = (props) => {
    const {onClick, children, variant, className} = props
    return (
        <div className = {[classes.button, classes[variant], className].join(' ')} onClick={onClick}>
            {children}
        </div>
    )
}

export default Button
