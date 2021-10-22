import React, { useRef } from 'react';
import './Ball.css'

const setRight = (position) => {
    
    if(position < 30){
        return 180 + Math.floor(Math.random() * 100)
    }else{
        return 100 + Math.floor(Math.random() * 250)
    }
}
const Ball = props => {
    let b = Math.floor(Math.random() * 100);
    let r = setRight(b)
    let n = Math.floor(1 + Math.random()*4)
    const BallStyles = useRef({
        bottom: `${b}px`,
        right: `${r}px`,
    });

    return (
        <>
            <div className={`ball-${n}`} style={BallStyles.current}>{props.number}</div>
        </>
    )
}

export default Ball;