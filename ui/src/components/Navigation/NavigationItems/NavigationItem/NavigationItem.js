import React from 'react';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const navigationItem = ( props ) => (
    <li className={ classes.NavigationItem }><NavLink 
        exact={ props.exact }
        activeClassName={ classes.active }
        className={classes.FlexnavLink}
        to={ props.link } 
        >{ props.children }</NavLink></li>
);

export default navigationItem;