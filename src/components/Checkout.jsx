import React, { Component, useState } from 'react'
import { InputLabel, Input, FormHelperText, Button } from '@material-ui/core';
import NextWeekOutlinedIcon from '@material-ui/icons/NextWeekOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';

export default class Checkout extends Component {
    state = { proceed: false }
    submit = (e) => {
        e.preventDefault();
        this.setState({proceed: true});
    }
  render() {
    return (
      <>
        Checkout Order
        <form onSubmit={this.submit}>
            <div>
                <InputLabel required shrink htmlFor="name-input">Full Name</InputLabel>
                <Input id="name-input" aria-describedby="name-helper" />
            </div>
            <div>
                <InputLabel required shrink htmlFor="email-input">Email address</InputLabel>
                <Input id="email-input" aria-describedby="email-helper" />
                <FormHelperText id="email-helper">We'll never share your email.</FormHelperText>
                <InputLabel required shrink htmlFor="phone-input">Phone Number</InputLabel>
                <Input id="phone-input" aria-describedby="phone-helper" />
                <FormHelperText id="phone-helper">An alternative way to contact you.</FormHelperText>
            </div>
            <div>
                <InputLabel required shrink htmlFor="deliver-input">Deliver Address</InputLabel>
                <Input id="deliver-input" aria-describedby="deliver-helper" />
                <FormHelperText id="deliver-helper">Confirm this is the address to deliver</FormHelperText>
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
      </>
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
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                Let Google help apps determine location. This means sending anonymous location data to
                    Google, even when no apps are running.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button /* onClick={handleClose} */ color="primary">
                    Disagree
                </Button>
                <Button onClick={() => {confirm(true)}} color="primary">
                    Agree
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
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
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