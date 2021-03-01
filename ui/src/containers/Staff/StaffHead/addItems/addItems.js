import React, { Component } from 'react';
import Aux from '../../../../hoc/Auxilary/Auxilary';
import classes from './addItems.module.css';
import Button from '@material-ui/core/Button';
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

class AddItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            _id: "",
            id: "JE001",
            staffImageUrl: null,
            name: "",
            email: "",
            number: null,
            location: "Electronic city",
            imageName: "",
            // staffImageUrl: null,
            // name: "",
            // number: 0,
            error: false
        };
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            _id: nextProps.editItem ? nextProps.editItem._id || "" : "",
            id: nextProps.editItem ? nextProps.editItem.id || "JE001" : "JE001",
            staffImageUrl: nextProps.editItem ? nextProps.editItem.staffImageUrl || null : null,
            name: nextProps.editItem ? nextProps.editItem.name || "" : "",
            number: nextProps.editItem ? nextProps.editItem.number || "" : "",
            email: nextProps.editItem ? nextProps.editItem.email || "" : "",
            imageName: nextProps.editItem ? nextProps.editItem.imageName || null : null,
            location: nextProps.editItem ? nextProps.editItem.location || "Electronic city" : "Electronic city",
        });
    }

    handleItemImage(event) {
        if (event.target.files && event.target.files[0]) {
            let imageName = event.target.files[0].name
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ staffImageUrl: e.target.result, imageName: imageName });
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    handlename(event) {
        this.setState({ name: event.target.value });
    }

    handlenumber(event) {
        this.setState({ number: event.target.value });
    }

    handleemail(event) {
        this.setState({ email: event.target.value });
    }

    handlelocation(event) {
        this.setState({ location: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.staffImageUrl && this.state.name && this.state.number && this.state.email && this.state.location) {
            this.setState({ error: false });
            this.props.add({
                _id: this.state._id,
                id: this.state.id,
                staffImageUrl: this.state.staffImageUrl,
                name: this.state.name,
                number: this.state.number,
                email: this.state.email,
                location: this.state.location
            });
            this.onCancel();
        }
        else {
            this.setState({ error: true });
            return false
        }
    }

    onDelete(event) {
        event.preventDefault();
        this.props.delete({
            _id: this.state._id
        });
        this.onCancel();
    }

    onCancel() {
        document.getElementById("staff-image-upload").value = "";
        this.setState({
            _id: "",
            id: "JE001",
            staffImageUrl: null,
            name: "",
            email: "",
            number: null,
            location: "Electronic city",
            imageName: "",
            error: false
        });
        this.props.cancel();
    }

    render() {
        let image = this.state.imageName != "" ? <p className={classes.SelectedFile}>{this.state.imageName}</p> : <div></div>
        let error = this.state.error ? <p className={classes.Error}>Please fill all the required feilds</p> : <div></div>
        let deleteButton = this.state._id ? <div className={[classes.Col_6, classes.FloatRight].join(' ')}>
            <ColorButton variant="contained"
                color="secondary"
                size="small"
                className={[classes.AddItemsButton, classes.FloatRight, classes.DeleteButtonBackground].join(' ')}
                onClick={this.onDelete.bind(this)}
            >Delete</ColorButton>
        </div> : <div></div>
        return (
            <Aux>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <p>Add new staff</p>
                    {error}
                    <div>
                        <div className={classes.RowPadding}>
                            <div className={classes.Row}>
                                <p>Upload Image</p>
                            </div>

                            <div className={classes.Row}>
                                <div>
                                    <Button
                                        variant="contained"
                                        component="label"
                                    >
                                        Upload File
                                        <input
                                            id="staff-image-upload"
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={(e) => this.handleItemImage(e)}
                                        />
                                    </Button>
                                    {image}
                                </div>

                            </div>
                        </div>
                        <div className={[classes.FlexRow, classes.RowPadding].join(' ')}>
                            <div className={classes.Col_6}>
                                <p className={classes.Row}>Name of the staff</p>
                                <input type="text" name="name" value={this.state.name} className={[classes.Row, classes.Input].join(' ')} onChange={this.handlename.bind(this)} />
                            </div>
                            <div className={classes.Col_6}>
                                <p className={classes.Row} >Mobile number</p>
                                <input type="number" name="number" value={this.state.number} className={[classes.Row, classes.Input].join(' ')} onChange={this.handlenumber.bind(this)} />
                            </div>
                        </div>

                        <div className={[classes.FlexRow, classes.RowPadding].join(' ')}>
                            <div className={classes.Col_6}>
                                <p className={classes.Row}>Email address</p>
                                <input type="text" name="email" value={this.state.email} className={[classes.Row, classes.Input].join(' ')} onChange={this.handleemail.bind(this)} />
                            </div>
                            <div className={classes.Col_6}>
                                <p className={classes.Row} >Location</p>
                                <select onChange={this.handlelocation.bind(this)} name="location" value={this.state.location} className={classes.Select}>
                                    <option value="Electronic city">Electronic city</option>
                                    <option value="Jayanagar">Jayanagar</option>
                                    <option value="White feild">White feild</option>
                                </select>
                            </div>
                        </div>

                        <div className={[classes.Row, classes.RowPadding].join(' ')}>

                            <div className={[classes.Col_6, classes.Flex, classes.FloatRight].join(' ')}>
                                <div className={classes.Col_6}>
                                    <ColorButton variant="contained"
                                        color="secondary"
                                        size="small"
                                        className={[classes.AddItemsButton, classes.FloatRight, classes.CancelButtonBackground].join(' ')}
                                        onClick={this.onCancel.bind(this)}
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
                            {deleteButton}
                        </div>
                    </div>
                </form>
            </Aux>
        )
    }
}

export default AddItems;