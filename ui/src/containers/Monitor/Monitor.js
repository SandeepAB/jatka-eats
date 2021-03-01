import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary/Auxilary';
import { connect } from 'react-redux';
import classes from './Monitor.module.css'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Modal from '../../components/UI/Modal/Modal';
import CloseIcon from '@material-ui/icons/Close';
import * as menuItemActions from '../../store/actions/index'

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import ReactToPrint from 'react-to-print';
import PrintReceipt from '../Menu/PrintReceipt'

const ColorButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#2A7953",
        '&:hover': {
            backgroundColor: "#2A7953",
        },
    },
}))(Button);



export class Store extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showStatement: false,
            selectedDate: new Date('2014-08-18T21:11:54'),
            printblill: false,
            printItems: {
                items : {},
                sum : 0,
                paymentMethod : ""
            }
        };
    }

    // componentWillReceiveProps(nextProps) {
    //     // if (this.props.users !== nextProps.users) {
    //     this.setState({
    //         items: nextProps.items,
    //         error: nextProps.error
    //     });
    //     // }
    // }

    PrintBillCancelHandler = () => {
        this.setState({
            printblill: false
        })
    }

    PrintBillShowHandler = (data) => {
        this.setState({
            printblill: true,
            printItems : this.props.items[0].items,
            cartItem : {}
        });

        // this.props.checkoutItems(data);
    }

    componentDidMount() {
        this.props.getCheckoutItems();
    }


    // showStatementCancelHandler = () => {
    //     this.setState({
    //         addingItemm: false,
    //         editingItem: {}
    //     });
    // }


    // AddItemlHandler = () => {
    //     this.setState({
    //         addingItemm: true
    //     });
    // }

    // editItem = (item) => {
    //     this.setState({
    //         addingItemm: true,
    //         editingItem: item
    //     });
    // }

    // addItemToCart = (item) => {
    //     this.setState({
    //         cartItem: item
    //     });
    // }
    handleDateChange = (date) => {
        // setSelectedDate(date);
    };


    showStatementCancelHandler = () => {
        this.setState({
            showStatement: false
        });
    }

    showStatementHandler = () => {
        this.setState({
            showStatement: true
        });
    }
    handleSubmit = () => {
        this.showStatementCancelHandler();
    }
    onCancel() {
        // document.getElementById("item-image-upload").value = "";
        // this.setState({
        //     _id: "",
        //     imageName: "",
        //     imageSrc: null,
        //     ItemName: "",
        //     ItemPrice: 0,
        //     error: false
        // });
        // this.props.cancel();

    }

    render() {
        // let store = this.state.error ? <p>Store can't be loaded!</p> : <Spinner />;

        // if (this.state.items && !this.state.error) {
        //     store = (
        //         <Aux>
        //             <StoreHead isAuth={this.props.isAuthenticated} addItem={this.AddItemlHandler} count={this.state.items.length}></StoreHead>
        //             <div><StoreItems items={this.state.items} editItem={this.editItem} addItemToCart={this.addItemToCart}></StoreItems></div>
        //         </Aux>
        //     );
        // }
        console.log(this.props, "-------------")

        let orders = [{ "address": "27th main, HSR layout", "status": "pending" }, { "address": "Koromangala", "status": "completed" }, { "address": "100ft road, Indiranagar", "status": "shortage" }].map((order, i) => (
            <Grid item xs={3} key={i} onClick={this.showStatementHandler.bind(this)}>
                <Paper className={classes.paper}>
                    <div className={classes.StoreItem}>
                        <div className={classes.ImageContainer}>
                            <p className={[classes.Image, classes.Address].join(" ")}>{order.address}</p>
                        </div>
                        {
                            order.status == "completed" ?
                                <div className={classes.Text}>
                                    <div className={classes.StoreHeadItems}><DonutLargeIcon className={classes.IconPending} /><p className={classes.BlackColor}>Pending</p></div>
                                    <p className={classes.TotalSales}>Total sales</p>
                                    <span className={classes.Amount}>Rs. 1480</span>
                                </div> :
                                order.status == "pending" ?
                                    <div className={classes.Text}>
                                        <div className={classes.StoreHeadItems}><CheckCircleIcon className={classes.IconCompleted} /><p className={classes.BlackColor}>Completed</p></div>
                                        <p className={classes.TotalSales}>Total sales</p>
                                        <span className={classes.Amount}>Rs. 1480</span>
                                    </div> :
                                    <div className={classes.Text}>
                                        <div className={classes.StoreHeadItems}><span className={classes.IconShortage}><ArrowDropDownIcon className={classes.IconShortage} /> Rs. 129</span><p className={classes.BlackColor}>Shortage</p></div>
                                        <p className={classes.TotalSales}>Total sales</p>
                                        <span className={classes.Amount}>Rs. 1480</span>
                                    </div>
                        }
                    </div>

                </Paper>
            </Grid>
        ));


        return (
            <Aux>
                <Modal show={this.state.showStatement} modalClosed={this.showStatementCancelHandler}>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className={classes.FlexRow}>
                            <p className={classes.Width95}>Store 3 - 100ft Indiranagar</p>
                            <CloseIcon onClick={this.showStatementCancelHandler.bind(this)} className={classes.ShowCursor}/>
                        </div>
                        <div>
                            <div className={[classes.Row, classes.RowPadding].join(' ')}>
                                <p className={[classes.Row, classes.StateMentLabel].join(' ')}>Executive name</p>
                                <input type="text" name="ItemName" value="" className={[classes.Row, classes.Input].join(' ')} />
                            </div>
                            <div className={[classes.Row, classes.RowPadding].join(' ')}>
                                <div className={[classes.FlexRow].join(' ')}>
                                    <div className={[classes.Row].join(' ')}>
                                        <p className={[classes.Row, classes.StateMentLabel].join(' ')}>Total</p>
                                        <input type="text" name="ItemName" value="" className={[classes.Row, classes.Input].join(' ')} ></input>
                                    </div>
                                    <div className={[classes.Row].join(' ')}>
                                        <p className={[classes.Row, classes.StateMentLabel].join(' ')}>Collected amount</p>
                                        <input type="text" name="ItemName" value="" className={[classes.Row, classes.Input].join(' ')} ></input>
                                    </div>
                                    <div className={[classes.Row].join(' ')}>
                                        <p className={[classes.Row, classes.StateMentLabel, classes.LabelRed].join(' ')}>Shortage</p>
                                        <input type="text" name="ItemName" value="" className={[classes.Row, classes.Input, classes.InputRed].join(' ')} ></input>
                                    </div>
                                </div>
                            </div>
                            <div className={[classes.Row, classes.RowPadding].join(' ')}>
                                <p className={[classes.Row, classes.StateMentLabel].join(' ')}>Comments</p>
                                <textarea type="text" name="ItemName" value="" className={[classes.Row, classes.Input].join(' ')} ></textarea>
                            </div>
                            <div className={[classes.Row, classes.RowPadding].join(' ')}>
                                <p className={[classes.Row, classes.StateMentLabel].join(' ')}>Unused resources</p>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Menu items</TableCell>
                                                <TableCell align="left">Total quantity</TableCell>
                                                <TableCell align="left">Remaining quantity</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {[1, 2, 3].map((row, i) => (
                                                <TableRow key={i}>
                                                    <TableCell align="left">
                                                        <p >Idly</p>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <p >5 kg batter</p>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <p >1 kg batter</p>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                            <div className={[classes.Row, classes.RowPadding].join(' ')}>
                                <div className={[classes.Col_6, classes.Flex, classes.FloatRight].join(' ')}>
                                    <div className={classes.Col_6}>
                                        <ColorButton variant="contained"
                                            color="secondary"
                                            size="small"
                                            className={[classes.AddItemsButton, classes.FloatRight, classes.CancelButtonBackground].join(' ')}
                                            onClick={this.showStatementCancelHandler.bind(this)}
                                        >Cancel</ColorButton>
                                    </div>
                                    <div className={classes.Col_6}>
                                        <ColorButton variant="contained"
                                            type="submit"
                                            color="secondary"
                                            size="small"
                                            className={[classes.AddItemsButton, classes.FloatRight, classes.SaveButtonBackground].join(' ')}
                                        >Save</ColorButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </ Modal>
                <div className={classes.fullHeight}>
                    <div className={classes.HalfHeight}>
                        <div className={[classes.FlexRow, classes.HeaderPadding].join(" ")}>
                            <div className={classes.Col_6}>
                                <p className={classes.StoreHeadName}>Store collection</p>
                            </div>
                            <div className={[classes.Col_6, classes.FloatRight].join(" ")}>
                                <div className={[classes.Col_6, classes.FloatRight].join(" ")} >
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        {/* <Grid container justify="space-around"> */}
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="Date picker inline"
                                            value={this.state.selectedDate}
                                            onChange={this.handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                        {/* </Grid> */}
                                    </MuiPickersUtilsProvider>
                                </div>
                            </div>
                        </div>

                        <Grid container spacing={5}>
                            {orders}
                        </Grid>
                    </div>
                    <div className={classes.HalfHeight}>
                        <div className={[classes.FlexRow, classes.HeaderPadding].join(" ")}>
                            <div className={classes.Col_6}>
                                <p className={classes.StoreHeadName}>Store statement</p>
                            </div>
                            <div className={[classes.Col_6].join(" ")}>
                                <div className={[classes.Col_6, classes.FloatRight].join(" ")} >
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        {/* <Grid container justify="space-around"> */}
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="Date picker inline"
                                            value={this.state.selectedDate}
                                            onChange={this.handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                        {/* </Grid> */}
                                    </MuiPickersUtilsProvider>
                                </div>
                            </div>
                        </div>

                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Store</TableCell>
                                        <TableCell align="left">Total collection</TableCell>
                                        {/* <TableCell align="left"></TableCell> */}
                                        <TableCell align="left">Access information</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[
                                    {"totalPrice" : 1480, store : { address : "27th main, HSR layout"}},
                                    {"totalPrice" : 1480, store : { address : "Koromangala"}},
                                    {"totalPrice" : 1480, store : { address : "100ft road, Indiranagar"}}]
                                    .map((row, i) => (
                                        <TableRow key={i}>
                                            <TableCell align="left">
                                                <div>
                                                    <p className={classes.MenuHeadName}>Store {i+1}</p>
                                                    <p className={classes.MenuHeadItems}>{row.store.address}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell align="left">
                                                <span className={classes.Amount}>Rs. {row.totalPrice}</span>
                                            </TableCell>
                                            <TableCell align="left">
                                                <ColorButton variant="contained"
                                                    type="submit"
                                                    color="secondary"
                                                    size="small"
                                                    className={[classes.AddItemsButton, classes.Statement].join(' ')}
                                                    onClick={this.PrintBillShowHandler.bind(this)}
                                                >View statement</ColorButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                </div>

                <Modal show={this.state.printblill} modalClosed={this.PrintBillCancelHandler}>
                <div >
                        <CloseIcon onClick={this.PrintBillCancelHandler} className={classes.ShowCursor} />
                 </div>
                 <PrintReceipt PrintBillCancelHandler={this.PrintBillCancelHandler} printItems={this.state.printItems} ref={el => (this.componentRef = el)}/>
                <div className={[classes.FlexRow, classes.RowPadding].join(' ')}>
                        <div className={classes.Col_6}></div>
                        <div className={[classes.FlexRow, classes.Col_6].join(' ')}>
                            <div className={classes.Col_6}>
                                <ColorButton variant="contained"
                                    color="secondary"
                                    size="small"
                                    className={[classes.AddItemsButton, classes.FloatRight, classes.CancelButtonBackground].join(' ')}
                                    onClick={this.PrintBillCancelHandler}
                                >Cancel</ColorButton>
                            </div>
                            
                            <div className={classes.Col_6}>
                            <ReactToPrint
                                trigger={() => {
                                    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                                    // to the root node of the returned component as it will be overwritten.
                                    return <ColorButton variant="contained"
                                    type="submit"
                                    color="secondary"
                                    size="small"
                                    className={[classes.AddItemsButton, classes.FloatRight, classes.SaveButtonBackground].join(' ')}
                                >Print</ColorButton>;
                                }}
                                content={() => this.componentRef}
                            />
                            </div>
                        </div>
                    </div>
                {/* <AddItem show={this.state.addingItemm} cancel={this.AddItemCancelHandler} add={this.props.onMenuItemAdded} editItem={this.state.editingItem} delete={this.props.onMenuItemRemoved}></AddItem> */}
                </ Modal>


            </Aux>);
    }
}

const mapStateToProps = state => {
    return {
        items: state.menuItems.checkoutItems,
        error: state.menuItems.CheckoutError
    };
}

const mapDispatchToProps = dispatch => {
    return {
        // onStoreItemAdded: (itemName) => dispatch(storeItemActions.addStoreItem(itemName)),
        // onStoreItemRemoved: (itemName) => dispatch(storeItemActions.removeStoreItem(itemName)),
        getCheckoutItems: () => dispatch(menuItemActions.getCheckoutItems()),
        // onInitPurchase: () => dispatch(storeItemActions.purchaseInit()),
        // AuthRedirectPath: (path) => dispatch(storeItemActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Store, axios));