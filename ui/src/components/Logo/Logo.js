import React from 'react';
import burgerLogo from '../../assets/images/logo.jpeg';
// import burgerLogo from '../../logo.svg';
import classes from "./Logo.module.css";

const logo = ( props ) => (
    <div className={classes.Logo} style={{ height: props.height, margin : props.margin, padding: props.padding}} >
        <img src={ burgerLogo } alt="MyBurger" style={{ height: props.height }}/>
    </div>
);

export default logo;