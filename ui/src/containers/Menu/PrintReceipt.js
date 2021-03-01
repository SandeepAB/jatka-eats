import React, { Component } from 'react';
import classes from './PrintReceipt.module.css';
import Button from '@material-ui/core/Button';
import Logo from '../../components/Logo/Logo';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';

const ColorButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#2A7953",
        '&:hover': {
            backgroundColor: "#2A7953",
        },
    },
}))(Button);
export class PrintReceipt extends Component {
    render() {
        let sum = 0, itemCurrency = "RS.";
        let items = this.props.printItems && this.props.printItems.items ? Object.keys(this.props.printItems.items).map(ele => 
            (<div className={[classes.FlexRow, classes.RowPadding].join(' ')}>
                <p className={[classes.Row, classes.StateMentLabel].join(' ')}>{this.props.printItems.items[ele].itemName}</p>
                <p className={[classes.Row, classes.StateMentLabel].join(' ')}>{this.props.printItems.items[ele].itemCurrency+ " " +this.props.printItems.items[ele].totalItemPrice}</p>
            </div>)
        ) : null
        if(this.props.printItems && this.props.printItems.items){
            Object.keys(this.props.printItems.items).map(ele => {
                sum = sum + this.props.printItems.items[ele].totalItemPrice
            })
        }
        
        let gst = 3.30, sgst = 3.38, total = sum + gst + sgst, date = new Date().toDateString();
        return (
            <div className={classes.PagePadding}>
                <div className={classes.FlexRow}>
                    <div className={classes.Width95}><Logo className={classes.NoPadding} height="50px" /></div>
                </div>
                <p className={classes.MenuHeadItems}>Address : #4, 100ft road, Indra nagar, Bengaluru - 560038</p>
                <p className={classes.MenuHeadItems}>Bill number : #12ft533</p>
                <p>Date : {date}</p>
                <p><b>Menu items</b></p>

                {items}

                <hr />
                <div className={[classes.FlexRow, classes.RowPadding].join(' ')}>
                    <p className={[classes.Row, classes.StateMentLabel].join(' ')}>Sub Total</p>
                    <p className={[classes.Row, classes.StateMentLabel].join(' ')}>Rs. {sum}</p>
                </div>
                <div className={[classes.FlexRow, classes.RowPadding].join(' ')}>
                    <p className={[classes.Row, classes.StateMentLabel].join(' ')}>GST</p>
                    <p className={[classes.Row, classes.StateMentLabel].join(' ')}>Rs. {gst}</p>
                </div>
                <div className={[classes.FlexRow, classes.RowPadding].join(' ')}>
                    <p className={[classes.Row, classes.StateMentLabel].join(' ')}>SGST</p>
                    <p className={[classes.Row, classes.StateMentLabel].join(' ')}>Rs. {sgst}</p>
                </div>
                <hr />
                <div className={[classes.FlexRow, classes.RowPadding].join(' ')}>
                    <p className={[classes.Row].join(' ')}><b>Total</b></p>
                    <p className={[classes.Row].join(' ')}><b>Rs. {total}</b></p>
                </div>
                <hr />

                <div className={[classes.FlexRow, classes.RowPadding].join(' ')}>
                    <p className={[classes.Row].join(' ')}>Mode of payment</p>
                    <p className={[classes.Row].join(' ')}>{this.props.printItems.paymentMethod}</p>
                </div>


            </div>
        )
    }
}
// const printReceipt = ( props ) => (

// );

export default PrintReceipt;