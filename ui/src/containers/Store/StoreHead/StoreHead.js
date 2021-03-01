import React from 'react';
import classes from './StoreHead.module.css';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';

const storeHead = ( props ) => (
    <header className={ classes.StoreHead }>
        <div className={classes.StoreHeadItemsDiv}>
        <div className={classes.HalfColumn}> 
        <p className={classes.StoreHeadName}>Store management</p>
        <p className={classes.StoreHeadItems}>{props.count} members</p>
        </div> 
        <div className={classes.StoreHeadAddButton}> 
            <Button
                variant="contained"
                color="primary"
                size="medium"
                className={classes.AddItemsButton}
                startIcon={<AddBoxIcon />}
                onClick={props.addItem}
            >
                Add new store
            </Button>
        </div>
        </div>
    </header>
);

export default storeHead;