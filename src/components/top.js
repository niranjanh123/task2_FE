import React from 'react'
import './top.css'
import {Link} from 'react-router-dom'

 function top() {
    const textStyle = {
        color: 'black'
    };
    return (
        <div id="top-container">
        <p>Welcome</p>
            <ul id ="list">
                <Link to='/home' style={textStyle}>
                <li>Register</li>
                </Link>
                <Link to='/about' style={textStyle}>
                <li>About</li>
                </Link>
            </ul>
        </div>
    )
}

export default top;