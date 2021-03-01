import React from 'react';
import classes from './CartItem.module.css';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';

const AddButton = withStyles((theme) => ({
    root: {
        margin: "0px",
        padding: "2px",
        color: "white",
        backgroundColor: "#2A7953",
        '&:hover': {
            backgroundColor: "#2A7953",
        },
    },
    iconSizeSmall: {
        margin: "0px",
    }
}))(Button);

const CountButton = withStyles((theme) => ({
    root: {
        margin: "0px",
        padding: "2px",
        color: "black",
        backgroundColor: "white",
        '&:hover': {
            backgroundColor: "white",
        },
    },
}))(Button);

const RemoveButton = withStyles((theme) => ({
    root: {
        margin: "0px",
        padding: "2px",
        color: "white",
        backgroundColor: "#D0D0D0",
        '&:hover': {
            backgroundColor: "gray",
        }
    },
    iconSizeSmall: {
        margin: "0px",
    }
}))(Button);


const cartItem = (props) => (
    <div className={classes.FlexRow}>
        <div className={classes.Col_3}>
            {props.item.itemName}
        </div>
        <div className={classes.Col_3}>
            {/* <button>Remove</button>
            <p className={classes.MenuHeadName}>1</p>
            <button>Add</button> */}
            <ButtonGroup size="small" aria-label="small outlined button group">
                <RemoveButton
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.AddItemsButton}
                    startIcon={<RemoveIcon />}
                    onClick={() => props.removeItem(props.item._id)}
                ></RemoveButton>
                <CountButton>{props.item.count}</CountButton>
                <AddButton
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.AddItemsButton}
                    startIcon={<AddIcon />}
                    onClick={() => props.addItem(props.item._id)}
                ></AddButton>
            </ButtonGroup>

        </div>
        <div className={classes.Col_5}>
            <p className={classes.PriceMargin}>{props.item.itemCurrency} {props.item.itemPrice * Number(props.item.count)}</p>
        </div>
    </div>
);

export default cartItem;

