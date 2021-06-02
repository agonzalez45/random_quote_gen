import React from 'react'
import "../styles.css"

//Next quote button
const Button = ({ buttonDisplayName, clickHandler }) => {
    return (
        <button onClick={clickHandler} className="button">
            {buttonDisplayName}
        </button>
    )
}

export default Button
