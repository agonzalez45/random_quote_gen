import React from 'react'
import "../styles.css";
import LikedQuote from "./LikedQuote";

//box for the liked quotes
const Block = (props) => {
    const { value } = props;
    return (
        <div>
            <LikedQuote value={value} />
        </div>
    )
}

export default Block
