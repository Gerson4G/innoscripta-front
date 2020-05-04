import React, { Component, useState } from 'react'
import { InputLabel, Input, FormHelperText, Button } from '@material-ui/core';
import NextWeekOutlinedIcon from '@material-ui/icons/NextWeekOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';
import { ContextData } from './AppProvider';
import { Cart } from './ShoppingCart';

export default class Checkout extends Component {
    state = { proceed: false }
    submit = (e) => {
        e.preventDefault();
        this.setState({proceed: true});
    }
  render() {
    return (
      <ContextData>
        {({ user, cart }) => (
            <div style={{display: "flex", justifyContent: "space-evenly", width: "900px"}}>
                    <Cart/>
                    <form onSubmit={this.submit}>
                        <div style={{margin: "3em"}}>
                            <InputLabel required shrink htmlFor="name-input">Full Name</InputLabel>
                            <Input id="name-input" aria-describedby="name-helper" defaultValue={user.name}/>
                        </div>
                        <div style={{margin: "3em"}}>
                            <InputLabel required shrink htmlFor="email-input">Email address</InputLabel>
                            <Input id="email-input" aria-describedby="email-helper" />
                            <FormHelperText id="email-helper">We'll never share your email.</FormHelperText>
                            <InputLabel required shrink htmlFor="phone-input">Phone Number</InputLabel>
                            <Input id="phone-input" aria-describedby="phone-helper" />
                            <FormHelperText id="phone-helper">An alternative way to contact you.</FormHelperText>
                        </div>
                        <div style={{margin: "3em"}}>
                            <InputLabel required shrink htmlFor="deliver-input">Deliver Address</InputLabel>
                            <Input id="deliver-input" aria-describedby="deliver-helper" />
                            <FormHelperText id="deliver-helper">Confirm this is the address to deliver</FormHelperText>
                        </div>
                        <div style={{margin: "3em"}}>
                            Total Cost: {cart.reduce( (acc, {quantity, price}) => acc + (quantity * price) , 0 )}
                        </div>
                        <Button
                            variant="contained"
                            color="default"
                            endIcon={<NextWeekOutlinedIcon/>}
                            type="submit"
                        >
                            Buy
                        </Button>
                    </form>
                    <PromptDialog open={this.state.proceed}/>
                </div>
            )}
      </ContextData>
    )
  }
}

const PromptDialog = props => {
    const { open } = props;
    const [confirmed, confirm] = useState(false);

    return(
        <>
            <Dialog
                open={open}
                keepMounted
                //onClose={handleClose}
            >
                <DialogTitle>{"Confirm your order"}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    You confirm the previous information entered about order (Pizzas, quantity and cost) and delivery?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button /* onClick={handleClose} */ color="primary">
                    Cancel
                </Button>
                <Button onClick={() => {confirm(true)}} color="primary">
                    Confirm
                </Button>
                </DialogActions>
            </Dialog>
            <ConfirmDialog open={confirmed}/>
        </>
    )
}

const ConfirmDialog = ({open}) => {
    return(
        <Dialog
            open={open}
            keepMounted
            //onClose={handleClose}
        >
            <DialogTitle>{"Use Google's location service?"}</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Your deliver has been placed!
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Link to="/">
                <Button color="primary">
                    Close
                </Button>
            </Link>
            </DialogActions>
        </Dialog>
    )
}