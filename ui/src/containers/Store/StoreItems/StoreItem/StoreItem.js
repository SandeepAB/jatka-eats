import React from 'react';
import classes from './StoreItem.module.css';
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
    <div className={classes.StoreItem}>
        <div className={classes.ImageContainer}>
            <p className={[classes.Image, classes.Address].join(" ")}>{props.item.address}</p>
            <div className={classes.EditIcon}>
            <EditIcon style={{ width: "15px", height: "12px"}} 
                onClick={()=>props.editItem(props.item) }/>
            </div>
        </div>
        <div className={classes.Text}>
            <p className={classes.StoreHeadItems}>Store ID: <span className={classes.BlackColor}>{props.item.id}</span></p>
            <p className={classes.StoreHeadItems}>No. of staffs: <span className={classes.BlackColor}>{props.item.noOfStaff}</span></p>
            <p className={classes.StoreHeadItems}>No. of menu Items: <span className={classes.BlackColor}>{props.item.noOfMenuItems.length}</span></p>

        </div>
    </div>
);

export default menuItem;
