import React from 'react'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

//uses the like button icon from material ui
const LikeButton = ({ clickHandler }) => {
    return (
        <div>
          <button
            className="button"
            onClick={clickHandler}
            
          ><ThumbUpIcon />
          </button>
        </div>
    )
}

export default LikeButton

