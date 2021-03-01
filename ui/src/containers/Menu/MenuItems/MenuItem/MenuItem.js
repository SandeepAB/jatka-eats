import React from 'react';
import classes from './MenuItem.module.css';
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
    <div className={classes.MenuItem}>
        <div className={classes.ImageContainer}>
            <img src={props.item.itemImageUrl} alt="MyBurger" className={classes.Image} />
            <div className={classes.EditIcon}>
            <EditIcon style={{ width: "15px", height: "12px"}} 
                onClick={()=>props.editItem(props.item) }/>
            </div>
        </div>
        <div className={classes.Text}>
            <p className={classes.MenuHeadName}>{props.item.itemName}</p>
            <p className={classes.MenuHeadItems}>{props.item.itemCurrency} {props.item.itemPrice}</p>
        </div>
        <div className={classes.AlignCenter}>
            <ColorButton variant="contained"
                color="secondary"
                size="medium"
                className={classes.AddItemsButton}
                onClick={(e)=>{ e.preventDefault();
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    props.addItemToCart(props.item) 
                }}
            >Add</ColorButton>
        </div>
    </div>
);

export default menuItem;

