import React from 'react';
import classes from './StaffItem.module.css';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';

import { NavLink } from 'react-router-dom';

const ColorButton = withStyles((theme) => ({
    root: {
      color: "white",
      backgroundColor: "#2A7953",
      '&:hover': {
        backgroundColor: "#2A7953",
      },
    },
  }))(Button);


const menuItem = (props) => (
    <div className={classes.StaffItem}>
        <div className={classes.ImageContainer}>
            <img src={props.item.staffImageUrl} alt="MyBurger" className={classes.Image} />
            <div className={classes.EditIcon}>
            <EditIcon style={{ width: "15px", height: "12px"}} 
                onClick={()=>props.editItem(props.item) }/>
            </div>
        </div>
        <div className={classes.Text}>
            <p className={classes.StaffHeadName}>{props.item.name}</p>
            <p className={classes.StaffHeadItems}>ID: {props.item.id}</p>
            <p className={classes.StaffHeadItems}>Location: {props.item.location}</p>

        </div>
    </div>
);

export default menuItem;
