import React from 'react';
import classes from './StaffHead.module.css';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';

const staffHead = ( props ) => (
    <header className={ classes.StaffHead }>
        <div className={classes.StaffHeadItemsDiv}>
        <div className={classes.HalfColumn}> 
        <p className={classes.StaffHeadName}>Staff management</p>
        <p className={classes.StaffHeadItems}>{props.count} members</p>
        </div> 
        <div className={classes.StaffHeadAddButton}> 
            <Button
                variant="contained"
                color="primary"
                size="medium"
                className={classes.AddItemsButton}
                startIcon={<AddBoxIcon />}
                onClick={props.addItem}
            >
                Add new staff
            </Button>
        </div>
        </div>
    </header>
);

export default staffHead;