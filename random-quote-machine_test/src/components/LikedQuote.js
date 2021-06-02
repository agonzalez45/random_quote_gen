import React from 'react'
import "../styles.css";

const LikedQuote = (props) => {
    const {value} = props;
    return (
        <div>
            <div className="block">
                <div className="">
                    <h1 className="quote__text">{value}</h1>
                </div>
            </div>
        </div>
    )
}

export default LikedQuote
