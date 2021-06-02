import React from 'react'
import "../styles.css";

//component for the quote div block
const Quote = (props) => {
  const { value } = props;
    return (
      <div className="quote__block">
        <h1 className="quote__text">{value.quote}</h1>
        <h3 className="quote__author">- {value.author}</h3>
    </div>
    )
}

export default Quote
