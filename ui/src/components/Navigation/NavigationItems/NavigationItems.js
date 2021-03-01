import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { NavLink } from 'react-router-dom';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import StoreIcon from '@material-ui/icons/Store';
import PeopleIcon from '@material-ui/icons/People';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const navigationItems = ( props ) => (
    <ul className={ classes.NavigationItems }>
        <NavigationItem link="/menu" exact>
        <RestaurantMenuIcon className={ classes.Icon }/><p>Menu</p>
        </NavigationItem>

        <NavigationItem link="/staff">
        <PeopleIcon className={ classes.Icon }/><p>Staff management</p>
        </NavigationItem>

        <NavigationItem link="/store">
        <StoreIcon className={ classes.Icon }/><p>Store management</p>
        </NavigationItem>

        <NavigationItem link="/dashboard">
        <DashboardIcon className={ classes.Icon }/><p>Dashboard</p>
        </NavigationItem>

        <NavigationItem link="/monitor">
        <DesktopMacIcon className={ classes.Icon }/><p>Monitor</p>
        </NavigationItem>

        <NavigationItem link="/settings">
        <AccountCircleIcon className={ classes.Icon }/><p>Account settings</p>
        </NavigationItem>


        <li className={ [classes.NavigationItem, classes.NavigationItemAuth].join(' ')} onClick={props.logout}>
            <NavLink activeClassName={ classes.active } to="/" className={classes.FlexnavLink} > 
                <ExitToAppIcon className={ classes.Icon }/><p>Logout</p>
            </NavLink>
        </li>
    </ul>
);

export default navigationItems;