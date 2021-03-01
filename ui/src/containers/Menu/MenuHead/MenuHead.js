import React from 'react';
import classes from './MenuHead.module.css';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';


const menuHead = ( props ) => (
    <header className={ classes.MenuHead }>
        <div className={classes.MenuHeadItemsDiv}>
        <div className={classes.HalfColumn}> 
        <p className={classes.MenuHeadName}>Menu items</p>
        <p className={classes.MenuHeadItems}>{props.count} items</p>
        </div> 

        <div className={classes.MenuHeadAddButton}> 
            <Button
                variant="contained"
                color="primary"
                size="medium"
                className={classes.AddItemsButton}
                startIcon={<AddBoxIcon />}
                onClick={props.addItem}
            >
                Add new item
            </Button>

        </div>
        </div>
    </header>
);

export default menuHead;