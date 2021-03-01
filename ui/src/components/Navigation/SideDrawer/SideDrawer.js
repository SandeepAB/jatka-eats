import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilary/Auxilary';

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <div className={attachedClasses.join(' ')} >
                <Logo height="100px" margin="10px 45px 45px 45px" padding="8px" />
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} logout={props.logout}/>
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;