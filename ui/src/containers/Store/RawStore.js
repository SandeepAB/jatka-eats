import React, { Component } from 'react';

import classes from './rawStore.module.css';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';



const ColorButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#2A7953",
        '&:hover': {
            backgroundColor: "#2A7953",
        },
    },
}))(Button);



export class RowStore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectValue: props.items && props.items[0] ? props.items[0].address : "",
            selectedItem: props.items && props.items[0] ? props.items[0] : {},
            enabledRow : -1,
            editItemName : "",
            editItemDesc : "",
            rawItems : []
        };
    }

    setSelectedItem = function (event) {
        let selectedItem = this.props.items.find(ele => { return ele.address == event.target.value });
        let rawItems = selectedItem.rawItems ? selectedItem.rawItems : [];
        this.setState({
            selectValue: event.target.value,
            selectedItem: this.props.items.find(ele => { return ele.address == event.target.value }),
            rawItems : rawItems
        });
    }
    addNewRawItem = function (event){
        let selectedItem = {...this.state.selectedItem}
        selectedItem.rawItems.push({"id" : selectedItem.rawItems.length , "name": "", "desc" : ""});
        this.setState({
            selectedItem: selectedItem
        });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            selectValue: nextProps.items && nextProps.items[0] ? nextProps.items[0].address : "",
            selectedItem: nextProps.items && nextProps.items[0] ? nextProps.items[0] : {},
            rawItems : nextProps.items && nextProps.items[0] ? nextProps.items[0].rawItems ? nextProps.items[0].rawItems : [] : [],
        });
    }

    editStoreItemsRaw = (id) =>{
        console.log(this.state)
        this.setState({
            enabledRow : -1
        });
        let rawItems = [...this.state.rawItems], selectedItem = {...this.state.selectedItem};
        // if(!id) rawItems.push({"id" : rawItems.length , "name": this.state.editItemName, "desc" : this.state.editItemDesc});
        // else{
        let copy = [...rawItems];
        copy.map((ele, i) => { 
            if(ele.id == id){
                rawItems[i].name =  this.state.editItemName,
                rawItems[i].desc = this.state.editItemDesc
            }
        })
        // }
        selectedItem.rawItems = rawItems
        this.props.editRawStoreItem(selectedItem)
    }

    cancelEditItem = (e) =>{
        this.setState({
            enabledRow : -1
        });
        console.log(e)
    }

    editItem = (e) =>{
        this.setState({
            enabledRow : e
        });
    }

    handlenNameChange= (e) =>{
        this.setState({
            editItemName : e.target.value
        });
    }
    handlenDescChange= (e) =>{
        this.setState({
            editItemDesc : e.target.value
        });
    }

    render() {
        let rows = this.state.selectedItem && this.state.selectedItem.rawItems ? this.state.selectedItem.rawItems.map((row, i) => (
            <TableRow key={i}>
                <TableCell align="left"><textarea disabled={i!=this.state.enabledRow ? true: false} className={classes.Row} onChange={this.handlenNameChange.bind(this)} defaultValue={row.name}></textarea> </TableCell>
                <TableCell align="left"><textarea disabled={i!=this.state.enabledRow ? true: false} className={classes.Row} onChange={this.handlenDescChange.bind(this)} defaultValue={row.desc}></textarea> </TableCell>
                <TableCell align="left" className={classes.RawItemButtonsTD}>
                    <EditIcon style={i!=this.state.enabledRow ? { display: "block" }: { display: "none" }} 
                    className={[classes.FloatRight].join(' ')}
                    onClick={this.editItem.bind(this,i)}/>
                    <ColorButton style={i!=this.state.enabledRow ? { display: "none" }: { display: "block" }}
                        variant="contained"
                        type="submit"
                        color="secondary"
                        size="small"
                        className={[classes.AddItemsButton, classes.FloatRight, classes.SaveButtonBackground].join(' ')}
                        onClick={this.editStoreItemsRaw.bind(this, row.id)}
                    >Save</ColorButton>

                    <ColorButton style={i!=this.state.enabledRow ? { display: "none" }: { display: "block" }}
                        variant="contained"
                        type="submit"
                        color="secondary"
                        size="small"
                        className={[classes.AddItemsButton,  classes.CancelButtonBackground].join(' ')}
                        onClick={this.cancelEditItem.bind(this)}
                    >Cancel</ColorButton>
                </TableCell>
            </TableRow>
        )) : null
        
        return (
            <div style={{
                display: this.props.items.length ? "block" : "none"
            }}>
                <header className={classes.rawStore}>
                    <div className={classes.rawStoreItemsDiv}>
                        <div className={[classes.HalfColumn, classes.Flex].join(" ")}>
                            <p className={classes.rawStoreName}>Raw management</p>
                            <select className={classes.Select} onChange={this.setSelectedItem.bind(this)} value={this.state.selectValue} >{
                                this.props.items ? this.props.items.map((ele, i) => { return (<option key={i}>{ele.address}</option>) }) : []
                            }</select>
                        </div>
                        <div className={[classes.HalfColumn].join(" ")}>
                            <div className={classes.StoreHeadAddButton, classes.FloatRight}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="medium"
                                    className={classes.AddItemsButton}
                                    startIcon={<AddBoxIcon />}
                                    onClick={this.addNewRawItem.bind(this)}
                                >
                                    Add new
                            </Button>
                            </div>
                        </div>
                    </div>
                </header>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Menu items</TableCell>
                                <TableCell align="left">Total quantity</TableCell>
                                <TableCell align="left"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default RowStore;

